// InventorySearchRequest.java
package com.mediShop.inventory.application.dto;

import com.mediShop.medicine.domain.valueobject.MedicineType;
import java.time.LocalDate;

public class InventorySearchRequest {
    private String medicineName;
    private String batchNumber;
    private String companyName;
    private MedicineType type;
    private Integer supplierId;
    private String location;
    private Boolean expired;
    private Boolean lowStock;
    private LocalDate expiryDateFrom;
    private LocalDate expiryDateTo;
    private Integer page = 0;
    private Integer size = 20;
    private String sortBy = "lastUpdated";
    private String sortDirection = "DESC";

    public InventorySearchRequest() {}

    // Getters and Setters
    public String getMedicineName() { return medicineName; }
    public void setMedicineName(String medicineName) { this.medicineName = medicineName; }

    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public MedicineType getType() { return type; }
    public void setType(MedicineType type) { this.type = type; }

    public Integer getSupplierId() { return supplierId; }
    public void setSupplierId(Integer supplierId) { this.supplierId = supplierId; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Boolean getExpired() { return expired; }
    public void setExpired(Boolean expired) { this.expired = expired; }

    public Boolean getLowStock() { return lowStock; }
    public void setLowStock(Boolean lowStock) { this.lowStock = lowStock; }

    public LocalDate getExpiryDateFrom() { return expiryDateFrom; }
    public void setExpiryDateFrom(LocalDate expiryDateFrom) { this.expiryDateFrom = expiryDateFrom; }

    public LocalDate getExpiryDateTo() { return expiryDateTo; }
    public void setExpiryDateTo(LocalDate expiryDateTo) { this.expiryDateTo = expiryDateTo; }

    public Integer getPage() { return page; }
    public void setPage(Integer page) { this.page = page; }

    public Integer getSize() { return size; }
    public void setSize(Integer size) { this.size = size; }

    public String getSortBy() { return sortBy; }
    public void setSortBy(String sortBy) { this.sortBy = sortBy; }

    public String getSortDirection() { return sortDirection; }
    public void setSortDirection(String sortDirection) { this.sortDirection = sortDirection; }
}