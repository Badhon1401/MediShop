package com.sda.medishop.infrastructure.controller;

import com.sda.medishop.application.UserService;
import com.sda.medishop.domain.User;
import com.sda.medishop.domain.UserVerificationMessage;
import com.sda.medishop.infrastructure.service.SystemService;
import com.sda.medishop.infrastructure.utils.LoginCredentials;
import com.sda.medishop.infrastructure.utils.MediShopRegainAccountCredentials;
import com.sda.medishop.utils.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private com.sda.medishop.infrastructure.service.UserService userService;

    @PostMapping("/register/request")
    public ResponseEntity<?> initiateRegistration(@RequestBody User user) {
        return userService.initiateRegistration(user);
    }

    @PostMapping("/register/complete")
    public ResponseEntity<?> completeRegistration(@RequestBody User user, @RequestParam String code) {
        return userService.completeRegistration(user,code);
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

        return userService.forgottenAccountVerification(requestBody.getCode(),requestBody.getUserEmail(),requestBody.getUserName(),requestBody.getUpdatedPassword());
    }


    @GetMapping("/account/details")
    public ResponseEntity<?> getAccountDetails(@RequestParam(required = false) String userName) {
        return userService.getUserDetails(userName);
    }

    @PutMapping("/account/update")
    public ResponseEntity<?> updateUser( @RequestBody UpdatedUserAccount updatedUserDetails) {
        return  userService.updateUserAccountDetails(updatedUserDetails);
    }
}
