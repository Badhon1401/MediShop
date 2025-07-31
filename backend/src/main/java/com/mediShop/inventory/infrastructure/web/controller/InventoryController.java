// InventoryController.java
package com.mediShop.inventory.infrastructure.web.controller;

import com.mediShop.inventory.application.dto.AddInventoryRequest;
import com.mediShop.inventory.application.dto.InventoryResponse;
import com.mediShop.inventory.application.dto.InventorySearchRequest;
import com.mediShop.inventory.application.dto.UpdateInventoryRequest;
import com.mediShop.inventory.application.dto.UpdateStockRequest;
import com.mediShop.inventory.application.usecase.*;
import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.valueobject.MedicineType;
import com.mediShop.inventory.infrastructure.web.exception.InventoryNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inventory")
//@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = {"*","http://localhost:3000"})
@Validated
@CrossOrigin(origins = "*", maxAge = 3600)
public class InventoryController {

    private final AddInventoryUseCase addInventoryUseCase;
    private final GetInventoryUseCase getInventoryUseCase;
    private final UpdateInventoryUseCase updateInventoryUseCase;
    private final DeleteInventoryUseCase deleteInventoryUseCase;
    private final SearchInventoryUseCase searchInventoryUseCase;
    private final GetLowStockInventoryUseCase getLowStockInventoryUseCase;
    private final GetExpiredInventoryUseCase getExpiredInventoryUseCase;
    private final UpdateStockUseCase updateStockUseCase;

    @Autowired
    public InventoryController(
            AddInventoryUseCase addInventoryUseCase,
            GetInventoryUseCase getInventoryUseCase,
            UpdateInventoryUseCase updateInventoryUseCase,
            DeleteInventoryUseCase deleteInventoryUseCase,
            SearchInventoryUseCase searchInventoryUseCase,
            GetLowStockInventoryUseCase getLowStockInventoryUseCase,
            GetExpiredInventoryUseCase getExpiredInventoryUseCase,
            UpdateStockUseCase updateStockUseCase) {
        this.addInventoryUseCase = addInventoryUseCase;
        this.getInventoryUseCase = getInventoryUseCase;
        this.updateInventoryUseCase = updateInventoryUseCase;
        this.deleteInventoryUseCase = deleteInventoryUseCase;
        this.searchInventoryUseCase = searchInventoryUseCase;
        this.getLowStockInventoryUseCase = getLowStockInventoryUseCase;
        this.getExpiredInventoryUseCase = getExpiredInventoryUseCase;
        this.updateStockUseCase = updateStockUseCase;
    }

    // Basic CRUD Operations
    @PostMapping
    public ResponseEntity<InventoryResponse> addInventory(@Valid @RequestBody AddInventoryRequest request) {
        InventoryResponse savedInventory = addInventoryUseCase.execute(request);
        return new ResponseEntity<>(savedInventory, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventoryById(@PathVariable("id") Integer inventoryId) {
        Optional<Inventory> inventory = getInventoryUseCase.getInventoryById(inventoryId);
        return inventory.map(inv -> ResponseEntity.ok(inv))
                .orElseThrow(() -> new InventoryNotFoundException("Inventory not found with ID: " + inventoryId));
    }

    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventory() {
        List<Inventory> inventoryList = getInventoryUseCase.getAllInventory();
        return ResponseEntity.ok(inventoryList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateInventory(
            @PathVariable("id") Integer inventoryId,
            @Valid @RequestBody UpdateInventoryRequest updateRequest) {
        updateRequest.setInventoryId(inventoryId);
        Optional<Inventory> updatedInventory = updateInventoryUseCase.updateInventory(updateRequest);
        return updatedInventory.map(inv -> ResponseEntity.ok(inv))
                .orElseThrow(() -> new InventoryNotFoundException("Inventory not found with ID: " + inventoryId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable("id") Integer inventoryId) {
        deleteInventoryUseCase.execute(inventoryId);
        return ResponseEntity.noContent().build();
    }

    // Search Operations
    @PostMapping("/search")
    public ResponseEntity<List<Inventory>> searchInventory(@RequestBody InventorySearchRequest searchRequest) {
        List<Inventory> results = searchInventoryUseCase.searchInventory(searchRequest);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/search/medicine")
    public ResponseEntity<List<Inventory>> searchByMedicineName(@RequestParam String medicineName) {
        List<Inventory> results = searchInventoryUseCase.findByMedicineName(medicineName);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/search/batch")
    public ResponseEntity<List<Inventory>> searchByBatchNumber(@RequestParam String batchNumber) {
        List<Inventory> results = searchInventoryUseCase.findByBatchNumber(batchNumber);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/search/company")
    public ResponseEntity<List<Inventory>> searchByCompanyName(@RequestParam String companyName) {
        List<Inventory> results = searchInventoryUseCase.findByCompanyName(companyName);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/search/type")
    public ResponseEntity<List<Inventory>> searchByMedicineType(@RequestParam MedicineType type) {
        List<Inventory> results = searchInventoryUseCase.findByMedicineType(type);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/search/location")
    public ResponseEntity<List<Inventory>> searchByLocation(@RequestParam String location) {
        List<Inventory> results = searchInventoryUseCase.findByLocation(location);
        return ResponseEntity.ok(results);
    }

    // Stock Management Operations
    @PutMapping("/stock")
    public ResponseEntity<Inventory> updateStock(@Valid @RequestBody UpdateStockRequest updateRequest) {
        Optional<Inventory> updatedInventory = updateStockUseCase.updateAvailableStock(updateRequest);
        return updatedInventory.map(inv -> ResponseEntity.ok(inv))
                .orElseThrow(() -> new InventoryNotFoundException("Inventory not found with ID: " + updateRequest.getInventoryId()));
    }

    @PutMapping("/stock/{id}/reduce")
    public ResponseEntity<Inventory> reduceStock(
            @PathVariable("id") Integer inventoryId,
            @RequestParam @NotNull @Min(1) Integer quantity) {
        Optional<Inventory> updatedInventory = updateStockUseCase.reduceStock(inventoryId, quantity);
        return updatedInventory.map(inv -> ResponseEntity.ok(inv))
                .orElseThrow(() -> new InventoryNotFoundException("Inventory not found with ID: " + inventoryId));
    }

    @PutMapping("/stock/{id}/increase")
    public ResponseEntity<Inventory> increaseStock(
            @PathVariable("id") Integer inventoryId,
            @RequestParam @NotNull @Min(1) Integer quantity) {
        Optional<Inventory> updatedInventory = updateStockUseCase.increaseStock(inventoryId, quantity);
        return updatedInventory.map(inv -> ResponseEntity.ok(inv))
                .orElseThrow(() -> new InventoryNotFoundException("Inventory not found with ID: " + inventoryId));
    }

    @GetMapping("/stock/{id}/available")
    public ResponseEntity<Boolean> checkStockAvailability(
            @PathVariable("id") Integer inventoryId,
            @RequestParam @NotNull @Min(1) Integer requiredQuantity) {
        boolean isAvailable = updateStockUseCase.hasAvailableStock(inventoryId, requiredQuantity);
        return ResponseEntity.ok(isAvailable);
    }

    // Low Stock Operations
    @GetMapping("/low-stock")
    public ResponseEntity<List<Inventory>> getLowStockItems(@RequestParam @NotNull @Min(0) Integer threshold) {
        List<Inventory> lowStockItems = getLowStockInventoryUseCase.getLowStockItems(threshold);
        return ResponseEntity.ok(lowStockItems);
    }

    @GetMapping("/stock/above")
    public ResponseEntity<List<Inventory>> getItemsWithStockAbove(@RequestParam @NotNull @Min(0) Integer quantity) {
        List<Inventory> results = getLowStockInventoryUseCase.getItemsWithStockGreaterThan(quantity);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/stock/range")
    public ResponseEntity<List<Inventory>> getItemsByStockRange(
            @RequestParam @NotNull @Min(0) Integer minQuantity,
            @RequestParam @NotNull @Min(0) Integer maxQuantity) {
        List<Inventory> results = getLowStockInventoryUseCase.getItemsByStockRange(minQuantity, maxQuantity);
        return ResponseEntity.ok(results);
    }

    // Expiry Operations
    @GetMapping("/expired")
    public ResponseEntity<List<InventoryResponse>> getExpiredItems(@RequestParam(required = false) Integer days) {
        List<InventoryResponse> expiredItems = getExpiredInventoryUseCase.execute(days);
        return ResponseEntity.ok(expiredItems);
    }

    @GetMapping("/expiring")
    public ResponseEntity<List<InventoryResponse>> getExpiringItems(@RequestParam @NotNull @Min(1) Integer days) {
        List<InventoryResponse> expiringItems = getExpiredInventoryUseCase.execute(days);
        return ResponseEntity.ok(expiringItems);
    }

    // Remove this method since GetExpiredInventoryUseCase doesn't have getItemsExpiringBefore method
    // Based on your implementation, expiry filtering should use the execute method with days parameter
    @GetMapping("/expiry/range")
    public ResponseEntity<List<Inventory>> getItemsByExpiryRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<Inventory> results = searchInventoryUseCase.findByExpiryDateRange(startDate, endDate);
        return ResponseEntity.ok(results);
    }

    // Purchase Date and Price Operations
    @GetMapping("/purchase/date-range")
    public ResponseEntity<List<Inventory>> getItemsByPurchaseDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<Inventory> results = searchInventoryUseCase.findByPurchaseDateRange(startDate, endDate);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/purchase/price-range")
    public ResponseEntity<List<Inventory>> getItemsByPurchasePriceRange(
            @RequestParam @NotNull @Min(0) Double minPrice,
            @RequestParam @NotNull @Min(0) Double maxPrice) {
        List<Inventory> results = searchInventoryUseCase.findByPurchasePriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/unit/price-range")
    public ResponseEntity<List<Inventory>> getItemsByUnitPriceRange(
            @RequestParam @NotNull @Min(0) Double minPrice,
            @RequestParam @NotNull @Min(0) Double maxPrice) {
        List<Inventory> results = searchInventoryUseCase.findByUnitPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(results);
    }

    // Health Check
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Inventory service is running");
    }
}