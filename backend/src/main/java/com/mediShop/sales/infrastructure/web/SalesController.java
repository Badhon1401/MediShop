// File: src/main/java/com/mediShop/sales/infrastructure/web/SalesController.java
package com.mediShop.sales.infrastructure.web;

import com.mediShop.sales.application.dto.SalesRequestDTO;
import com.mediShop.sales.application.dto.SalesResponseDTO;
import com.mediShop.sales.application.usecase.CreateSalesUseCase;
import com.mediShop.sales.application.usecase.GetSalesUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SalesController {
    
    private final CreateSalesUseCase createSalesUseCase;
    private final GetSalesUseCase getSalesUseCase;
    
    @PostMapping
    public ResponseEntity<SalesResponseDTO> createSale(@Valid @RequestBody SalesRequestDTO request) {
        SalesResponseDTO response = createSalesUseCase.execute(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<SalesResponseDTO>> getAllSales() {
        List<SalesResponseDTO> sales = getSalesUseCase.getAllSales();
        return ResponseEntity.ok(sales);
    }
    
    @GetMapping("/sales-id/{salesId}")
    public ResponseEntity<List<SalesResponseDTO>> getSalesBySalesId(@PathVariable Integer salesId) {
        List<SalesResponseDTO> sales = getSalesUseCase.getSalesBySalesId(salesId);
        return ResponseEntity.ok(sales);
    }
    
    @GetMapping("/customer/{customerPhoneNumber}")
    public ResponseEntity<List<SalesResponseDTO>> getSalesByCustomerPhone(@PathVariable String customerPhoneNumber) {
        List<SalesResponseDTO> sales = getSalesUseCase.getSalesByCustomerPhone(customerPhoneNumber);
        return ResponseEntity.ok(sales);
    }
    
    @GetMapping("/date/{date}")
    public ResponseEntity<List<SalesResponseDTO>> getSalesByDate(@PathVariable LocalDate date) {
        List<SalesResponseDTO> sales = getSalesUseCase.getSalesByDate(date);
        return ResponseEntity.ok(sales);
    }
    
    @GetMapping("/date-range")
    public ResponseEntity<List<SalesResponseDTO>> getSalesByDateRange(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        List<SalesResponseDTO> sales = getSalesUseCase.getSalesByDateRange(startDate, endDate);
        return ResponseEntity.ok(sales);
    }
}
