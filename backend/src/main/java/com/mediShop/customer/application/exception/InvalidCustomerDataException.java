package com.mediShop.customer.application.exception;

public class InvalidCustomerDataException extends RuntimeException {

    public InvalidCustomerDataException(String message) {
        super(message);
    }
}