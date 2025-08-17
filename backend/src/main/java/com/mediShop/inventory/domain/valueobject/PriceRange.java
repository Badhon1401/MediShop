package com.mediShop.inventory.domain.valueobject;

import java.math.BigDecimal;

public class PriceRange {
    private final BigDecimal minPrice;
    private final BigDecimal maxPrice;

    public PriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        if (minPrice == null || maxPrice == null) {
            throw new IllegalArgumentException("Price range values cannot be null");
        }
        if (minPrice.compareTo(BigDecimal.ZERO) < 0 || maxPrice.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Price range values must be non-negative");
        }
        if (minPrice.compareTo(maxPrice) > 0) {
            throw new IllegalArgumentException("Minimum price cannot be greater than maximum price");
        }
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }

    public boolean isInRange(BigDecimal price) {
        return price.compareTo(minPrice) >= 0 && price.compareTo(maxPrice) <= 0;
    }

    public BigDecimal getMinPrice() { return minPrice; }
    public BigDecimal getMaxPrice() { return maxPrice; }
}