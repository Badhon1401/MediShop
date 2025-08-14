package com.mediShop.user.application.dto;

import jakarta.validation.constraints.NotBlank;

public record DeleteProfileRequest(
        @NotBlank(message = "Password is required for account deletion verification")
        String password
) {
}
