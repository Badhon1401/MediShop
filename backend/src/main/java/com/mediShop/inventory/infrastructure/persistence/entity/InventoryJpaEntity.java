// InventoryJpaEntity.java
package com.mediShop.inventory.infrastructure.persistence.entity;

import com.mediShop.medicine.domain.valueobject.MedicineType;
import com.mediShop.medicine.infrastructure.persistence.entity.MedicineJpaEntity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory")
public class InventoryJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_id")
    private Integer inventoryId;

    @Column(name = "medicine_id", nullable = false)
    private Integer medicineId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", insertable = false, updatable = false)
    private MedicineJpaEntity medicine;


    @Column(name = "batch_number", nullable = false)
    private String batchNumber;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "expiry_date", nullable = false)
    private LocalDate expiryDate;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = true)
    private MedicineType type;

    @Column(name = "supplier_id")
    private Integer supplierId;

    @Column(name = "buying_date", nullable = false)
    private LocalDate buyingDate;

    @Column(name = "total_quantity", nullable = false)
    private Integer totalQuantity;

    @Column(name = "available_quantity", nullable = false)
    private Integer availableQuantity;

    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "buying_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal buyingPrice;

    @Column(name = "discount", precision = 10, scale = 2)
    private BigDecimal discount;

    @PrePersist
    protected void onCreate() {
        lastUpdated = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }

    public InventoryJpaEntity() {}

    // Getters and Setters
    public Integer getInventoryId() { return inventoryId; }
    public void setInventoryId(Integer inventoryId) { this.inventoryId = inventoryId; }

    public Integer getMedicineId() { return medicineId; }
    public void setMedicineId(Integer medicineId) { this.medicineId = medicineId; }

    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }

    public MedicineType getType() { return type; }
    public void setType(MedicineType type) { this.type = type; }

    public Integer getSupplierId() { return supplierId; }
    public void setSupplierId(Integer supplierId) { this.supplierId = supplierId; }

    public LocalDate getBuyingDate() { return buyingDate; }
    public void setBuyingDate(LocalDate buyingDate) { this.buyingDate = buyingDate; }

    public Integer getTotalQuantity() { return totalQuantity; }
    public void setTotalQuantity(Integer totalQuantity) { this.totalQuantity = totalQuantity; }

    public Integer getAvailableQuantity() { return availableQuantity; }
    public void setAvailableQuantity(Integer availableQuantity) { this.availableQuantity = availableQuantity; }

    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }

    public BigDecimal getBuyingPrice() { return buyingPrice; }
    public void setBuyingPrice(BigDecimal buyingPrice) { this.buyingPrice = buyingPrice; }

    public BigDecimal getDiscount() { return discount; }
    public void setDiscount(BigDecimal discount) { this.discount = discount; }
}