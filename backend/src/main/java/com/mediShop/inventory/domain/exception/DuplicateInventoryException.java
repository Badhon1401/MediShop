package com.mediShop.inventory.domain.exception;

public class DuplicateInventoryException extends RuntimeException {
    public DuplicateInventoryException(String message) {
        super(message);
    }

    public DuplicateInventoryException(Integer medicineId, String batchNumber) {
        super("Inventory already exists for Medicine ID: " + medicineId + " and Batch Number: " + batchNumber);
    }
}