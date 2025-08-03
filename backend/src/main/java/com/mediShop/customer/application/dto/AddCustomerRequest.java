package com.mediShop.customer.application.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

// Add Customer Request DTO
public class AddCustomerRequest {
    
    @NotBlank(message = "Name is required")
    @Size(max = 255, message = "Name must not exceed 255 characters")
    private String name;
    
    @Pattern(regexp = "^(\\+88)?01[3-9]\\d{8}$", message = "Invalid Bangladeshi phone number format")
    private String contactNumber;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate registrationDate;
    
    // Constructors
    public AddCustomerRequest() {
    }
    
    public AddCustomerRequest(String name, String contactNumber, LocalDate registrationDate) {
        this.name = name;
        this.contactNumber = contactNumber;
        this.registrationDate = registrationDate;
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
    
    public LocalDate getRegistrationDate() {
        return registrationDate;
    }
    
    public void setRegistrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
    }
}



