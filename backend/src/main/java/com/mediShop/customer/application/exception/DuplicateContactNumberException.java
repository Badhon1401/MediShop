package com.mediShop.customer.application.exception;

public class DuplicateContactNumberException extends RuntimeException {
    
    public DuplicateContactNumberException(String contactNumber) {
        super("Customer with contact number " + contactNumber + " already exists");
    }
}