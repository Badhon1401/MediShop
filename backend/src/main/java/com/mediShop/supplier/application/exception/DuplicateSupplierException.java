// DuplicateSupplierException.java
package com.mediShop.supplier.application.exception;

public class DuplicateSupplierException extends RuntimeException {
    
    public DuplicateSupplierException(String message) {
        super(message);
    }
    
    public DuplicateSupplierException(String field, String value) {
        super("Supplier with " + field + " '" + value + "' already exists");
    }
}