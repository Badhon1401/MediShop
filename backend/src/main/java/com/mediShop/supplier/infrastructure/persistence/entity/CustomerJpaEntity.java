// package com.mediShop.customer.infrastructure.persistence.entity;

// import jakarta.persistence.*;
// import java.time.LocalDate;

// @Entity
// @Table(name = "customers", indexes = {
//     @Index(name = "idx_customer_contact", columnList = "contact_number"),
//     @Index(name = "idx_customer_name", columnList = "name"),
//     @Index(name = "idx_customer_reg_date", columnList = "registration_date")
// })
// public class CustomerJpaEntity {
    
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "customer_id")
//     private Integer customerId;
    
//     @Column(name = "name", nullable = false, length = 255)
//     private String name;
    
//     @Column(name = "contact_number", unique = true, length = 20)
//     private String contactNumber;
    
//     @Column(name = "registration_date")
//     private LocalDate registrationDate;
    
//     @Column(name = "created_at", updatable = false)
//     private LocalDate createdAt;
    
//     @Column(name = "updated_at")
//     private LocalDate updatedAt;
    
//     // Default constructor
//     public CustomerJpaEntity() {
//     }
    
//     // Constructor with parameters
//     public CustomerJpaEntity(String name, String contactNumber, LocalDate registrationDate) {
//         this.name = name;
//         this.contactNumber = contactNumber;
//         this.registrationDate = registrationDate;
//     }
    
//     @PrePersist
//     protected void onCreate() {
//         createdAt = LocalDate.now();
//         updatedAt = LocalDate.now();
//     }
    
//     @PreUpdate
//     protected void onUpdate() {
//         updatedAt = LocalDate.now();
//     }
    
//     // Getters and Setters
//     public Integer getCustomerId() {
//         return customerId;
//     }
    
//     public void setCustomerId(Integer customerId) {
//         this.customerId = customerId;
//     }
    
//     public String getName() {
//         return name;
//     }
    
//     public void setName(String name) {
//         this.name = name;
//     }
    
//     public String getContactNumber() {
//         return contactNumber;
//     }
    
//     public void setContactNumber(String contactNumber) {
//         this.contactNumber = contactNumber;
//     }
    
//     public LocalDate getRegistrationDate() {
//         return registrationDate;
//     }
    
//     public void setRegistrationDate(LocalDate registrationDate) {
//         this.registrationDate = registrationDate;
//     }
    
//     public LocalDate getCreatedAt() {
//         return createdAt;
//     }
    
//     public void setCreatedAt(LocalDate createdAt) {
//         this.createdAt = createdAt;
//     }
    
//     public LocalDate getUpdatedAt() {
//         return updatedAt;
//     }
    
//     public void setUpdatedAt(LocalDate updatedAt) {
//         this.updatedAt = updatedAt;
//     }
    
//     @Override
//     public String toString() {
//         return "CustomerJpaEntity{" +
//                 "customerId=" + customerId +
//                 ", name='" + name + '\'' +
//                 ", contactNumber='" + contactNumber + '\'' +
//                 ", registrationDate=" + registrationDate +
//                 ", createdAt=" + createdAt +
//                 ", updatedAt=" + updatedAt +
//                 '}';
//     }
    
//     @Override
//     public boolean equals(Object o) {
//         if (this == o) return true;
//         if (o == null || getClass() != o.getClass()) return false;
        
//         CustomerJpaEntity that = (CustomerJpaEntity) o;
        
//         return customerId != null ? customerId.equals(that.customerId) : that.customerId == null;
//     }
    
//     @Override
//     public int hashCode() {
//         return customerId != null ? customerId.hashCode() : 0;
//     }
// }