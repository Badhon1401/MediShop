package com.mediShop.user.application.dto;

import jakarta.validation.constraints.NotBlank;

public class ResendOtpRequest {
    @NotBlank(message = "Email or phone is required")
    public String emailOrPhone;
}
