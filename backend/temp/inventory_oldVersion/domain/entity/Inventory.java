// com/mediShop/inventory/domain/entity/Inventory.java
package com.mediShop.inventory.domain.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import com.mediShop.medicine.domain.valueobject.MedicineType;

public class Inventory {
    private final Integer inventoryId;
    private Integer medicineId;
    private String medicineName;
    private MedicineType type;
    private String batchNumber;
    private String companyName;
    private LocalDate expiryDate;
    private String location;
    private LocalDateTime lastUpdated;
    private MedicineType type;
    private Integer supplierId;
    private LocalDate buyingDate;
    private Integer totalQuantity;
    private Integer availableQuantity;
    private BigDecimal unitPrice;
    private BigDecimal buyingPrice;
    private BigDecimal discount;

    public Inventory(Integer inventoryId, Integer medicineId, String batchNumber,
                     String companyName, LocalDate expiryDate, String location,
                     MedicineType type, Integer supplierId, LocalDate buyingDate,
                     Integer totalQuantity, Integer availableQuantity,
                     BigDecimal unitPrice, BigDecimal buyingPrice, BigDecimal discount) {
        this.inventoryId = inventoryId;
        this.medicineId = validateMedicineId(medicineId);
        this.batchNumber = validateBatchNumber(batchNumber);
        this.companyName = validateCompanyName(companyName);
        this.expiryDate = validateExpiryDate(expiryDate);
        this.location = validateLocation(location);
        this.type = type;
        this.supplierId = supplierId;
        this.buyingDate = validateBuyingDate(buyingDate);
        this.totalQuantity = validateTotalQuantity(totalQuantity);
        this.availableQuantity = validateAvailableQuantity(availableQuantity, totalQuantity);
        this.unitPrice = validateUnitPrice(unitPrice);
        this.buyingPrice = validateBuyingPrice(buyingPrice);
        this.discount = validateDiscount(discount);
        this.lastUpdated = LocalDateTime.now();
    }

    public static Inventory create(Integer medicineId, String batchNumber,
                                   String companyName, LocalDate expiryDate,
                                   String location, MedicineType type,
                                   Integer supplierId, LocalDate buyingDate,
                                   Integer totalQuantity, BigDecimal unitPrice,
                                   BigDecimal buyingPrice, BigDecimal discount) {
        return new Inventory(null, medicineId, batchNumber, companyName,
                expiryDate, location, type, supplierId, buyingDate,
                totalQuantity, totalQuantity, unitPrice, buyingPrice, discount);
    }

    private Integer validateMedicineId(Integer medicineId) {
        if (medicineId == null || medicineId <= 0) {
            throw new IllegalArgumentException("Medicine ID must be positive");
        }
        return medicineId;
    }

    private String validateBatchNumber(String batchNumber) {
        if (batchNumber == null || batchNumber.trim().isEmpty()) {
            throw new IllegalArgumentException("Batch number cannot be empty");
        }
        return batchNumber.trim();
    }

    private String validateCompanyName(String companyName) {
        if (companyName == null || companyName.trim().isEmpty()) {
            throw new IllegalArgumentException("Company name cannot be empty");
        }
        return companyName.trim();
    }

    private LocalDate validateExpiryDate(LocalDate expiryDate) {
        if (expiryDate == null) {
            throw new IllegalArgumentException("Expiry date cannot be null");
        }
        if (expiryDate.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Expiry date cannot be in the past");
        }
        return expiryDate;
    }

    private String validateLocation(String location) {
        if (location == null || location.trim().isEmpty()) {
            throw new IllegalArgumentException("Location cannot be empty");
        }
        return location.trim();
    }

    private LocalDate validateBuyingDate(LocalDate buyingDate) {
        if (buyingDate == null) {
            throw new IllegalArgumentException("Buying date cannot be null");
        }
        if (buyingDate.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Buying date cannot be in the future");
        }
        return buyingDate;
    }

    private Integer validateTotalQuantity(Integer totalQuantity) {
        if (totalQuantity == null || totalQuantity < 0) {
            throw new IllegalArgumentException("Total quantity must be non-negative");
        }
        return totalQuantity;
    }

    private Integer validateAvailableQuantity(Integer availableQuantity, Integer totalQuantity) {
        if (availableQuantity == null || availableQuantity < 0) {
            throw new IllegalArgumentException("Available quantity must be non-negative");
        }
        if (totalQuantity != null && availableQuantity > totalQuantity) {
            throw new IllegalArgumentException("Available quantity cannot exceed total quantity");
        }
        return availableQuantity;
    }

    private BigDecimal validateUnitPrice(BigDecimal unitPrice) {
        if (unitPrice == null || unitPrice.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Unit price must be non-negative");
        }
        return unitPrice;
    }

    private BigDecimal validateBuyingPrice(BigDecimal buyingPrice) {
        if (buyingPrice == null || buyingPrice.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Buying price must be non-negative");
        }
        return buyingPrice;
    }

    private BigDecimal validateDiscount(BigDecimal discount) {
        if (discount == null) {
            return BigDecimal.ZERO;
        }
        if (discount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Discount must be non-negative");
        }
        return discount;
    }

    public boolean isExpired() {
        return LocalDate.now().isAfter(expiryDate);
    }

    public boolean isNearExpiry(int daysThreshold) {
        return LocalDate.now().plusDays(daysThreshold).isAfter(expiryDate) ||
                LocalDate.now().plusDays(daysThreshold).isEqual(expiryDate);
    }

    public boolean isLowStock(int threshold) {
        return availableQuantity <= threshold;
    }

    public boolean isOutOfStock() {
        return availableQuantity == 0;
    }

    public void updateStock(Integer newAvailableQuantity) {
        this.availableQuantity = validateAvailableQuantity(newAvailableQuantity, totalQuantity);
        this.lastUpdated = LocalDateTime.now();
    }

    public void updatePricing(BigDecimal unitPrice, BigDecimal discount) {
        this.unitPrice = validateUnitPrice(unitPrice);
        this.discount = validateDiscount(discount);
        this.lastUpdated = LocalDateTime.now();
    }

    public void updateLocation(String location) {
        this.location = validateLocation(location);
        this.lastUpdated = LocalDateTime.now();
    }

    public BigDecimal getEffectivePrice() {
        return unitPrice.subtract(discount);
    }

    public BigDecimal getTotalValue() {
        return getEffectivePrice().multiply(BigDecimal.valueOf(availableQuantity));
    }

    public Integer getUsedQuantity() {
        return totalQuantity - availableQuantity;
    }

    // Getters
    public Integer getInventoryId() { return inventoryId; }
    public Integer getMedicineId() { return medicineId; }
    public String getBatchNumber() { return batchNumber; }
    public String getCompanyName() { return companyName; }
    public LocalDate getExpiryDate() { return expiryDate; }
    public String getLocation() { return location; }
    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public MedicineType getType() { return type; }
    public Integer getSupplierId() { return supplierId; }
    public LocalDate getBuyingDate() { return buyingDate; }
    public Integer getTotalQuantity() { return totalQuantity; }
    public Integer getAvailableQuantity() { return availableQuantity; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public BigDecimal getBuyingPrice() { return buyingPrice; }
    public BigDecimal getDiscount() { return discount; }

    public void updateDetails(String companyName2, LocalDate expiryDate2, String location2, BigDecimal unitPrice2,
            BigDecimal discount2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateDetails'");
    }

    public void addStock(Integer quantity) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addStock'");
    }

    public void removeStock(Integer quantity) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'removeStock'");
    }

    public void setAvailableQuantity(Integer quantity) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setAvailableQuantity'");
    }

    public String getMedicineName() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getMedicineName'");
    }
}
