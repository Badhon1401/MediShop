package com.mediShop.config;

import com.mediShop.medicine.application.exception.MedicineAlreadyExistsException;
import com.mediShop.medicine.application.exception.MedicineNotFoundException;
import com.mediShop.shop.application.exception.*;
import com.mediShop.user.application.exception.*;
import com.mediShop.user.application.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ---- User-related exceptions ----

    @ExceptionHandler(UsernameTakenException.class)
    public ResponseEntity<?> handleUsernameTaken(UsernameTakenException ex) {
        return buildSimpleResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(VerificationCodeExpiredException.class)
    public ResponseEntity<?> handleExpired(VerificationCodeExpiredException ex) {
        return buildSimpleResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(VerificationCodeMismatchException.class)
    public ResponseEntity<?> handleMismatch(VerificationCodeMismatchException ex) {
        return buildSimpleResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(UserEmailMismatchException.class)
    public ResponseEntity<?> handleMismatch(UserEmailMismatchException ex) {
        return buildSimpleResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // This exception exists in both user and shop — keep just one handler.
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFound(UserNotFoundException ex) {
        return buildSimpleResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // ---- Shop-related exceptions ----

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<?> handleUnauthorized(UnauthorizedException ex) {
        return buildDetailedResponse(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<?> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return buildDetailedResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<?> handleInvalidInput(InvalidInputException ex) {
        return buildDetailedResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(ShopNotFoundException.class)
    public ResponseEntity<?> handleShopNotFound(ShopNotFoundException ex) {
        return buildDetailedResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // ---- Fallback handler ----

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneric(Exception ex) {
        return buildDetailedResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred.");
    }

    // ---- Response builders ----

    private ResponseEntity<Map<String, Object>> buildDetailedResponse(HttpStatus status, String message) {
        Map<String, Object> errorDetails = new HashMap<>();
        errorDetails.put("timestamp", LocalDateTime.now());
        errorDetails.put("status", status.value());
        errorDetails.put("error", status.getReasonPhrase());
        errorDetails.put("message", message);
        return new ResponseEntity<>(errorDetails, status);
    }

    private ResponseEntity<String> buildSimpleResponse(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(message);
    }

    // ---- Medicine-related exceptions ----

    @ExceptionHandler(MedicineNotFoundException.class)
    public ResponseEntity<?> handleMedicineNotFound(MedicineNotFoundException ex) {
        return buildDetailedResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(MedicineAlreadyExistsException.class)
    public ResponseEntity<?> handleMedicineAlreadyExists(MedicineAlreadyExistsException ex) {
        return buildDetailedResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

}
