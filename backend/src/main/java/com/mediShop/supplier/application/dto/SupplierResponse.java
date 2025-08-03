// SupplierResponse.java
package com.mediShop.supplier.application.dto;

import com.mediShop.supplier.domain.entity.Supplier;
import java.time.LocalDateTime;

public class SupplierResponse {
    
    private Integer supplierId;
    private String companyName;
    private String email;
    private String phone;
    private Boolean status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public SupplierResponse() {}
    
    public SupplierResponse(Supplier supplier) {
        this.supplierId = supplier.getSupplierId();
        this.companyName = supplier.getCompanyName();
        this.email = supplier.getEmail();
        this.phone = supplier.getPhone();
        this.status = supplier.getStatus();
        this.createdAt = supplier.getCreatedAt();
        this.updatedAt = supplier.getUpdatedAt();
    }
    
    // Static factory method
    public static SupplierResponse from(Supplier supplier) {
        return new SupplierResponse(supplier);
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
}