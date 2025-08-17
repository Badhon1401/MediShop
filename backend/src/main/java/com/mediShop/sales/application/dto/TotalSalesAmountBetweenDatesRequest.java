// TotalSalesAmountBetweenDatesRequest.java
package com.mediShop.sales.application.dto;

import jakarta.validation.constraints.NotBlank;

public class TotalSalesAmountBetweenDatesRequest {

    @NotBlank(message = "Start date is required")
    private String startDate;

    @NotBlank(message = "End date is required")
    private String endDate;

    // Default constructor
    public TotalSalesAmountBetweenDatesRequest() {}

    // Parameterized constructor
    public TotalSalesAmountBetweenDatesRequest(String startDate, String endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Getters and Setters
    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return "TotalSalesAmountBetweenDatesRequest{" +
                "startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                '}';
    }
}


