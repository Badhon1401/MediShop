package com.mediShop.user.application.usecase;

import com.mediShop.user.application.dto.ResendOtpRequest;
import com.mediShop.user.application.service.EmailService;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.exception.UserException;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.validation.ValidationService;
import org.springframework.stereotype.Service;

@Service
public class ResendOtpUseCase {
    private final UserRepository userRepo;
    private final ValidationService validation;
    private final EmailService emailService;

    public ResendOtpUseCase(UserRepository userRepo,
                           ValidationService validation,
                           EmailService emailService) {
        this.userRepo = userRepo;
        this.validation = validation;
        this.emailService = emailService;
    }

    public void resend(ResendOtpRequest req) {
        validation.validateEmailOrPhone(req.emailOrPhone);

        String searchIdentifier = req.emailOrPhone;

        // Normalize phone number if it's not an email
        if (!req.emailOrPhone.contains("@")) {
            try {
                searchIdentifier = validation.normalizePhoneNumber(req.emailOrPhone);
            } catch (Exception e) {
                // Keep original identifier if normalization fails
                searchIdentifier = req.emailOrPhone;
            }
        }

        // Find the user by email or phone
        String finalSearchIdentifier = searchIdentifier;
        User user = userRepo.findByEmail(searchIdentifier)
                .or(() -> userRepo.findByPhone(finalSearchIdentifier))
                .orElseThrow(() -> new UserException("User not found"));

        // Check if a user has email for sending OTP
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            throw new UserException("User does not have an email address to receive OTP");
        }

        // Generate a new OTP with 5-minute validity
        user.generateOtp(5);
        userRepo.save(user);

        // Send the new OTP via email
        emailService.sendOtpEmail(user.getEmail(), user.getOtp());
    }
}
