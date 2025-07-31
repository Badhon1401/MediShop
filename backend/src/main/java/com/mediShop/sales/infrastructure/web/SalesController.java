package com.mediShop.sales.infrastructure.web;

import com.mediShop.sales.application.dto.*;
import com.mediShop.sales.application.usecase.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@Tag(name = "Sales Management", description = "APIs for managing sales records")
@CrossOrigin(origins = "*")
public class SalesController {

    private final AddSalesUseCase addSalesUseCase;
    private final GetAllSalesUseCase getAllSalesUseCase;
    private final SearchSalesUseCase searchSalesUseCase;
    private final UpdateSalesUseCase updateSalesUseCase;
    private final DeleteSalesUseCase deleteSalesUseCase;
    private final GetTotalSalesAmountByDateUseCase getTotalSalesAmountByDateUseCase;
    private final GetTotalSalesAmountBetweenDatesUseCase getTotalSalesAmountBetweenDatesUseCase;
    private final GetMedicineWiseSalesUseCase getMedicineWiseSalesUseCase;

    @Autowired
    public SalesController(AddSalesUseCase addSalesUseCase,
                           GetAllSalesUseCase getAllSalesUseCase,
                           SearchSalesUseCase searchSalesUseCase,
                           UpdateSalesUseCase updateSalesUseCase,
                           DeleteSalesUseCase deleteSalesUseCase,
                           GetTotalSalesAmountByDateUseCase getTotalSalesAmountByDateUseCase,
                           GetTotalSalesAmountBetweenDatesUseCase getTotalSalesAmountBetweenDatesUseCase,
                           GetMedicineWiseSalesUseCase getMedicineWiseSalesUseCase) {
        this.addSalesUseCase = addSalesUseCase;
        this.getAllSalesUseCase = getAllSalesUseCase;
        this.searchSalesUseCase = searchSalesUseCase;
        this.updateSalesUseCase = updateSalesUseCase;
        this.deleteSalesUseCase = deleteSalesUseCase;
        this.getTotalSalesAmountByDateUseCase = getTotalSalesAmountByDateUseCase;
        this.getTotalSalesAmountBetweenDatesUseCase = getTotalSalesAmountBetweenDatesUseCase;
        this.getMedicineWiseSalesUseCase = getMedicineWiseSalesUseCase;
    }

    @PostMapping
    @Operation(summary = "Add new sales record", description = "Creates a new sales transaction record")
    public ResponseEntity<SalesResponse> addSales(@Valid @RequestBody SalesRequest request) {
        SalesResponse response = addSalesUseCase.execute(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all sales records", description = "Retrieves all sales transactions")
    public ResponseEntity<List<SalesResponse>> getAllSales() {
        List<SalesResponse> salesList = getAllSalesUseCase.execute();
        return ResponseEntity.ok(salesList);
    }

    @PostMapping("/search")
    @Operation(summary = "Search sales records", description = "Search sales by various criteria")
    public ResponseEntity<List<SalesResponse>> searchSales(@RequestBody SearchSalesRequest request) {
        List<SalesResponse> salesList = searchSalesUseCase.execute(request);
        return ResponseEntity.ok(salesList);
    }

    @PutMapping
    @Operation(summary = "Update sales record", description = "Updates an existing sales record")
    public ResponseEntity<SalesResponse> updateSales(@Valid @RequestBody UpdateSalesRequest request) {
        SalesResponse response = updateSalesUseCase.execute(request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{itemsId}")
    @Operation(summary = "Delete sales record", description = "Deletes a sales record by items ID")
    public ResponseEntity<Void> deleteSales(
            @Parameter(description = "Items ID of the sales record to delete")
            @PathVariable Integer itemsId) {
        deleteSalesUseCase.execute(itemsId);
        return ResponseEntity.noContent().build();
    }

    // Analytics endpoints
    @GetMapping("/analytics/total-amount")
    @Operation(summary = "Get total sales amount", description = "Get total sales amount by date or between dates")
    public ResponseEntity<Double> getTotalSalesAmount(
            @Parameter(description = "Specific date (YYYY-MM-DD)")
            @RequestParam(required = false) String date,
            @Parameter(description = "Start date for range query (YYYY-MM-DD)")
            @RequestParam(required = false) String startDate,
            @Parameter(description = "End date for range query (YYYY-MM-DD)")
            @RequestParam(required = false) String endDate) {

        Double totalAmount;

        if (date != null) {
            // Single date query
            totalAmount = getTotalSalesAmountByDateUseCase.execute(date);
        } else if (startDate != null && endDate != null) {
            // Date range query
            TotalSalesAmountBetweenDatesRequest request = new TotalSalesAmountBetweenDatesRequest(startDate, endDate);
            totalAmount = getTotalSalesAmountBetweenDatesUseCase.execute(request);
        } else {
            throw new IllegalArgumentException("Either 'date' or both 'startDate' and 'endDate' must be provided");
        }

        return ResponseEntity.ok(totalAmount);
    }

    @GetMapping("/analytics/medicine-wise-sales")
    @Operation(summary = "Get medicine wise sales", description = "Get total quantity sold for each medicine")
    public ResponseEntity<List<Object[]>> getMedicineWiseSales() {
        List<Object[]> medicineWiseSales = getMedicineWiseSalesUseCase.execute();
        return ResponseEntity.ok(medicineWiseSales);
    }
}