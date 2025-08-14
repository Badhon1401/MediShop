package com.mediShop.inventory.domain.valueobject;

public class QuantityRange {
    private final Integer minQuantity;
    private final Integer maxQuantity;

    public QuantityRange(Integer minQuantity, Integer maxQuantity) {
        if (minQuantity == null || maxQuantity == null) {
            throw new IllegalArgumentException("Quantity range values cannot be null");
        }
        if (minQuantity < 0 || maxQuantity < 0) {
            throw new IllegalArgumentException("Quantity range values must be non-negative");
        }
        if (minQuantity > maxQuantity) {
            throw new IllegalArgumentException("Minimum quantity cannot be greater than maximum quantity");
        }
        this.minQuantity = minQuantity;
        this.maxQuantity = maxQuantity;
    }

    public boolean isInRange(Integer quantity) {
        return quantity >= minQuantity && quantity <= maxQuantity;
    }

    public Integer getMinQuantity() { return minQuantity; }
    public Integer getMaxQuantity() { return maxQuantity; }
}