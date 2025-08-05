package com.mediShop.user.application.dto.usecase;

import com.mediShop.user.application.dto.exception.UsernameTakenException;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.entity.UserVerificationMessage;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.user.domain.repository.UserVerificationMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RegisterUserUseCase {
    private final UserRepository userRepository;
    private final UserVerificationMessageRepository verificationMessageRepository;

    public UserVerificationMessage execute(User user) {
        userRepository.findByUserName(user.getUserName())
                .ifPresent(u -> { throw new UsernameTakenException("Username already exists."); });

        UserVerificationMessage message = generateVerificationCode(user.getEmail());
        verificationMessageRepository.deleteByUserEmail(user.getEmail());
        verificationMessageRepository.save(message);
        return message;
    }

    private UserVerificationMessage generateVerificationCode(String email) {
        String code = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return new UserVerificationMessage(code,email,new Date(System.currentTimeMillis() + 7 * 60 * 1000));

    }
}
