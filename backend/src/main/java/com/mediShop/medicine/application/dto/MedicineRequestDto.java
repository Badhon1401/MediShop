package com.mediShop.medicine.application.dto;


import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicineRequestDto {

    @NotBlank(message = "Medicine name is required")
    private String name;

    private String groupName;

    @Min(value = 0, message = "Power must be non-negative")
    private Integer power;  // Changed to Integer (nullable)

    private String category;

    @DecimalMin(value = "0.01", message = "Price must be at least 0.01")
    @DecimalMax(value = "99999.99", message = "Price cannot exceed 99999.99")
    @NotNull(message = "Price is required")
    private BigDecimal price;

    private String givenFor;

    @Min(value = 0, message = "Available quantity cannot be negative")
    private Integer availableQuantity;

    @PastOrPresent(message = "Manufactured date cannot be in the future")
    private Date manufacturedDate;

    @Future(message = "Expiry date must be in the future")
    private Date expiryDate;

    @Min(value = 0, message = "Position must be non-negative")
    private Integer position;

    @DecimalMin(value = "0.0", message = "Discount cannot be negative")
    @DecimalMax(value = "100.0", message = "Discount cannot exceed 100%")
    private BigDecimal discountPercentage;
}