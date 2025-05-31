package com.sda.medishop.domain;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class Order {
    private final UUID id;
    private List<Medicine> medicineList;
    private  String customerName;
    private  String customerContactNumber;
    private String customerAge;
    private Date orderDate;
    private boolean isDelivered;
    private double totalAmount;
    private double discountedAmount;
    private double amountPaid;

    public Order(UUID id, List<Medicine> medicineList, String customerName, String customerContactNumber, String customerAge, Date orderDate, boolean isDelivered, double totalAmount, double discountedAmount, double amountPaid) {
        this.id = id;
        this.medicineList = medicineList;
        this.customerName = customerName;
        this.customerContactNumber = customerContactNumber;
        this.customerAge = customerAge;
        this.orderDate = orderDate;
        this.isDelivered = isDelivered;
        this.totalAmount = totalAmount;
        this.discountedAmount = discountedAmount;
        this.amountPaid = amountPaid;
    }
}
