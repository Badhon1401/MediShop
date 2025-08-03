// InsufficientStockException.java
package com.mediShop.inventory.application.exception;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(Integer inventoryId, Integer availableQuantity, Integer requestedQuantity) {
        super("Insufficient stock for inventory ID: " + inventoryId + 
              ". Available: " + availableQuantity + ", Requested: " + requestedQuantity);
    }
}