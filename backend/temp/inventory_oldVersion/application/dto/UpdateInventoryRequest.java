// UpdateInventoryRequest.java
package com.mediShop.inventory.application.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public class UpdateInventoryRequest {
    @NotNull(message = "Inventory ID is required")
    @Positive(message = "Inventory ID must be positive")
    private Integer inventoryId;

    @Size(max = 100, message = "Company name must not exceed 100 characters")
    private String companyName;

    @Future(message = "Expiry date must be in the future")
    private LocalDate expiryDate;

    @Size(max = 100, message = "Location must not exceed 100 characters")
    private String location;

    @DecimalMin(value = "0.0", inclusive = false, message = "Unit price must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Unit price must have maximum 2 decimal places")
    private BigDecimal unitPrice;

    @DecimalMin(value = "0.0", message = "Discount cannot be negative")
    @DecimalMax(value = "100.0", message = "Discount cannot exceed 100%")
    @Digits(integer = 3, fraction = 2, message = "Discount must have maximum 2 decimal places")
    private BigDecimal discount;

    public UpdateInventoryRequest() {}

    public UpdateInventoryRequest(Integer inventoryId, String companyName, LocalDate expiryDate,
                                  String location, BigDecimal unitPrice, BigDecimal discount) {
        this.inventoryId = inventoryId;
        this.companyName = companyName;
        this.expiryDate = expiryDate;
        this.location = location;
        this.unitPrice = unitPrice;
        this.discount = discount;
    }

    // Getters and Setters
    public Integer getInventoryId() { return inventoryId; }
    public void setInventoryId(Integer inventoryId) { this.inventoryId = inventoryId; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }

    public BigDecimal getDiscount() { return discount; }
    public void setDiscount(BigDecimal discount) { this.discount = discount; }
}