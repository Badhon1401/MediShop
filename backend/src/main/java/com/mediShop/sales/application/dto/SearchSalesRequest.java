package com.mediShop.sales.application.dto;


import java.time.LocalDate;


public class SearchSalesRequest {
  
   private Integer salesId;
   private String customerPhoneNumber;
   private String medicineName;
   private LocalDate salesDate;
   private LocalDate startDate;
   private LocalDate endDate;


   // Default constructor
   public SearchSalesRequest() {}


   // Getters and Setters
   public Integer getSalesId() {
       return salesId;
   }


   public void setSalesId(Integer salesId) {
       this.salesId = salesId;
   }


   public String getCustomerPhoneNumber() {
       return customerPhoneNumber;
   }


   public void setCustomerPhoneNumber(String customerPhoneNumber) {
       this.customerPhoneNumber = customerPhoneNumber;
   }


   public String getMedicineName() {
       return medicineName;
   }


   public void setMedicineName(String medicineName) {
       this.medicineName = medicineName;
   }


   public LocalDate getSalesDate() {
       return salesDate;
   }


   public void setSalesDate(LocalDate salesDate) {
       this.salesDate = salesDate;
   }


   public LocalDate getStartDate() {
       return startDate;
   }


   public void setStartDate(LocalDate startDate) {
       this.startDate = startDate;
   }


   public LocalDate getEndDate() {
       return endDate;
   }


   public void setEndDate(LocalDate endDate) {
       this.endDate = endDate;
   }
}
