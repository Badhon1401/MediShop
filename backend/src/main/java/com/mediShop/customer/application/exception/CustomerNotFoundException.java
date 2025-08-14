package com.mediShop.customer.application.exception;

public class CustomerNotFoundException extends RuntimeException {
    
    public CustomerNotFoundException(String message) {
        super(message);
    }
    
    public CustomerNotFoundException(Integer customerId) {
        super("Customer not found with ID: " + customerId);
    }
    
    public CustomerNotFoundException(String field, String value) {
        super("Customer not found with " + field + ": " + value);
    }
}





