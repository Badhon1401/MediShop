// SalesAnalyticsResponse.java
package com.mediShop.sales.application.dto;

import java.util.List;

public class SalesAnalyticsResponse {

    private Double totalSalesAmount;
    private List<MedicineWiseSalesResponse> medicineWiseSales;

    // Default constructor
    public SalesAnalyticsResponse() {}

    // Parameterized constructor
    public SalesAnalyticsResponse(Double totalSalesAmount, List<MedicineWiseSalesResponse> medicineWiseSales) {
        this.totalSalesAmount = totalSalesAmount;
        this.medicineWiseSales = medicineWiseSales;
    }

    // Getters and Setters
    public Double getTotalSalesAmount() {
        return totalSalesAmount;
    }

    public void setTotalSalesAmount(Double totalSalesAmount) {
        this.totalSalesAmount = totalSalesAmount;
    }

    public List<MedicineWiseSalesResponse> getMedicineWiseSales() {
        return medicineWiseSales;
    }

    public void setMedicineWiseSales(List<MedicineWiseSalesResponse> medicineWiseSales) {
        this.medicineWiseSales = medicineWiseSales;
    }

    @Override
    public String toString() {
        return "SalesAnalyticsResponse{" +
                "totalSalesAmount=" + totalSalesAmount +
                ", medicineWiseSales=" + medicineWiseSales +
                '}';
    }
}