package com.mediShop.supplier.infrastructure.web.exception;

import com.mediShop.supplier.domain.exception.SupplierNotFoundException;
import com.mediShop.supplier.domain.exception.SupplierAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class SupplierExceptionHandler {

    @ExceptionHandler(SupplierNotFoundException.class)
    public ResponseEntity<String> handleNotFound(SupplierNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(SupplierAlreadyExistsException.class)
    public ResponseEntity<String> handleAlreadyExists(SupplierAlreadyExistsException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }
}
