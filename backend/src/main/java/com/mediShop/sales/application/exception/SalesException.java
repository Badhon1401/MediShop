// File: src/main/java/com/mediShop/sales/application/exception/SalesException.java
package com.mediShop.sales.application.exception;

public class SalesException extends RuntimeException {
    
    public SalesException(String message) {
        super(message);
    }
    
    public SalesException(String message, Throwable cause) {
        super(message, cause);
    }
}