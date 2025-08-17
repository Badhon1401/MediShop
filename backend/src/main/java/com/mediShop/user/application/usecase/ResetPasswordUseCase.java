package com.mediShop.user.application.usecase;

import com.mediShop.user.application.dto.ResetPasswordRequest;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.exception.UserException;
import com.mediShop.user.domain.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.mediShop.validation.ValidationService;
import org.springframework.stereotype.Service;

@Service
public class ResetPasswordUseCase {
    private final UserRepository userRepo;
    private final ValidationService validation;
    private final PasswordEncoder passwordEncoder;

    public ResetPasswordUseCase(UserRepository userRepo,
                                ValidationService validation, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.validation = validation;
        this.passwordEncoder = passwordEncoder;
    }

    public void reset(ResetPasswordRequest req) {

        validation.validatePassword(req.newPassword);

        String searchIdentifier = req.emailOrPhone;

        // Normalize a phone number if it's not an email
        if (!req.emailOrPhone.contains("@")) {
            try {
                searchIdentifier = validation.normalizePhoneNumber(req.emailOrPhone);
            } catch (Exception e) {
                // Keep the original identifier if normalization fails
                searchIdentifier = req.emailOrPhone;
            }
        }

        final String finalSearchIdentifier = searchIdentifier;
        User user = userRepo.findByEmail(finalSearchIdentifier)
                .or(() -> userRepo.findByPhone(finalSearchIdentifier))
                .orElseThrow(() -> new UserException("User not found"));

        String hashedPassword = passwordEncoder.encode(req.newPassword);
        user.setPassword(hashedPassword);

        // Clear OTP - only setOtp method exists, otpExpiresAt doesn't have a setter
        //user.setOtp(null);

        userRepo.save(user);
    }
}
