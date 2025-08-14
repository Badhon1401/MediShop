package com.mediShop.user.application.usecase;

import com.mediShop.user.application.dto.ForgotPasswordRequest;
import com.mediShop.user.application.service.EmailService;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.exception.UserException;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.validation.ValidationService;
import org.springframework.stereotype.Service;

@Service
public class InitiatePasswordResetUseCase {
    private final UserRepository userRepo;
    private final ValidationService validation;
    private final EmailService emailService;

    public InitiatePasswordResetUseCase(UserRepository userRepo,
                                        ValidationService validation,
                                        EmailService emailService) {
        this.userRepo = userRepo;
        this.validation = validation;
        this.emailService = emailService;
    }

    public void initiate(ForgotPasswordRequest req) {
        validation.validateEmailOrPhone(req.emailOrPhone);

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

        String finalSearchIdentifier = searchIdentifier;
        User user = userRepo.findByEmail(searchIdentifier)
                .or(() -> userRepo.findByPhone(finalSearchIdentifier))
                .orElseThrow(() -> new UserException("User not found"));

        user.generateOtp(5);
        userRepo.save(user);

        if (user.getEmail() != null) {
            emailService.sendOtpEmail(user.getEmail(), user.getOtp());
        }
    }
}