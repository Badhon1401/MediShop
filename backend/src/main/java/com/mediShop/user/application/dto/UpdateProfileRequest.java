package com.mediShop.user.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
        @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
        String name,  // Optional - only update if provided

        String email,  // Optional - only update if provided

        String phone,  // Optional - only update if provided

        @NotBlank(message = "Current password is required for identity verification")
        String currentPassword  // Required for verification ONLY - NOT for updating password
) {
}
