
// StockOperation.java
package com.mediShop.inventory.application.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class StockOperation {
    @NotNull(message = "Inventory ID is required")
    private Integer inventoryId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    // Constructors
    public StockOperation() {}

    public StockOperation(Integer inventoryId, Integer quantity) {
        this.inventoryId = inventoryId;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Integer getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(Integer inventoryId) {
        this.inventoryId = inventoryId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}