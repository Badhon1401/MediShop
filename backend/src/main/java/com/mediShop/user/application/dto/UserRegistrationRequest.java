package com.mediShop.user.application.dto;

import com.mediShop.user.domain.valueobject.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Payload for registering a new user")
public class UserRegistrationRequest {
    @NotBlank(message = "Please provide your full name")
    @Schema(description = "Full name of the user", example = "Alice Smith")
    public String name;

    @NotBlank(message = "Email is required")
    @Schema(description = "Email address", example = "alice@example.com")
    public String email;

    @NotBlank(message = "Phone number is required")
    @Schema(description = "Phone number", example = "+8801XXXXXXXXX")
    public String phone;

    @NotBlank(message = "Password cannot be blank")
    @Schema(description = "User password", example = "Secret123")
    public String password;

    @NotNull(message = "Role must be selected")
    @Schema(
            description = "Role of the user",
            required = true,
            example = "SALESPERSON",
            allowableValues = { "MANAGER", "SALESPERSON" },
            type = "string"
    )
    public Role role;
}
