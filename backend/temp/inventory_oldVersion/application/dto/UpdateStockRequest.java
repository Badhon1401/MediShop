
// UpdateStockRequest.java
package com.mediShop.inventory.application.dto;

import jakarta.validation.constraints.*;

public class UpdateStockRequest {
    @NotNull(message = "Inventory ID is required")
    @Positive(message = "Inventory ID must be positive")
    private Integer inventoryId;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be positive")
    private Integer quantity;

    @NotNull(message = "Operation type is required")
    private StockOperation operation;

    public UpdateStockRequest() {}

    public UpdateStockRequest(Integer inventoryId, Integer quantity, StockOperation operation) {
        this.inventoryId = inventoryId;
        this.quantity = quantity;
        this.operation = operation;
    }

    // Getters and Setters
    public Integer getInventoryId() { return inventoryId; }
    public void setInventoryId(Integer inventoryId) { this.inventoryId = inventoryId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public StockOperation getOperation() { return operation; }
    public void setOperation(StockOperation operation) { this.operation = operation; }
}