package com.mediShop.user.application.usecase;

import com.mediShop.user.application.exception.UserNotFoundException;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.entity.UserVerificationMessage;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.user.domain.repository.UserVerificationMessageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ForgotCredentialsUseCase {

    private final UserRepository userRepository;
    private final UserVerificationMessageRepository verificationMessageRepository;

    @Transactional
    public Map<String, Object> execute(String email) {

        List<User> users = userRepository.findByEmail(email);
        if (users.isEmpty()) {
            throw new UserNotFoundException("User not found with provided email.");
        }

        UserVerificationMessage verificationMessage = generateVerificationCode(email);


        verificationMessageRepository.deleteByUserEmail(email);


        verificationMessageRepository.save(verificationMessage);

        Set<String> matchedUserNames=new HashSet<>();
        for(User user:users){
            matchedUserNames.add(user.getUserName());
        }
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("usernames", matchedUserNames);
        responseBody.put("verificationMessage", verificationMessage);

        return responseBody;

    }
    private UserVerificationMessage generateVerificationCode(String email) {
        String code = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return new UserVerificationMessage(code,email,new Date(System.currentTimeMillis() + 7 * 60 * 1000));

    }
}

