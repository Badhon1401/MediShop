package com.sda.medishop.infrastructure.service;

import com.sda.medishop.application.UserApplicationService;
import com.sda.medishop.domain.User;
import com.sda.medishop.domain.UserVerificationMessage;
import com.sda.medishop.infrastructure.persistence.entity.UserJpaEntity;
import com.sda.medishop.infrastructure.persistence.repository.UserRepositoryImpl;
import com.sda.medishop.infrastructure.persistence.repository.UserVerificationMessageRepositoryImpl;
import com.sda.medishop.infrastructure.utils.LoginCredentials;
import com.sda.medishop.domain.exception.UserAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import static com.sda.medishop.infrastructure.service.DomainMapperService.mapToUserDomain;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepositoryImpl userRepository;
    private final UserVerificationMessageRepositoryImpl userVerificationMessageRepository;

    private final UserApplicationService applicationUserService;

    private final JWTService jwtService;

    private final AuthenticationManager authManager;

    @Autowired
    public UserService(UserRepositoryImpl userRepository, UserVerificationMessageRepositoryImpl userVerificationMessageRepository, JWTService jwtService, AuthenticationManager authManager) {
        this.userRepository = userRepository;
        this.userVerificationMessageRepository = userVerificationMessageRepository;
        this.jwtService = jwtService;
        this.authManager = authManager;
        this.applicationUserService = new UserApplicationService(userRepository, userVerificationMessageRepository,authManager,jwtService);
    }


    public ResponseEntity<?> initiateRegistration(UserJpaEntity user) {
        logger.info("SERVICE: Starting registration process for user: {}", user.getEmail());

        UserVerificationMessage verificationMessage;

        try {
            logger.debug("SERVICE: Calling application service to initiate registration");
            verificationMessage = applicationUserService.initiateRegistration(mapToUserDomain(user));
            logger.info("SERVICE: Successfully created verification message for user: {}", user.getEmail());

        } catch (UserAlreadyExistsException exception) {
            logger.warn("SERVICE: Username already exists: {}", exception.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());

        } catch (Exception e) {
            logger.error("SERVICE: Unexpected error during registration initiation: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }

        // Send email with verification code
        StringBuilder emailStatus = new StringBuilder();

        try {
            logger.debug("SERVICE: Preparing to send verification email");
            String subject = "MediShop Registration Verification Code";
            // FIXED: Use getCode() instead of the entire object
            String text = "Your MediShop account registration verification code is: " + verificationMessage.getCode() + ". It expires in 7 minutes.";

            logger.debug("SERVICE: Sending email to: {}", verificationMessage.getUserEmail());
            SystemService.sendMessageThroughMail(subject, text, verificationMessage.getUserEmail());

            logger.info("SERVICE: Email successfully sent to: {}", verificationMessage.getUserEmail());
            emailStatus.append("Email successfully sent to user email: ").append(verificationMessage.getUserEmail()).append("\n");

        } catch (Exception e) {
            logger.error("SERVICE: Failed to send email to {}: {}", verificationMessage.getUserEmail(), e.getMessage(), e);
            emailStatus.append("Failed to send email to user email: ").append(verificationMessage.getUserEmail())
                    .append(": ").append(e.getMessage()).append("\n");
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(emailStatus.toString());
        }

        logger.info("SERVICE: Registration initiation completed successfully for user: {}", user.getEmail());
        return ResponseEntity.ok(emailStatus.toString());
    }

    public ResponseEntity<?> completeRegistration(UserJpaEntity user, String code) {
        logger.info("SERVICE: Completing registration for user: {}", user.getEmail());
        return applicationUserService.verifyVerificationCodeAndCompleteRegistration(mapToUserDomain(user), code);
    }

    public ResponseEntity<?> userLogin(LoginCredentials loginCredentials) {
        logger.info("SERVICE: Processing login for user: {}", loginCredentials.getUserName());
        return applicationUserService.performUserLogin(loginCredentials.getUserName(), loginCredentials.getPassword());
    }

    public ResponseEntity<?> forgotUserCredentials(String userEmail) {
        Map<String, Object> response = applicationUserService.handleForgotUserCredentials(userEmail);
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

            SystemService.sendMessageThroughMail(subject, text.toString(), verificationMessage.getUserEmail());
            logger.info("SERVICE: Recovery email successfully sent to: {}", verificationMessage.getUserEmail());
            emailStatus.append("Email successfully sent to user email: ").append(verificationMessage.getUserEmail()).append("\n");

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("usernames", matchedUserNames);
            responseBody.put("emailStatus", emailStatus.toString());
            return ResponseEntity.ok(responseBody);

        } catch (Exception e) {
            logger.error("SERVICE: Failed to send recovery email to {}: {}", verificationMessage.getUserEmail(), e.getMessage(), e);
            emailStatus.append("Failed to send email to user email: ").append(verificationMessage.getUserEmail())
                    .append(": ").append(e.getMessage()).append("\n");
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(emailStatus.toString());
        }
    }

    public ResponseEntity<?> forgottenAccountVerification(String code, String userEmail, String userName, String updatedPassword) {
        return applicationUserService.verifyVerificationCodeForAccountVerification(code, userEmail, userName, updatedPassword);
    }

    public ResponseEntity<?> getUserAccountDetails(UUID userId) {
        return applicationUserService.getUserAccountDetails(userId);
    }

}