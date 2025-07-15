// File: src/main/java/com/mediShop/sales/application/dto/SalesReportDTO.java
package com.mediShop.sales.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesReportDTO {
    
    private LocalDate startDate;
    private LocalDate endDate;
    private Double totalSalesAmount;
    private Integer totalTransactions;
    private List<TopSellingMedicineDTO> topSellingMedicines;
    private List<SalesResponseDTO> salesDetails;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TopSellingMedicineDTO {
        private String medicineName;
        private Long totalQuantitySold;
    }
}