package com.mediShop.user.application.usecase;

import com.mediShop.user.application.dto.OtpVerificationRequest;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.exception.UserException;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.validation.ValidationService;
import org.springframework.stereotype.Service;

@Service
public class OtpVerificationUseCase {
    private final UserRepository userRepo;
    private final ValidationService validationService;

    public OtpVerificationUseCase(UserRepository userRepo, ValidationService validationService) {
        this.userRepo = userRepo;
        this.validationService = validationService;
    }

    public void verify(OtpVerificationRequest req) {
        // Validate that required fields are not null
        if (req.emailOrPhone == null || req.emailOrPhone.trim().isEmpty()) {
            throw new UserException("Email or phone number is required");
        }
        if (req.otp == null || req.otp.trim().isEmpty()) {
            throw new UserException("OTP is required");
        }

        String searchIdentifier = req.emailOrPhone;
        if (!req.emailOrPhone.contains("@")) {
            try {
                searchIdentifier = validationService.normalizePhoneNumber(req.emailOrPhone);
            } catch (Exception e) {
                searchIdentifier = req.emailOrPhone;
            }
        }

        // Find a user by email or phone first to ensure we have the right user
        String finalSearchIdentifier = searchIdentifier;
        User user = userRepo.findByEmail(searchIdentifier)
                .or(() -> userRepo.findByPhone(finalSearchIdentifier))
                .orElseThrow(() -> new UserException("User not found"));

        // Verify that this user has the correct OTP
        if (user.getOtp() == null || !user.getOtp().equals(req.otp)) {
            throw new UserException("Invalid OTP");
        }

        user.verifyOtp(req.otp);
        userRepo.save(user);
    }
}
