// UpdateSupplierRequest.java
package com.mediShop.supplier.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdateSupplierRequest {
    
    @NotNull(message = "Supplier ID is required")
    private Integer supplierId;
    
    @NotBlank(message = "Company name is required")
    @Size(min = 2, max = 255, message = "Company name must be between 2 and 255 characters")
    private String companyName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Size(max = 255, message = "Email must not exceed 255 characters")
    private String email;
    
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^(?:\\+8801|01)[3-9]\\d{8}$", 
             message = "Please provide a valid Bangladeshi phone number")
    private String phone;
    
    private Boolean status;
    
    // Constructors
    public UpdateSupplierRequest() {}
    
    public UpdateSupplierRequest(Integer supplierId, String companyName, String email, String phone, Boolean status) {
        this.supplierId = supplierId;
        this.companyName = companyName;
        this.email = email;
        this.phone = phone;
        this.status = status;
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
}