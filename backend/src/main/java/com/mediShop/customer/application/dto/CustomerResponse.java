package com.mediShop.customer.application.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Pattern;
// import jakarta.validation.constraints.Size;
import java.time.LocalDate;
// Customer Response DTO
public class CustomerResponse {
    
    private Integer customerId;
    private String name;
    private String contactNumber;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate registrationDate;
    
    // Constructors
    public CustomerResponse() {
    }
    
    public CustomerResponse(Integer customerId, String name, String contactNumber, LocalDate registrationDate) {
        this.customerId = customerId;
        this.name = name;
        this.contactNumber = contactNumber;
        this.registrationDate = registrationDate;
    }
    
    // Getters and Setters
    public Integer getCustomerId() {
        return customerId;
    }
    
    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getContactNumber() {
        return contactNumber;
    }
    
    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }
    
    public LocalDate getRegistrationDate() {
        return registrationDate;
    }
    
    public void setRegistrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
    }
}
