// ExpiredInventoryException.java
package com.mediShop.inventory.application.exception;

public class ExpiredInventoryException extends RuntimeException {
    public ExpiredInventoryException(Integer inventoryId) {
        super("Cannot perform operation on expired inventory with ID: " + inventoryId);
    }
}