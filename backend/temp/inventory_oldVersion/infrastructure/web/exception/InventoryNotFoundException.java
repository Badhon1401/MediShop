
// InventoryNotFoundException.java
package com.mediShop.inventory.infrastructure.web.exception;

public class InventoryNotFoundException extends RuntimeException {
    public InventoryNotFoundException(String message) {
        super(message);
    }
    
    public InventoryNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}