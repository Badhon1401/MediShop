package com.mediShop.sales.application.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;


public class SalesRequest {
  
   @NotNull(message = "Sales ID is required")
   private Integer salesId;
  
   @NotBlank(message = "Customer phone number is required")
   @Pattern(regexp = "^(\\+88)?01[3-9]\\d{8}$", message = "Invalid Bangladeshi phone number")
   private String customerPhoneNumber;
  
   @NotNull(message = "Sales date is required")
   private LocalDate salesDate;
  
   @NotBlank(message = "Medicine name is required")
   private String medicineName;
  
   @NotNull(message = "Medicine unit price is required")
   @Positive(message = "Medicine unit price must be positive")
   private Double medicineUnitPrice;
  
   @NotNull(message = "Quantity is required")
   @Positive(message = "Quantity must be positive")
   private Integer perMedicineTotalQuantity;
  
   @NotNull(message = "Total amount is required")
   @Positive(message = "Total amount must be positive")
   private Double perMedicineTotalAmount;
  
   @NotNull(message = "Total price per customer transaction is required")
   @Positive(message = "Total price must be positive")
   private Double totalPricePerCustomerTransaction;


   // Default constructor
   public SalesRequest() {}


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
