package com.mediShop.customer.application.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Pattern;
// import jakarta.validation.constraints.Size;
import java.time.LocalDate;

// Search Customer Request DTO
public class SearchCustomerRequest {

    private String name;
    private String contactNumber;
    private LocalDate registrationDateFrom;
    private LocalDate registrationDateTo;
    
    // Constructors
    public SearchCustomerRequest() {
    }
    
    public SearchCustomerRequest(String name, String contactNumber, 
                               LocalDate registrationDateFrom, LocalDate registrationDateTo) {
        this.name = name;
        this.contactNumber = contactNumber;
        this.registrationDateFrom = registrationDateFrom;
        this.registrationDateTo = registrationDateTo;
    }
    
    // Getters and Setters
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
    
    public LocalDate getRegistrationDateFrom() {
        return registrationDateFrom;
    }
    
    public void setRegistrationDateFrom(LocalDate registrationDateFrom) {
        this.registrationDateFrom = registrationDateFrom;
    }
    
    public LocalDate getRegistrationDateTo() {
        return registrationDateTo;
    }
    
    public void setRegistrationDateTo(LocalDate registrationDateTo) {
        this.registrationDateTo = registrationDateTo;
    }
}