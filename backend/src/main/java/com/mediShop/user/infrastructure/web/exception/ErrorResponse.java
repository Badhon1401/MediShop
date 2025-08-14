package com.mediShop.user.infrastructure.web.exception;

import java.time.LocalDateTime;
import java.util.List;

public class ErrorResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final int status;
    private final String message;
    private final List<String> errors;

    public ErrorResponse(int status, String message) {
        this.status  = status;
        this.message = message;
        this.errors  = null;
    }

    public ErrorResponse(int status, List<String> errors) {
        this.status  = status;
        this.message = "Validation failed";
        this.errors  = errors;
    }

    public LocalDateTime getTimestamp() { return timestamp; }
    public int           getStatus()    { return status; }
    public String        getMessage()   { return message; }
    public List<String>  getErrors()    { return errors; }
}
