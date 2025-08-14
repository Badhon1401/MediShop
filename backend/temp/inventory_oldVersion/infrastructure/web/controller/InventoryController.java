
// InventoryController.java
package com.mediShop.inventory.infrastructure.web.controller;

import com.mediShop.inventory.application.usecase.*;
import com.mediShop.inventory.application.dto.*;
import com.mediShop.medicine.domain.valueobject.MedicineType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {
    
    private final AddInventoryUseCase addInventoryUseCase;
    private final UpdateInventoryUseCase updateInventoryUseCase;
    private final GetInventoryUseCase getInventoryUseCase;
    private final SearchInventoryUseCase searchInventoryUseCase;
    private final GetExpiredInventoryUseCase GetExpiredInventoryUseCase;
    private final GetLowStockInventoryUseCase getLowStockInventoryUseCase;
    private final DeleteInventoryUseCase deleteInventoryUseCase;
    // private final GetInventoryStatsUseCase getInventoryStatsUseCase;
    
    public InventoryController(AddInventoryUseCase addInventoryUseCase,
                              UpdateInventoryUseCase updateInventoryUseCase,
                              GetInventoryUseCase getInventoryUseCase,
                              SearchInventoryUseCase searchInventoryUseCase,
                              GetExpiredInventoryUseCase GetExpiredInventoryUseCase,
                              GetLowStockInventoryUseCase getLowStockInventoryUseCase,
                              DeleteInventoryUseCase deleteInventoryUseCase) {
        this.addInventoryUseCase = addInventoryUseCase;
        this.updateInventoryUseCase = updateInventoryUseCase;
        this.getInventoryUseCase = getInventoryUseCase;
        this.searchInventoryUseCase = searchInventoryUseCase;
        this.GetExpiredInventoryUseCase = GetExpiredInventoryUseCase;
        this.getLowStockInventoryUseCase = getLowStockInventoryUseCase;
        this.deleteInventoryUseCase = deleteInventoryUseCase;
        // this.getInventoryStatsUseCase = getInventoryStatsUseCase;
    }
    
    @PostMapping
    public ResponseEntity<InventoryResponse> addInventory(@Valid @RequestBody AddInventoryRequest request) {
        InventoryResponse response = addInventoryUseCase.execute(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<InventoryResponse> updateInventory(@PathVariable Integer id,
                                                           @Valid @RequestBody UpdateInventoryRequest request) {
        request.setInventoryId(id);
        InventoryResponse response = updateInventoryUseCase.execute(request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<InventoryResponse> getInventory(@PathVariable Integer id) {
        InventoryResponse response = getInventoryUseCase.execute(id);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping
    public ResponseEntity<List<InventoryResponse>> getAllInventory() {
        SearchInventoryRequest request = new SearchInventoryRequest();
        List<InventoryResponse> response = searchInventoryUseCase.execute(request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<InventoryResponse>> searchInventory(
            @RequestParam(required = false) String medicineName,
            @RequestParam(required = false) String batchNumber,
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Integer supplierId,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Boolean expired,
            @RequestParam(required = false) Boolean lowStock,
            @RequestParam(required = false) LocalDate expiryDateFrom,
            @RequestParam(required = false) LocalDate expiryDateTo,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "inventoryId") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection) {
        
        SearchInventoryRequest request = new SearchInventoryRequest();
        request.setMedicineName(medicineName);
        request.setBatchNumber(batchNumber);
        request.setCompanyName(companyName);
        if (type != null) {
            request.setType(MedicineType.valueOf(type.toUpperCase()));
        }
        request.setSupplierId(supplierId);
        request.setLocation(location);
        request.setExpired(expired);
        request.setLowStock(lowStock);
        request.setExpiryDateFrom(expiryDateFrom);
        request.setExpiryDateTo(expiryDateTo);
        request.setPage(page);
        request.setSize(size);
        request.setSortBy(sortBy);
        request.setSortDirection(sortDirection);
        
        List<InventoryResponse> response = searchInventoryUseCase.execute(request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/expiring")
    public ResponseEntity<List<InventoryResponse>> getExpiringInventory(
            @RequestParam(defaultValue = "30") Integer days) {
        List<InventoryResponse> response = GetExpiredInventoryUseCase.execute(days);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/low-stock")
    public ResponseEntity<List<InventoryResponse>> getLowStockInventory(
            @RequestParam(defaultValue = "10") Integer threshold) {
        List<InventoryResponse> response = getLowStockInventoryUseCase.execute(threshold);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/medicine/{medicineId}")
    public ResponseEntity<List<InventoryResponse>> getInventoryByMedicine(@PathVariable Integer medicineId) {
        SearchInventoryRequest request = new SearchInventoryRequest();
        request.setMedicineId(medicineId);
        List<InventoryResponse> response = searchInventoryUseCase.execute(request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<InventoryStatsResponse> getInventoryStats() {
        InventoryStatsResponse response = getInventoryStatsUseCase.execute(null);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable Integer id) {
        deleteInventoryUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }
}