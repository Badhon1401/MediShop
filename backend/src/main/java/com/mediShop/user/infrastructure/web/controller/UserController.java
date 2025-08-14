package com.mediShop.user.infrastructure.web.controller;

import com.mediShop.user.application.dto.*;
import com.mediShop.user.application.usecase.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {
    private final RegisterUserUseCase register;
    private final LoginUserUseCase login;
    private final InitiatePasswordResetUseCase initiateReset;
    private final ResendOtpUseCase resendOtp;
    private final OtpVerificationUseCase verifyOtp;
    private final ResetPasswordUseCase resetPassword;
    private final ChangePasswordUseCase changePassword;
    private final UpdateProfileUseCase updateProfile;
    private final DeleteProfileUseCase deleteProfile;
    private final GetUserProfileUseCase getUserProfile;

    public UserController(
            RegisterUserUseCase register,
            LoginUserUseCase login,
            InitiatePasswordResetUseCase initiateReset,
            ResendOtpUseCase resendOtp,
            OtpVerificationUseCase verifyOtp,
            ResetPasswordUseCase resetPassword,
            ChangePasswordUseCase changePassword,
            UpdateProfileUseCase updateProfile,
            DeleteProfileUseCase deleteProfile,
            GetUserProfileUseCase getUserProfile
    ) {
        this.register       = register;
        this.login          = login;
        this.initiateReset  = initiateReset;
        this.resendOtp      = resendOtp;
        this.verifyOtp      = verifyOtp;
        this.resetPassword  = resetPassword;
        this.changePassword = changePassword;
        this.updateProfile  = updateProfile;
        this.deleteProfile  = deleteProfile;
        this.getUserProfile  = getUserProfile;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody UserRegistrationRequest req) {
        UserResponse resp = register.register(req);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@Valid @RequestBody UserLoginRequest req) {
        UserResponse resp = login.login(req);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequest req) {
        initiateReset.initiate(req);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<Void> resendOtp(@Valid @RequestBody ResendOtpRequest req) {
        resendOtp.resend(req);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Void> verifyOtp(@Valid @RequestBody OtpVerificationRequest req) {
        verifyOtp.verify(req);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@Valid @RequestBody ResetPasswordRequest req) {
        resetPassword.reset(req);
        return ResponseEntity.ok().build();
    }

    // Change-password flow for logged-in users
    @PostMapping("/change-password")
    public ResponseEntity<Void> changePassword(
            @Valid @RequestBody ChangePasswordRequest req,
            Authentication authentication) {
        String userPhone = authentication.getName(); // Get phone from JWT token
        changePassword.change(userPhone, req);
        return ResponseEntity.ok().build();
    }

    // Get user profile endpoint
    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(Authentication authentication) {
        String userPhone = authentication.getName(); // Get phone from JWT token
        UserResponse response = getUserProfile.getProfile(userPhone);
        return ResponseEntity.ok(response);
    }

    // Update profile endpoint
    @PutMapping("/update-profile")
    public ResponseEntity<UserResponse> updateProfile(
            @Valid @RequestBody UpdateProfileRequest req,
            Authentication authentication) {
        String userPhone = authentication.getName(); // This is the phone number from JWT
        UserResponse response = updateProfile.updateProfile(userPhone, req);
        return ResponseEntity.ok(response);
    }

    // Delete profile endpoint
    @DeleteMapping("/delete-account")
    public ResponseEntity<Void> deleteProfile(
            @Valid @RequestBody DeleteProfileRequest req,
            Authentication authentication) {
        String userPhone = authentication.getName(); // This is the phone number from JWT
        deleteProfile.deleteProfile(userPhone, req);
        return ResponseEntity.ok().build();
    }
}
