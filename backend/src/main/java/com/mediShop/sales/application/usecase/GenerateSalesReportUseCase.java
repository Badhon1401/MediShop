// File: src/main/java/com/mediShop/sales/application/usecase/GenerateSalesReportUseCase.java
package com.mediShop.sales.application.usecase;

import com.mediShop.sales.application.dto.SalesReportDTO;
import com.mediShop.sales.application.dto.SalesResponseDTO;
import com.mediShop.sales.domain.repository.SalesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GenerateSalesReportUseCase {
    
    private final SalesRepository salesRepository;
    private final GetSalesUseCase getSalesUseCase;
    
    public SalesReportDTO generateDailyReport(LocalDate date) {
        return generateReport(date, date);
    }
    
    public SalesReportDTO generateWeeklyReport(LocalDate startOfWeek) {
        LocalDate endOfWeek = startOfWeek.plusDays(6);
        return generateReport(startOfWeek, endOfWeek);
    }
    
    public SalesReportDTO generateMonthlyReport(LocalDate startOfMonth) {
        LocalDate endOfMonth = startOfMonth.plusMonths(1).minusDays(1);
        return generateReport(startOfMonth, endOfMonth);
    }
    
    public SalesReportDTO generateCustomReport(LocalDate startDate, LocalDate endDate) {
        return generateReport(startDate, endDate);
    }
    
    private SalesReportDTO generateReport(LocalDate startDate, LocalDate endDate) {
        // Get total sales amount
        Double totalSalesAmount = salesRepository.getTotalSalesAmountBetweenDates(startDate, endDate)
                .orElse(0.0);
        
        // Get sales details
        List<SalesResponseDTO> salesDetails = getSalesUseCase.getSalesByDateRange(startDate, endDate);
        
        // Get top selling medicines
        List<Object[]> topSellingData = salesRepository.getTopSellingMedicines(startDate, endDate);
        List<SalesReportDTO.TopSellingMedicineDTO> topSellingMedicines = topSellingData.stream()
                .map(data -> new SalesReportDTO.TopSellingMedicineDTO(
                    (String) data[0],
                    (Long) data[1]
                ))
                .collect(Collectors.toList());
        
        return new SalesReportDTO(
            startDate,
            endDate,
            totalSalesAmount,
            salesDetails.size(),
            topSellingMedicines,
            salesDetails
        );
    }
}