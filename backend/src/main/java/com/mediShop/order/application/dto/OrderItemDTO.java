package com.mediShop.order.application.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class OrderItemDTO {

    @NotNull(message = "Medicine ID must not be null")
    private UUID medicineId;

    @NotNull(message = "Quantity must not be null")
    @Min(value = 1, message = "Quantity has to be  at least 1.")
    private Integer quantity;
}
