// File: src/main/java/com/mediShop/sales/domain/entity/Customer.java
package com.mediShop.sales.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "customer")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Integer customerId;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "contact_number", unique = true, nullable = false)
    private String contactNumber;
    
    @Column(name = "registration_date", nullable = false)
    private LocalDate registrationDate;
    
    @PrePersist
    protected void onCreate() {
        if (registrationDate == null) {
            registrationDate = LocalDate.now();
        }
    }
}