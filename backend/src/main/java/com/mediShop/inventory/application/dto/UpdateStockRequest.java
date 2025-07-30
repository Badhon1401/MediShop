
// UpdateStockRequest.java
package com.mediShop.inventory.application.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class UpdateStockRequest {
    @NotNull(message = "Inventory ID is required")
    private Integer inventoryId;

    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity cannot be negative")
    private Integer quantity;

    // Constructors
    public UpdateStockRequest() {}

    public UpdateStockRequest(Integer inventoryId, Integer quantity) {
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
