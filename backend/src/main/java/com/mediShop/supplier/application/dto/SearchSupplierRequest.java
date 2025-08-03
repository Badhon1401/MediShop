
// SearchSupplierRequest.java
package com.mediShop.supplier.application.dto;

public class SearchSupplierRequest {
    
    private String companyName;
    private String email;
    private String phone;
    private Boolean status;
    
    // Constructors
    public SearchSupplierRequest() {}
    
    public SearchSupplierRequest(String companyName, String email, String phone, Boolean status) {
        this.companyName = companyName;
        this.email = email;
        this.phone = phone;
        this.status = status;
    }
    
    // Getters and Setters
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