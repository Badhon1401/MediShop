
// InventoryResponse.java
package com.mediShop.inventory.application.dto;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.medicine.domain.valueobject.MedicineType;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class InventoryResponse {
    private Integer inventoryId;
    private Integer medicineId;
    private String medicineName;
    private String batchNumber;
    private String companyName;
    private LocalDate expiryDate;
    private String location;
    private MedicineType type;
    private Integer supplierId;
    private LocalDate buyingDate;
    private Integer totalQuantity;
    private Integer availableQuantity;
    private BigDecimal unitPrice;
    private BigDecimal buyingPrice;
    private BigDecimal discount;
    private boolean expired;
    private boolean lowStock;
    private LocalDateTime lastUpdated;

    private InventoryResponse() {}

    public static InventoryResponse from(Inventory inventory) {
        InventoryResponse response = new InventoryResponse();
        response.inventoryId = inventory.getInventoryId();
        response.medicineId = inventory.getMedicineId();
        response.medicineName = inventory.getMedicineName();
        response.batchNumber = inventory.getBatchNumber();
        response.companyName = inventory.getCompanyName();
        response.expiryDate = inventory.getExpiryDate();
        response.location = inventory.getLocation();
        response.type = inventory.getType();
        response.supplierId = inventory.getSupplierId();
        response.buyingDate = inventory.getBuyingDate();
        response.totalQuantity = inventory.getTotalQuantity();
        response.availableQuantity = inventory.getAvailableQuantity();
        response.unitPrice = inventory.getUnitPrice();
        response.buyingPrice = inventory.getBuyingPrice();
        response.discount = inventory.getDiscount();
        response.expired = inventory.isExpired();
        response.lowStock = inventory.isLowStock(31);    // Assuming low stock threshold is 31 days
        response.lastUpdated = inventory.getLastUpdated();
        return response;
    }

    // Getters
    public Integer getInventoryId() { return inventoryId; }
    public Integer getMedicineId() { return medicineId; }
    public String getMedicineName() { return medicineName; }
    public String getBatchNumber() { return batchNumber; }
    public String getCompanyName() { return companyName; }
    public LocalDate getExpiryDate() { return expiryDate; }
    public String getLocation() { return location; }
    public MedicineType getType() { return type; }
    public Integer getSupplierId() { return supplierId; }
    public LocalDate getBuyingDate() { return buyingDate; }
    public Integer getTotalQuantity() { return totalQuantity; }
    public Integer getAvailableQuantity() { return availableQuantity; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public BigDecimal getBuyingPrice() { return buyingPrice; }
    public BigDecimal getDiscount() { return discount; }
    public boolean isExpired() { return expired; }
    public boolean isLowStock() { return lowStock; }
    public LocalDateTime getLastUpdated() { return lastUpdated; }
}