// File: src/main/java/com/mediShop/sales/application/dto/SalesResponseDTO.java
package com.mediShop.sales.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesResponseDTO {
    
    private Integer salesId;
    private String customerName;
    private String customerPhoneNumber;
    private LocalDate salesDate;
    private List<SalesItemResponseDTO> items;
    private Double totalAmount;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SalesItemResponseDTO {
        private Integer itemsId;
        private String medicineName;
        private Double unitPrice;
        private Integer quantity;
        private Double totalAmount;
    }
}