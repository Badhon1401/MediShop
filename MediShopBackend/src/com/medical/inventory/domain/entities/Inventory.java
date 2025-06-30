
// Inventory Entity
package com.medical.inventory.domain.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inventoryId;

    @Column(name = "medicine_id", nullable = false)
    private Long medicineId;

    @Column(name = "batch_number", nullable = false)
    private String batchNumber;

    @Column(name = "quantity_available", nullable = false)
    private Integer quantityAvailable;

    @Column(name = "quantity_reserved")
    private Integer quantityReserved = 0;

    @Column(name = "expiry_date", nullable = false)
    private LocalDate expiryDate;

    @Column(nullable = false)
    private String location;

    @Column(name = "minimum_threshold")
    private Integer minimumThreshold = 10;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    // Constructors
    public Inventory() {}

    public Inventory(Long medicineId, String batchNumber, Integer quantityAvailable,
                     LocalDate expiryDate, String location) {
        this.medicineId = medicineId;
        this.batchNumber = batchNumber;
        this.quantityAvailable = quantityAvailable;
        this.expiryDate = expiryDate;
        this.location = location;
        this.lastUpdated = LocalDateTime.now();
    }

    // Business logic methods
    public boolean isLowStock() {
        return quantityAvailable <= minimumThreshold;
    }

    public boolean isExpiringSoon(int daysThreshold) {
        return expiryDate.isBefore(LocalDate.now().plusDays(daysThreshold));
    }

    public boolean isExpired() {
        return expiryDate.isBefore(LocalDate.now());
    }

    public void updateQuantity(int soldQuantity) {
        if (soldQuantity > quantityAvailable) {
            throw new IllegalArgumentException("Cannot sell more than available quantity");
        }
        this.quantityAvailable -= soldQuantity;
        this.lastUpdated = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getInventoryId() { return inventoryId; }
    public void setInventoryId(Long inventoryId) { this.inventoryId = inventoryId; }

    public Long getMedicineId() { return medicineId; }
    public void setMedicineId(Long medicineId) { this.medicineId = medicineId; }

    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }

    public Integer getQuantityAvailable() { return quantityAvailable; }
    public void setQuantityAvailable(Integer quantityAvailable) { this.quantityAvailable = quantityAvailable; }

    public Integer getQuantityReserved() { return quantityReserved; }
    public void setQuantityReserved(Integer quantityReserved) { this.quantityReserved = quantityReserved; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Integer getMinimumThreshold() { return minimumThreshold; }
    public void setMinimumThreshold(Integer minimumThreshold) { this.minimumThreshold = minimumThreshold; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
}
