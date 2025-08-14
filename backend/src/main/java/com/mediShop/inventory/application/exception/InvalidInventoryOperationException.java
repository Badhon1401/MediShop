// InvalidInventoryOperationException.java
package com.mediShop.inventory.application.exception;

public class InvalidInventoryOperationException extends RuntimeException {
    public InvalidInventoryOperationException(String message) {
        super(message);
    }
}