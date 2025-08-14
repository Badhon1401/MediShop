
// InvalidStockQuantityException.java
package com.mediShop.inventory.application.exception;

public class InvalidStockQuantityException extends RuntimeException {
    public InvalidStockQuantityException(String message) {
        super(message);
    }
}