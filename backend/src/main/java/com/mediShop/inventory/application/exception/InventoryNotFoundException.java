// InventoryNotFoundException.java
package com.mediShop.inventory.application.exception;

public class InventoryNotFoundException extends RuntimeException {
    public InventoryNotFoundException(Integer inventoryId) {
        super("Inventory not found with ID: " + inventoryId);
    }
}