package com.mediShop.inventory.domain.exception;

public class InventoryNotFoundException extends RuntimeException {
    public InventoryNotFoundException(String message) {
        super(message);
    }

    public InventoryNotFoundException(Integer inventoryId) {
        super("Inventory not found with ID: " + inventoryId);
    }
}