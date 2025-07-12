// AddInventoryRequest.java
package com.mediShop.inventory.application.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

import com.mediShop.medicine.domain.valueobject.MedicineType;

public class AddInventoryRequest {
    @NotNull(message = "Medicine ID is required")
    @Positive(message = "Medicine ID must be positive")
    private Integer medicineId;

    @NotBlank(message = "Batch number is required")
    @Size(max = 50, message = "Batch number must not exceed 50 characters")
    private String batchNumber;

    @NotBlank(message = "Company name is required")
    @Size(max = 100, message = "Company name must not exceed 100 characters")
    private String companyName;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Type is required")
    private MedicineType type;

    @NotNull(message = "Expiry date is required")
    @Future(message = "Expiry date must be in the future")
    private LocalDate expiryDate;

    @Size(max = 100, message = "Location must not exceed 100 characters")
    private String location;

    @NotNull(message = "Supplier ID is required")
    @Positive(message = "Supplier ID must be positive")
    private Integer supplierId;

    @NotNull(message = "Buying date is required")
    @PastOrPresent(message = "Buying date cannot be in the future")
    private LocalDate buyingDate;

    @NotNull(message = "Total quantity is required")
    @Positive(message = "Total quantity must be positive")
    private Integer totalQuantity;

    @NotNull(message = "Unit price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Unit price must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Unit price must have maximum 2 decimal places")
    private BigDecimal unitPrice;

    @NotNull(message = "Buying price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Buying price must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Buying price must have maximum 2 decimal places")
    private BigDecimal buyingPrice;

    @DecimalMin(value = "0.0", message = "Discount cannot be negative")
    @DecimalMax(value = "100.0", message = "Discount cannot exceed 100%")
    @Digits(integer = 3, fraction = 2, message = "Discount must have maximum 2 decimal places")
    private BigDecimal discount = BigDecimal.ZERO;

    public AddInventoryRequest() {}

    public AddInventoryRequest(Integer medicineId, String batchNumber, String companyName,
                               LocalDate expiryDate, String location, Integer supplierId,
                               LocalDate buyingDate, Integer totalQuantity, BigDecimal unitPrice,
                               BigDecimal buyingPrice, BigDecimal discount) {
        this.medicineId = medicineId;
        this.batchNumber = batchNumber;
        this.companyName = companyName;
        this.expiryDate = expiryDate;
        this.location = location;
        this.supplierId = supplierId;
        this.buyingDate = buyingDate;
        this.totalQuantity = totalQuantity;
        this.unitPrice = unitPrice;
        this.buyingPrice = buyingPrice;
        this.discount = discount;
    }

    // Getters and Setters
    public Integer getMedicineId() { return medicineId; }
    public void setMedicineId(Integer medicineId) { this.medicineId = medicineId; }

    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public MedicineType getType() { return type; }
    public void setType(MedicineType type) { this.type = type; }


    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Integer getSupplierId() { return supplierId; }
    public void setSupplierId(Integer supplierId) { this.supplierId = supplierId; }

    public LocalDate getBuyingDate() { return buyingDate; }
    public void setBuyingDate(LocalDate buyingDate) { this.buyingDate = buyingDate; }

    public Integer getTotalQuantity() { return totalQuantity; }
    public void setTotalQuantity(Integer totalQuantity) { this.totalQuantity = totalQuantity; }

    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }

    public BigDecimal getBuyingPrice() { return buyingPrice; }
    public void setBuyingPrice(BigDecimal buyingPrice) { this.buyingPrice = buyingPrice; }

    public BigDecimal getDiscount() { return discount; }
    public void setDiscount(BigDecimal discount) { this.discount = discount; }
}