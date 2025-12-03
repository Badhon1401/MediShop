package com.mediShop.order.infrastructure.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.util.UUID;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicineQuantity {

    @Column(nullable = false)
    private UUID medicineId;

    @Column(nullable = false, precision = 10, scale = 2)
    private int quantity;
}

