package com.mediShop.order.application.dto;

public class OrderItemResponse {
    private String medicineName;
    private int quantity;
    private String category;

    public OrderItemResponse() {}

    public OrderItemResponse(String medicineName, int quantity, String category) {
        this.medicineName = medicineName;
        this.quantity = quantity;
        this.category = category;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    // Getters and setters...
}
