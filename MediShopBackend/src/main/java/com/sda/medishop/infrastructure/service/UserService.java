package com.sda.medishop.infrastructure.service;

import com.sda.medishop.domain.User;
import com.sda.medishop.domain.UserVerificationMessage;
import com.sda.medishop.infrastructure.persistence.repository.UserRepositoryImpl;
import com.sda.medishop.infrastructure.persistence.repository.UserVerificationMessageRepositoryImpl;
import com.sda.medishop.infrastructure.utils.LoginCredentials;
import com.sda.medishop.utils.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import static org.springframework.web.servlet.function.ServerResponse.status;

public class UserService {

    @Autowired
    private UserRepositoryImpl userRepository;
    @Autowired
    private UserVerificationMessageRepositoryImpl userVerificationMessageRepository;


    com.sda.medishop.application.UserService userService= new com.sda.medishop.application.UserService(userRepository,userVerificationMessageRepository);

    public ResponseEntity<?> initiateRegistration(@RequestBody User user) {
        UserVerificationMessage verificationMessage;
        try{
            verificationMessage=userService.initiateRegistration(user);
        }
        catch(UserAlreadyExistsException exception){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
        StringBuilder emailStatus = new StringBuilder();
        try{
            String subject="MediShop Registration Verification Code";
            String text="Your MediShop account registration verification code is: " + verificationMessage + ". It expires in 7 minutes.";
            SystemService.sendMessageThroughMail(subject,text,verificationMessage.getUserEmail());
            emailStatus.append("Email successfully sent to user email:").append(verificationMessage.getUserEmail()).append("\n");
        } catch (Exception e) {
            emailStatus.append("Failed to send email to user email: ").append(verificationMessage.getUserEmail())
                    .append(": ").append(e.getMessage()).append("\n");
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(emailStatus.toString());
        }
        return ResponseEntity.ok(emailStatus.toString());
    }

    public ResponseEntity<?> completeRegistration(User user, String code) {
        return userService.verifyVerificationCodeAndCompleteRegistration(user,code);
    }

    public ResponseEntity<?> userLogin(LoginCredentials loginCredentials) {
        return userService.performUserLogin(loginCredentials.getUserName(),loginCredentials.getPassword());
    }

    public ResponseEntity<?> forgotUserCredentials(String userEmail) {
        Map<String, Object> response = userService.handleForgotUserCredentials(userEmail);
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
            text.append("Your verification code is: **").append(verificationMessage.getCode()).append("**\n");
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

            SystemService.sendMessageThroughMail(subject, text.toString(), verificationMessage.getUserEmail());
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

    public ResponseEntity<?> forgottenAccountVerification(String code, String userEmail, String userName, String updatedPassword) {
        return userService.verifyVerificationCodeForAccountVerification(code,userEmail,userName,updatedPassword);
    }
}
