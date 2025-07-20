package com.mediShop.sales.application.dto;


import java.time.LocalDate;


public class SalesResponse {
  
   private Integer itemsId;
   private Integer salesId;
   private String customerPhoneNumber;
   private LocalDate salesDate;
   private String medicineName;
   private Double medicineUnitPrice;
   private Integer perMedicineTotalQuantity;
   private Double perMedicineTotalAmount;
   private Double totalPricePerCustomerTransaction;


   // Default constructor
   public SalesResponse() {}


   // Parameterized constructor
   public SalesResponse(Integer itemsId, Integer salesId, String customerPhoneNumber,
                       LocalDate salesDate, String medicineName, Double medicineUnitPrice,
                       Integer perMedicineTotalQuantity, Double perMedicineTotalAmount,
                       Double totalPricePerCustomerTransaction) {
       this.itemsId = itemsId;
       this.salesId = salesId;
       this.customerPhoneNumber = customerPhoneNumber;
       this.salesDate = salesDate;
       this.medicineName = medicineName;
       this.medicineUnitPrice = medicineUnitPrice;
       this.perMedicineTotalQuantity = perMedicineTotalQuantity;
       this.perMedicineTotalAmount = perMedicineTotalAmount;
       this.totalPricePerCustomerTransaction = totalPricePerCustomerTransaction;
   }


   // Getters and Setters
   public Integer getItemsId() {
       return itemsId;
   }


   public void setItemsId(Integer itemsId) {
       this.itemsId = itemsId;
   }


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


   public LocalDate getSalesDate() {
       return salesDate;
   }


   public void setSalesDate(LocalDate salesDate) {
       this.salesDate = salesDate;
   }


   public String getMedicineName() {
       return medicineName;
   }


   public void setMedicineName(String medicineName) {
       this.medicineName = medicineName;
   }


   public Double getMedicineUnitPrice() {
       return medicineUnitPrice;
   }


   public void setMedicineUnitPrice(Double medicineUnitPrice) {
       this.medicineUnitPrice = medicineUnitPrice;
   }


   public Integer getPerMedicineTotalQuantity() {
       return perMedicineTotalQuantity;
   }


   public void setPerMedicineTotalQuantity(Integer perMedicineTotalQuantity) {
       this.perMedicineTotalQuantity = perMedicineTotalQuantity;
   }


   public Double getPerMedicineTotalAmount() {
       return perMedicineTotalAmount;
   }


   public void setPerMedicineTotalAmount(Double perMedicineTotalAmount) {
       this.perMedicineTotalAmount = perMedicineTotalAmount;
   }


   public Double getTotalPricePerCustomerTransaction() {
       return totalPricePerCustomerTransaction;
   }


   public void setTotalPricePerCustomerTransaction(Double totalPricePerCustomerTransaction) {
       this.totalPricePerCustomerTransaction = totalPricePerCustomerTransaction;
   }
}