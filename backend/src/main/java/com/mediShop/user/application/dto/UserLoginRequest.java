package com.mediShop.user.application.dto;

import jakarta.validation.constraints.NotBlank;

public class UserLoginRequest {
    @NotBlank
    private String loginIdentifier; // Can be email or phone

    @NotBlank
    private String password;

    // Getters and setters
    public String getLoginIdentifier() {
        return loginIdentifier;
    }

    public void setLoginIdentifier(String loginIdentifier) {
        this.loginIdentifier = loginIdentifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}