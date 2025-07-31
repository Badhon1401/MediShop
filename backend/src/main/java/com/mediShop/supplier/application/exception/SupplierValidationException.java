// SupplierValidationException.java
package com.mediShop.supplier.application.exception;

public class SupplierValidationException extends RuntimeException {
    
    public SupplierValidationException(String message) {
        super(message);
    }
    
    public SupplierValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}