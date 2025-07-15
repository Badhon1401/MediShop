// File: src/main/java/com/mediShop/sales/application/exception/InsufficientStockException.java
package com.mediShop.sales.application.exception;

public class InsufficientStockException extends SalesException {
    
    public InsufficientStockException(String message) {
        super(message);
    }
}