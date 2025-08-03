// Supplier.java - Domain Entity
package com.mediShop.supplier.domain.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "suppliers")
public class Supplier {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_id")
    private Integer supplierId;
    
    @Column(name = "company_name", nullable = false, length = 255)
    private String companyName;
    
    @Column(name = "email", nullable = false, length = 255)
    private String email;
    
    @Column(name = "phone", nullable = false, length = 20)
    private String phone;
    
    @Column(name = "status", nullable = false)
    private Boolean status = true; // active by default
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Supplier() {
        this.createdAt = LocalDateTime.now();
        this.status = true;
    }
    
    public Supplier(String companyName, String email, String phone) {
        this();
        this.companyName = companyName;
        this.email = email;
        this.phone = phone;
    }
    
    // Getters and Setters
    public Integer getSupplierId() {
        return supplierId;
    }
    
    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }
    
    public String getCompanyName() {
        return companyName;
    }
    
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public Boolean getStatus() {
        return status;
    }
    
    public void setStatus(Boolean status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    // Business methods
    public void activate() {
        this.status = true;
        this.updatedAt = LocalDateTime.now();
    }
    
    public void deactivate() {
        this.status = false;
        this.updatedAt = LocalDateTime.now();
    }
    
    public boolean isActive() {
        return this.status != null && this.status;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Supplier supplier = (Supplier) o;
        return Objects.equals(supplierId, supplier.supplierId) &&
               Objects.equals(companyName, supplier.companyName) &&
               Objects.equals(email, supplier.email);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(supplierId, companyName, email);
    }
    
    @Override
    public String toString() {
        return "Supplier{" +
                "supplierId=" + supplierId +
                ", companyName='" + companyName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", status=" + status +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}