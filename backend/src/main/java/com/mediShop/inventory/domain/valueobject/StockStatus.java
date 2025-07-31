package com.mediShop.inventory.domain.valueobject;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Stock status of inventory items", enumAsRef = true)
public enum StockStatus {
    IN_STOCK("In Stock"),
    LOW_STOCK("Low Stock"),
    OUT_OF_STOCK("Out of Stock"),
    EXPIRED("Expired"),
    NEAR_EXPIRY("Near Expiry");

    private final String displayName;

    StockStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
