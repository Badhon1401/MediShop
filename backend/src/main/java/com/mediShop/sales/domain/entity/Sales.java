package com.mediShop.sales.domain.entity;


import jakarta.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name = "sales")
public class Sales {
  
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "items_id")
   private Integer itemsId;
  
   @Column(name = "sales_id", nullable = false)
   private Integer salesId;
  
   @Column(name = "customer_phone_number", nullable = false)
   private String customerPhoneNumber;
  
   @Column(name = "sales_date", nullable = false)
   private LocalDate salesDate;
  
   @Column(name = "medicine_name", nullable = false)
   private String medicineName;
  
   @Column(name = "medicine_unit_price", nullable = false)
   private Double medicineUnitPrice;
  
   @Column(name = "per_medicine_total_quantity", nullable = false)
   private Integer perMedicineTotalQuantity;
  
   @Column(name = "per_medicine_total_amount", nullable = false)
   private Double perMedicineTotalAmount;
  
   @Column(name = "total_price_per_customer_transaction", nullable = false)
   private Double totalPricePerCustomerTransaction;


   // Default constructor
   public Sales() {}


   // Parameterized constructor
   public Sales(Integer salesId, String customerPhoneNumber, LocalDate salesDate,
               String medicineName, Double medicineUnitPrice, Integer perMedicineTotalQuantity,
               Double perMedicineTotalAmount, Double totalPricePerCustomerTransaction) {
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


   @Override
   public String toString() {
       return "Sales{" +
               "itemsId=" + itemsId +
               ", salesId=" + salesId +
               ", customerPhoneNumber='" + customerPhoneNumber + '\'' +
               ", salesDate=" + salesDate +
               ", medicineName='" + medicineName + '\'' +
               ", medicineUnitPrice=" + medicineUnitPrice +
               ", perMedicineTotalQuantity=" + perMedicineTotalQuantity +
               ", perMedicineTotalAmount=" + perMedicineTotalAmount +
               ", totalPricePerCustomerTransaction=" + totalPricePerCustomerTransaction +
               '}';
   }
}

