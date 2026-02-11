package com.mediShop.user.application.usecase;

import com.mediShop.user.application.exception.VerificationCodeNotFound;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.entity.UserVerificationMessage;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.user.domain.repository.UserVerificationMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountRegainUseCase {

    private final UserRepository userRepository;
    private final UserVerificationMessageRepository verificationMessageRepository;
    public final LoginUserUseCase loginUserUseCase;
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    @Transactional
    public ResponseEntity<?> execute(String code, String userEmail, String userName, String updatedPassword) {

        UserVerificationMessage verificationCode = verificationMessageRepository.findByUserEmail(userEmail).orElseThrow(() -> new VerificationCodeNotFound("Theres is no verification code found with this email"));
        if (verificationCode == null ) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No verification code found for this email");
        }


        if(verificationCode.getExpiry().before(new Date())){
            verificationMessageRepository.delete(verificationCode);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Expired verification code.");
        }
        if (!verificationCode.getCode().equals(code))
        {
            verificationMessageRepository.delete(verificationCode);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Wrong verification code. Previous code became useless. Ask for new code if required.");
        }

        Optional<User> userOptional = userRepository.findByUserName(userName);


        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }


        User user = userOptional.get();
        user.setPassword(encoder.encode(updatedPassword));
        userRepository.save(user);
        verificationMessageRepository.delete(verificationCode);
        return loginUserUseCase.execute(userName,updatedPassword);

    }

}
