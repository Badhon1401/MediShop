package com.mediShop.user.application.exception;

public class VerificationCodeNotFound extends RuntimeException {
    public VerificationCodeNotFound(String message) {
        super(message);
    }
}
