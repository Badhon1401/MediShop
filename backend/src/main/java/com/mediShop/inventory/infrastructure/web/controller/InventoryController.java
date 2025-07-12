
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
        System.out.println("----------------------------------InventoryController.addInventory: ----------------------------------- "+request);
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
       InventorySearchRequest request = new InventorySearchRequest();
       List<InventoryResponse> response = searchInventoryUseCase.execute(request);
    return ResponseEntity.ok(response);
    }
    
@GetMapping("/search")
public ResponseEntity<List<InventoryResponse>> searchInventory(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String type,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) String batchNumber) {

    InventorySearchRequest request = new InventorySearchRequest();
    request.setMedicineName(name);
    if (type != null) {
        request.setType(MedicineType.valueOf(type.toUpperCase()));
    }
    request.setBatchNumber(batchNumber);

    List<InventoryResponse> response = searchInventoryUseCase.execute(request);
    return ResponseEntity.ok(response);
}

    @GetMapping("/expired")
    public ResponseEntity<List<InventoryResponse>> getExpiredInventory(
            @RequestParam(defaultValue = "30") Integer days) {
                
        List<InventoryResponse> response = GetExpiredInventoryUseCase.execute(null);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/low-stock")
        public ResponseEntity<List<InventoryResponse>> getLowStockInventory(
            @RequestParam(defaultValue = "10") Integer threshold) {
        List<InventoryResponse> response = getLowStockInventoryUseCase.execute(threshold);
    return ResponseEntity.ok(response);
}

    
    // @GetMapping("/medicine/{medicineId}")
    // public ResponseEntity<List<InventoryResponse>> getInventoryByMedicine(@PathVariable Integer medicineId) {
    //     InventorySearchRequest request = new InventorySearchRequest();
    //     request.setMedicineId(medicineId);
    //     List<InventoryResponse> response = searchInventoryUseCase.execute(request);
    //     return ResponseEntity.ok(response);
    // }
    
    // @GetMapping("/stats")
    // public ResponseEntity<InventoryStatsResponse> getInventoryStats() {
    //     InventoryStatsResponse response = getInventoryStatsUseCase.execute(null);
    //     return ResponseEntity.ok(response);
    // }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable Integer id) {
        deleteInventoryUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }
}