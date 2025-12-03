package com.mediShop.order.application.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class CreateOrderRequestDTO {

    @NotNull(message = "Shop ID must not be null")
    private UUID shopId;

    @NotBlank(message = "Customer name must not be blank")
    private String customerName;

    @NotBlank(message = "Customer contact number must not be blank")
    private String customerContactNumber;

    @NotBlank(message = "Customer age must not be blank")
    private String customerAge;

    @NotEmpty(message = "Order must contain at least one item")
    @Valid
    private List<OrderItemDTO> items;

    @NotNull(message = "Total amount must not be null")
    private BigDecimal totalAmount;
}
