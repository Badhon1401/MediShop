package com.mediShop.inventory.domain.entity;

import com.mediShop.inventory.domain.valueobject.MedicineType;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class Inventory {
    private Integer inventoryId;
    private String medicineName;
    private String batchNumber;
    private String companyName;
    private LocalDate expiryDate;
    private String location;
    private LocalDateTime lastUpdated;
    private MedicineType type;
    private LocalDate purchaseDate;
    private Integer totalQuantity;
    private Integer availableQuantity;
    private Double unitPrice;
    private Double purchasePrice;
    private Double discount;

    // Default constructor
    public Inventory() {}

    // Constructor without ID (for creation)
    public Inventory(String medicineName, String batchNumber, String companyName,
                    LocalDate expiryDate, String location, MedicineType type,
                    LocalDate purchaseDate, Integer totalQuantity, Integer availableQuantity,
                    Double unitPrice, Double purchasePrice, Double discount) {
        this.medicineName = medicineName;
        this.batchNumber = batchNumber;
        this.companyName = companyName;
        this.expiryDate = expiryDate;
        this.location = location;
        this.type = type;
        this.purchaseDate = purchaseDate;
        this.totalQuantity = totalQuantity;
        this.availableQuantity = availableQuantity;
        this.unitPrice = unitPrice;
        this.purchasePrice = purchasePrice;
        this.discount = discount;
        this.lastUpdated = LocalDateTime.now();
    }

    // Full constructor
    public Inventory(Integer inventoryId, String medicineName, String batchNumber,
                    String companyName, LocalDate expiryDate, String location,
                    LocalDateTime lastUpdated, MedicineType type, LocalDate purchaseDate,
                    Integer totalQuantity, Integer availableQuantity, Double unitPrice,
                    Double purchasePrice, Double discount) {
        this.inventoryId = inventoryId;
        this.medicineName = medicineName;
        this.batchNumber = batchNumber;
        this.companyName = companyName;
        this.expiryDate = expiryDate;
        this.location = location;
        this.lastUpdated = lastUpdated;
        this.type = type;
        this.purchaseDate = purchaseDate;
        this.totalQuantity = totalQuantity;
        this.availableQuantity = availableQuantity;
        this.unitPrice = unitPrice;
        this.purchasePrice = purchasePrice;
        this.discount = discount;
    }

    // Business methods
    public void updateStock(Integer newAvailableQuantity) {
        if (newAvailableQuantity < 0) {
            throw new IllegalArgumentException("Available quantity cannot be negative");
        }
        if (newAvailableQuantity > this.totalQuantity) {
            throw new IllegalArgumentException("Available quantity cannot exceed total quantity");
        }
        this.availableQuantity = newAvailableQuantity;
        this.lastUpdated = LocalDateTime.now();
    }

    public void reduceStock(Integer quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity to reduce must be positive");
        }
        if (this.availableQuantity < quantity) {
            throw new IllegalArgumentException("Insufficient stock available");
        }
        this.availableQuantity -= quantity;
        this.lastUpdated = LocalDateTime.now();
    }

    public void addStock(Integer quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity to add must be positive");
        }
        this.availableQuantity += quantity;
        this.totalQuantity += quantity;
        this.lastUpdated = LocalDateTime.now();
    }

    public boolean isExpired() {
        return this.expiryDate.isBefore(LocalDate.now());
    }

    public boolean isExpiringSoon(int days) {
        return this.expiryDate.isBefore(LocalDate.now().plusDays(days));
    }

    public boolean isLowStock(Integer threshold) {
        return this.availableQuantity <= threshold;
    }

    public Double calculateStockValue() {
        return this.availableQuantity * this.unitPrice;
    }

    public Double calculateProfit() {
        if (this.purchasePrice == null || this.unitPrice == null) {
            return 0.0;
        }
        return (this.unitPrice - this.purchasePrice) * (this.totalQuantity - this.availableQuantity);
    }

    // Getters and Setters
    public Integer getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(Integer inventoryId) {
        this.inventoryId = inventoryId;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public String getBatchNumber() {
        return batchNumber;
    }

    public void setBatchNumber(String batchNumber) {
        this.batchNumber = batchNumber;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public MedicineType getType() {
        return type;
    }

    public void setType(MedicineType type) {
        this.type = type;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public Integer getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Integer totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public Integer getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(Integer availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(Double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }
}