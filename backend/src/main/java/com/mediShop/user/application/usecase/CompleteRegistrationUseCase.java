package com.mediShop.user.application.usecase;


import com.mediShop.user.application.exception.VerificationCodeNotFound;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.entity.UserVerificationMessage;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.user.domain.repository.UserVerificationMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class CompleteRegistrationUseCase {

    private final UserRepository userRepository;
    private final UserVerificationMessageRepository verificationMessageRepository;
    public final LoginUserUseCase loginUserUseCase;
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);




    public ResponseEntity<?> execute(User user, String code) {
        UserVerificationMessage verificationMessage = verificationMessageRepository.findByUserEmail(user.getEmail()).orElseThrow(() -> new VerificationCodeNotFound("Theres is no verification code found with this email"));
        if(verificationMessage.getExpiry().before(new Date())){
            verificationMessageRepository.delete(verificationMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Expired verification code.");
        }
        if(!verificationMessage.getCode().equals(code)){
            verificationMessageRepository.delete(verificationMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong verification code.Previous code became useless. Ask for new code if required. ");
        }

        if (!user.getEmail().equals(verificationMessage.getUserEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email mismatch during verification.Please send the same credentials as before getting the verification code");
        }

        if (userRepository.findByUserName(user.getUserName()).isPresent()) {
            verificationMessageRepository.delete(verificationMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sorry you have to register again with another name as in the mean time a new user with that user name registered");
        }

        verificationMessageRepository.delete(verificationMessage);

        String rawPassword = user.getPassword();

        user.setPassword(encoder.encode(rawPassword));

        userRepository.save(user);

        return loginUserUseCase.execute(user.getUserName(),rawPassword);
    }
}