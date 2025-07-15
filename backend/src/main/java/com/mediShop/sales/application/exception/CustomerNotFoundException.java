// File: src/main/java/com/mediShop/sales/application/exception/CustomerNotFoundException.java
package com.mediShop.sales.application.exception;

public class CustomerNotFoundException extends SalesException {
    
    public CustomerNotFoundException(String message) {
        super(message);
    }
}