// MedicineWiseSalesResponse.java
package com.mediShop.sales.application.dto;

public class MedicineWiseSalesResponse {

    private String medicineName;
    private Long totalQuantity;

    // Default constructor
    public MedicineWiseSalesResponse() {}

    // Parameterized constructor
    public MedicineWiseSalesResponse(String medicineName, Long totalQuantity) {
        this.medicineName = medicineName;
        this.totalQuantity = totalQuantity;
    }

    // Getters and Setters
    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public Long getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Long totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    @Override
    public String toString() {
        return "MedicineWiseSalesResponse{" +
                "medicineName='" + medicineName + '\'' +
                ", totalQuantity=" + totalQuantity +
                '}';
    }
}
