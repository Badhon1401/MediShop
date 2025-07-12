package com.mediShop.inventory.domain.exception;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(String message) {
        super(message);
    }

    public InsufficientStockException(Integer inventoryId, Integer requestedQuantity, Integer availableQuantity) {
        super("Insufficient stock for Inventory ID: " + inventoryId +
                ". Requested: " + requestedQuantity + ", Available: " + availableQuantity);
    }
}