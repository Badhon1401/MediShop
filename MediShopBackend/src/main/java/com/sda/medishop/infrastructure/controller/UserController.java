package com.sda.medishop.infrastructure.controller;

import com.sda.medishop.domain.User;
import com.sda.medishop.infrastructure.persistence.entity.UserJpaEntity;
import com.sda.medishop.infrastructure.utils.LoginCredentials;
import com.sda.medishop.infrastructure.utils.MediShopRegainAccountCredentials;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private com.sda.medishop.infrastructure.service.UserService userService;

    @PostMapping("/register/request")
    public ResponseEntity<?> initiateRegistration(@RequestBody UserJpaEntity user) {
       return userService.initiateRegistration(user);
    }

    @PostMapping("/register/complete")
    public ResponseEntity<?> completeRegistration(@RequestBody UserJpaEntity user, @RequestParam String code) {
         return userService.completeRegistration(user ,code);
    }

    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginCredentials loginCredentials) {
         return userService.userLogin(loginCredentials);
    }

    @GetMapping("/login/forgot")
    public ResponseEntity<?> forgotUserCredentials(@RequestParam String userEmail) {
        return userService.forgotUserCredentials(userEmail);
    }

    @PostMapping("/login/forgot/verify")
    public ResponseEntity<?> forgottenAccountVerification(@RequestBody MediShopRegainAccountCredentials requestBody) {
        return userService.forgottenAccountVerification(
                requestBody.getCode(),
                requestBody.getUserEmail(),
                requestBody.getUserName(),
                requestBody.getUpdatedPassword()
        );
    }

    @GetMapping("/account/details/{userId}")
    public ResponseEntity<?> getAccountDetails(@PathVariable UUID userId) {
        return userService.getUserAccountDetails(userId);
    }
}