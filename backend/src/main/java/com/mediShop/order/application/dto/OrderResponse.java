package com.mediShop.order.application.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class OrderResponse {
    private UUID id;
    private String shopName;
    private String shopLocation;
    private String customerName;
    private String customerContactNumber;
    private String customerAge;
    private Date orderDate;
    private BigDecimal totalAmount;
    private List<OrderItemResponse> items;

    // Constructors, Getters, and Setters
    public OrderResponse() {}

    public OrderResponse(UUID id, String shopName, String shopLocation, String customerName,
                         String customerContactNumber, String customerAge, Date orderDate,
                         BigDecimal totalAmount,  List<OrderItemResponse> items) {
        this.id = id;
        this.shopName = shopName;
        this.shopLocation = shopLocation;
        this.customerName = customerName;
        this.customerContactNumber = customerContactNumber;
        this.customerAge = customerAge;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.items = items;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getShopLocation() {
        return shopLocation;
    }

    public void setShopLocation(String shopLocation) {
        this.shopLocation = shopLocation;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerContactNumber() {
        return customerContactNumber;
    }

    public void setCustomerContactNumber(String customerContactNumber) {
        this.customerContactNumber = customerContactNumber;
    }

    public String getCustomerAge() {
        return customerAge;
    }

    public void setCustomerAge(String customerAge) {
        this.customerAge = customerAge;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<OrderItemResponse> getItems() {
        return items;
    }

    public void setItems(List<OrderItemResponse> items) {
        this.items = items;
    }

    // Getters and setters for all fields...
}
