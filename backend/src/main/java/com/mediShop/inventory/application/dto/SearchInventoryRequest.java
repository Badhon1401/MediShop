package com.mediShop.inventory.application.dto;

import com.mediShop.inventory.domain.valueobject.MedicineType;

public class SearchInventoryRequest {
    private String name;
    private MedicineType type; // Using inventory module's MedicineType enum
    private String category;
    private String batchNumber;

    public SearchInventoryRequest() {}

    public SearchInventoryRequest(String name, MedicineType type, String category, String batchNumber) {
        this.name = name;
        this.type = type;
        this.category = category;
        this.batchNumber = batchNumber;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public MedicineType getType() { return type; }
    public void setType(MedicineType type) { this.type = type; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }
}