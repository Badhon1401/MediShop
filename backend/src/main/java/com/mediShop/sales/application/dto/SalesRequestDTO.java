// File: src/main/java/com/mediShop/sales/application/dto/SalesRequestDTO.java
package com.mediShop.sales.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import jakarta.validation.Valid;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesRequestDTO {
    
    @NotBlank(message = "Customer name is required")
    @Size(min = 2, max = 100, message = "Customer name must be between 2 and 100 characters")
    private String customerName;
    
    @NotBlank(message = "Customer phone number is required")
    @Pattern(regexp = "^(\\+88)?01[3-9]\\d{8}$", message = "Invalid Bangladeshi phone number")
    private String customerPhoneNumber;
    
    @NotNull(message = "Sales items are required")
    @Size(min = 1, message = "At least one item must be present")
    @Valid
    private List<SalesItemDTO> items;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SalesItemDTO {
        
        @NotBlank(message = "Medicine name is required")
        private String medicineName;
        
        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Quantity must be at least 1")
        private Integer quantity;
        
        @NotNull(message = "Unit price is required")
        @DecimalMin(value = "0.0", inclusive = false, message = "Unit price must be greater than 0")
        private Double unitPrice;
    }
}
