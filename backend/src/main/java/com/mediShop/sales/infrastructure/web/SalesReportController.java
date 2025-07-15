// File: src/main/java/com/mediShop/sales/infrastructure/web/SalesReportController.java
package com.mediShop.sales.infrastructure.web;

import com.mediShop.sales.application.dto.SalesReportDTO;
import com.mediShop.sales.application.usecase.GenerateSalesReportUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/reports/sales")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SalesReportController {
    
    private final GenerateSalesReportUseCase generateSalesReportUseCase;
    
    @GetMapping("/daily/{date}")
    public ResponseEntity<SalesReportDTO> getDailyReport(@PathVariable LocalDate date) {
        SalesReportDTO report = generateSalesReportUseCase.generateDailyReport(date);
        return ResponseEntity.ok(report);
    }
    
    @GetMapping("/weekly/{startOfWeek}")
    public ResponseEntity<SalesReportDTO> getWeeklyReport(@PathVariable LocalDate startOfWeek) {
        SalesReportDTO report = generateSalesReportUseCase.generateWeeklyReport(startOfWeek);
        return ResponseEntity.ok(report);
    }
    
    @GetMapping("/monthly/{startOfMonth}")
    public ResponseEntity<SalesReportDTO> getMonthlyReport(@PathVariable LocalDate startOfMonth) {
        SalesReportDTO report = generateSalesReportUseCase.generateMonthlyReport(startOfMonth);
        return ResponseEntity.ok(report);
    }
    
    @GetMapping("/custom")
    public ResponseEntity<SalesReportDTO> getCustomReport(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        SalesReportDTO report = generateSalesReportUseCase.generateCustomReport(startDate, endDate);
        return ResponseEntity.ok(report);
    }
}