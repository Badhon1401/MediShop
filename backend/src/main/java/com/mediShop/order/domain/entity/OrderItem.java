package com.mediShop.order.domain.entity;

import java.util.UUID;

public class OrderItem {
    private UUID medicineId;
    private Integer quantity;

    public OrderItem(UUID medicineId, Integer quantity) {
        this.medicineId = medicineId;
        this.quantity = quantity;
    }

    public UUID getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(UUID medicineId) {
        this.medicineId = medicineId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

}
