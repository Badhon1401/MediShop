// SupplierNotFoundException.java
package com.mediShop.supplier.application.exception;

public class SupplierNotFoundException extends RuntimeException {
    
    public SupplierNotFoundException(String message) {
        super(message);
    }
    
    public SupplierNotFoundException(Integer supplierId) {
        super("Supplier not found with ID: " + supplierId);
    }
    
    public SupplierNotFoundException(String field, String value) {
        super("Supplier not found with " + field + ": " + value);
    }
}



