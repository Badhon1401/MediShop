// File: src/main/java/com/mediShop/sales/domain/entity/Sales.java
package com.mediShop.sales.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "sales")
@Data
@NoArgsConstructor
@AllArgsConstructor
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
    
    @PrePersist
    protected void onCreate() {
        if (salesDate == null) {
            salesDate = LocalDate.now();
        }
    }
}