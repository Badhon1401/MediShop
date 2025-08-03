// DuplicateInventoryException.java
package com.mediShop.inventory.application.exception;

public class DuplicateInventoryException extends RuntimeException {
    public DuplicateInventoryException(Integer medicineId, String batchNumber) {
        super("Inventory already exists for medicine ID: " + medicineId + " and batch number: " + batchNumber);
    }
}