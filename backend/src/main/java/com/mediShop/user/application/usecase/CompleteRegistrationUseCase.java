package com.mediShop.user.application.dto.usecase;

import com.mediShop.user.application.dto.exception.UserEmailMismatchException;
import com.mediShop.user.application.dto.exception.VerificationCodeExpiredException;
import com.mediShop.user.application.dto.exception.VerificationCodeMismatchException;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.entity.UserVerificationMessage;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.user.domain.repository.UserVerificationMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompleteRegistrationUseCase {
    private final UserRepository userRepository;
    private final UserVerificationMessageRepository verificationMessageRepository;

    public void execute(User user, String code) {
        UserVerificationMessage verification = verificationMessageRepository.findByUserEmail(user.getEmail())
                .orElseThrow(() -> new VerificationCodeExpiredException("Verification code expired or not found."));

        if (!verification.getCode().equals(code)) {
            throw new VerificationCodeMismatchException("Invalid verification code.");
        }

        if (!verification.getUserEmail().equals(user.getEmail())) {
            throw new UserEmailMismatchException("Email mismatch.");
        }

        userRepository.save(user);
        verificationMessageRepository.delete(verification);
    }
}