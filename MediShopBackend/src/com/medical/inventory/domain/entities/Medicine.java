

// Medicine Entity
package com.medical.inventory.domain.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "medicines")
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicineId;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MedicineType type;

    @Column(nullable = false)
    private String category;

    @Column(name = "batch_number", nullable = false)
    private String batchNumber;

    @Column(name = "expiry_date", nullable = false)
    private LocalDate expiryDate;

    @Column(nullable = false)
    private String location;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Constructors
    public Medicine() {}

    public Medicine(String name, MedicineType type, String category,
                    String batchNumber, LocalDate expiryDate, String location, Long supplierId) {
        this.name = name;
        this.type = type;
        this.category = category;
        this.batchNumber = batchNumber;
        this.expiryDate = expiryDate;
        this.location = location;
        this.supplierId = supplierId;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getMedicineId() { return medicineId; }
    public void setMedicineId(Long medicineId) { this.medicineId = medicineId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public MedicineType getType() { return type; }
    public void setType(MedicineType type) { this.type = type; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Long getSupplierId() { return supplierId; }
    public void setSupplierId(Long supplierId) { this.supplierId = supplierId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}