package com.mediShop.customer.domain.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "customers")
public class Customer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Integer customerId;
    
    @Column(name = "name", nullable = false, length = 255)
    private String name;
    
    @Column(name = "contact_number", length = 20)
    private String contactNumber;
    
    @Column(name = "registration_date")
    private LocalDate registrationDate;
    
    // Default constructor
    public Customer() {
    }
    
    // Constructor with parameters
    public Customer(String name, String contactNumber, LocalDate registrationDate) {
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
    
    @Override
    public String toString() {
        return "Customer{" +
                "customerId=" + customerId +
                ", name='" + name + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", registrationDate=" + registrationDate +
                '}';
    }
}