package com.mediShop.order.domain.entity;

import com.mediShop.shop.domain.entity.Shop;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class Order {
    private UUID id;
    private Shop shop;
    private String customerName;
    private String customerContactNumber;
    private String customerAge;
    private Date orderDate;
    private BigDecimal totalAmount;
    private List<OrderItem> items;

    public Order(UUID id,Shop shop, String customerName, String customerContactNumber, String customerAge,
                 Date orderDate, BigDecimal totalAmount, List<OrderItem> items) {
        this.id = id;
        this.shop=shop;
        this.customerName = customerName;
        this.customerContactNumber = customerContactNumber;
        this.customerAge = customerAge;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.items = items;
    }
    public Order( Shop shop,String customerName, String customerContactNumber, String customerAge,
                 Date orderDate, BigDecimal totalAmount, List<OrderItem> items) {

        this.shop=shop;
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

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public Shop getShop() {
        return shop;
    }

    public void setShopId(Shop shop) {
        this.shop = shop;
    }
}
