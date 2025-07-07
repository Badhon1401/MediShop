package com.mediShop.supplier.domain.entity;

import com.mediShop.supplier.domain.valueobject.ContactInfo;
import com.mediShop.supplier.domain.valueobject.SupplierId;

import java.time.LocalDateTime;

public class Supplier {
    private SupplierId supplierId;
    private String name;
    private String contactPerson;
    private ContactInfo contactInfo;
    private String address;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Default constructor
    public Supplier() {}

    // Constructor with all fields
    public Supplier(SupplierId supplierId, String name, String contactPerson,
                   ContactInfo contactInfo, String address, String status,
                   LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.supplierId = supplierId;
        this.name = name;
        this.contactPerson = contactPerson;
        this.contactInfo = contactInfo;
        this.address = address;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public SupplierId getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(SupplierId supplierId) {
        this.supplierId = supplierId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public ContactInfo getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(ContactInfo contactInfo) {
        this.contactInfo = contactInfo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
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

    // Builder pattern
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private SupplierId supplierId;
        private String name;
        private String contactPerson;
        private ContactInfo contactInfo;
        private String address;
        private String status;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder supplierId(SupplierId supplierId) {
            this.supplierId = supplierId;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder contactPerson(String contactPerson) {
            this.contactPerson = contactPerson;
            return this;
        }

        public Builder contactInfo(ContactInfo contactInfo) {
            this.contactInfo = contactInfo;
            return this;
        }

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }

        public Builder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Supplier build() {
            return new Supplier(supplierId, name, contactPerson, contactInfo,
                              address, status, createdAt, updatedAt);
        }
    }
}
