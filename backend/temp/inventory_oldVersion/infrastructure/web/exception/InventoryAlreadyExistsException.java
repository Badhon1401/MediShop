
// InventoryAlreadyExistsException.java
package com.mediShop.inventory.infrastructure.web.exception;

public class InventoryAlreadyExistsException extends RuntimeException {
    public InventoryAlreadyExistsException(String message) {
        super(message);
    }
    
    public InventoryAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}