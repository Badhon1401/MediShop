package com.mediShop.user.infrastructure.web.controller;

import com.mediShop.user.application.dto.LoginCredentials;
import com.mediShop.user.application.dto.MediShopRegainAccountCredentials;
import com.mediShop.user.application.dto.UserRequestDto;
import com.mediShop.user.application.usecase.*;

import com.mediShop.user.domain.entity.UserVerificationMessage;
import com.mediShop.user.infrastructure.persistence.mapper.UserMapper;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private JavaMailSender mailSenderInstance;

    private static String mediShopEmail;

    private static JavaMailSender mailSender;

    @Value("${medishop.email}")
    private String mediShopEmailInstance;



    @PostConstruct
    private void initStaticDependencies() {
        mediShopEmail = mediShopEmailInstance;
        mailSender=mailSenderInstance;
    }

    private final CompleteRegistrationUseCase completeRegistration;
    private  final ForgotCredentialsUseCase forgotUserCredentials;
    private final GetUserAccountDetailsUseCase getUserAccountDetails;
    private  final LoginUserUseCase loginUserUseCase;
    private final RegisterUserUseCase registerUserUseCase;
    private final AccountRegainUseCase accountRegainUseCase;

    @Autowired
    public UserController(CompleteRegistrationUseCase completeRegistration, ForgotCredentialsUseCase forgotUserCredentials, GetUserAccountDetailsUseCase getUserAccountDetails, LoginUserUseCase loginUserUseCase, RegisterUserUseCase registerUserUseCase, AccountRegainUseCase accountRegainUseCase) {
        this.completeRegistration = completeRegistration;
        this.forgotUserCredentials = forgotUserCredentials;
        this.getUserAccountDetails = getUserAccountDetails;
        this.loginUserUseCase = loginUserUseCase;
        this.registerUserUseCase = registerUserUseCase;
        this.accountRegainUseCase = accountRegainUseCase;
    }

    @PostMapping("/register/request")
    public ResponseEntity<?> initiateRegistration(@Valid @RequestBody UserRequestDto user) {

        UserVerificationMessage verificationMessage;

        try {
            verificationMessage = registerUserUseCase.execute(UserMapper.userDtoToUserDomain(user));

        }  catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }

        StringBuilder emailStatus = new StringBuilder();

        try {
            String subject = "MediShop Registration Verification Code";
            String text = "Your MediShop account registration verification code is: " + verificationMessage.getCode() + ". It expires in 7 minutes.";

            sendMessageThroughMail(subject, text, verificationMessage.getUserEmail());

            emailStatus.append("Email successfully sent to user email: ").append(verificationMessage.getUserEmail()).append("\n");

        } catch (Exception e) {
            emailStatus.append("Failed to send email to user email: ").append(verificationMessage.getUserEmail())
                    .append(": ").append(e.getMessage()).append("\n");
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(emailStatus.toString());
        }

        return ResponseEntity.ok(emailStatus.toString());
    }

    @PostMapping("/register/complete")
    public ResponseEntity<?> completeRegistration(@Valid @RequestBody UserRequestDto user, @RequestParam String code) {
        return completeRegistration.execute(UserMapper.userDtoToUserDomain(user),code);
    }

    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginCredentials loginCredentials) {
        return ResponseEntity.ok(loginUserUseCase.execute(loginCredentials.getUserName(),loginCredentials.getPassword()));
    }

    @GetMapping("/login/forgot")
    public ResponseEntity<?> forgotUserCredentials(@RequestParam String userEmail) {
        Map<String, Object> response = forgotUserCredentials.execute(userEmail);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Set<String> matchedUserNames = (Set<String>) response.get("usernames");
        UserVerificationMessage verificationMessage = (UserVerificationMessage) response.get("verificationMessage");

        if (verificationMessage == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Verification message could not be generated.");
        }

        StringBuilder emailStatus = new StringBuilder();

        try {
            String subject = "MediShop Account Recovery - Verification Code & Usernames";
            StringBuilder text = new StringBuilder();
            text.append("Dear MediShop User,\n\n");
            text.append("We received a request to recover your MediShop account.\n\n");
            text.append("Your verification code is: ").append(verificationMessage.getCode()).append("\n");
            text.append("This code will expire in 7 minutes.\n\n");

            if (matchedUserNames != null && !matchedUserNames.isEmpty()) {
                text.append("The following usernames are associated with this email address:\n");
                for (String userName : matchedUserNames) {
                    text.append("- ").append(userName).append("\n");
                }
                text.append("\n");
            }

            text.append("If you did not request this account recovery, please ignore this email.\n\n");
            text.append("For your security, do not share this code with anyone.\n\n");
            text.append("Thank you for using MediShop!\n\n");
            text.append("Best regards,\n");
            text.append("The MediShop Support Team");

            sendMessageThroughMail(subject, text.toString(), verificationMessage.getUserEmail());
            emailStatus.append("Email successfully sent to user email: ").append(verificationMessage.getUserEmail()).append("\n");

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("usernames", matchedUserNames);
            responseBody.put("emailStatus", emailStatus.toString());
            return ResponseEntity.ok(responseBody);

        } catch (Exception e) {
            emailStatus.append("Failed to send email to user email: ").append(verificationMessage.getUserEmail())
                    .append(": ").append(e.getMessage()).append("\n");
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(emailStatus.toString());
        }
    }

    @PostMapping("/login/forgot/verify")
    public ResponseEntity<?> forgottenAccountVerification(@RequestBody MediShopRegainAccountCredentials requestBody) {
        return ResponseEntity.ok(accountRegainUseCase.execute(
                requestBody.getCode(),
                requestBody.getUserEmail(),
                requestBody.getUserName(),
                requestBody.getUpdatedPassword()
        ));
    }

    @GetMapping("/account/details/{userId}")
    public ResponseEntity<?> getAccountDetails(@PathVariable UUID userId) {
        return ResponseEntity.ok(getUserAccountDetails.execute(userId));
    }
    private void sendMessageThroughMail(String subject, String text, String receiverEmail){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mediShopEmail);
        message.setTo(receiverEmail);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);

    }

}