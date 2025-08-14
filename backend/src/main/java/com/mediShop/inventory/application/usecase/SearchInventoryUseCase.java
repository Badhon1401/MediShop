// SearchInventoryUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.application.dto.InventorySearchRequest;
import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import com.mediShop.inventory.domain.valueobject.MedicineType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SearchInventoryUseCase {
    
    private final InventoryRepository inventoryRepository;
    
    @Autowired
    public SearchInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    
    public List<Inventory> searchInventory(InventorySearchRequest searchRequest) {
        return inventoryRepository.searchInventory(
            searchRequest.getMedicineName(),
            searchRequest.getBatchNumber(),
            searchRequest.getCompanyName(),
            searchRequest.getType(),
            searchRequest.getLocation(),
            searchRequest.getIsExpired(),
            searchRequest.getIsLowStock(),
            searchRequest.getStockThreshold()
        );
    }
    
    public List<Inventory> findByMedicineName(String medicineName) {
        return inventoryRepository.findByMedicineNameContainingIgnoreCase(medicineName);
    }
    
    public List<Inventory> findByBatchNumber(String batchNumber) {
        return inventoryRepository.findByBatchNumber(batchNumber);
    }
    
    public List<Inventory> findByCompanyName(String companyName) {
        return inventoryRepository.findByCompanyNameContainingIgnoreCase(companyName);
    }
    
    public List<Inventory> findByMedicineType(MedicineType type) {
        return inventoryRepository.findByType(type);
    }
    
    public List<Inventory> findByLocation(String location) {
        return inventoryRepository.findByLocation(location);
    }
    
    public List<Inventory> findByExpiryDateRange(LocalDate startDate, LocalDate endDate) {
        return inventoryRepository.findByExpiryDateBetween(startDate, endDate);
    }
    
    public List<Inventory> findByPurchaseDateRange(LocalDate startDate, LocalDate endDate) {
        return inventoryRepository.findByPurchaseDateBetween(startDate, endDate);
    }
    
    public List<Inventory> findByPurchasePriceRange(Double minPrice, Double maxPrice) {
        return inventoryRepository.findByPurchasePriceBetween(minPrice, maxPrice);
    }
    
    public List<Inventory> findByUnitPriceRange(Double minPrice, Double maxPrice) {
        return inventoryRepository.findByUnitPriceBetween(minPrice, maxPrice);
    }
    
    public List<Inventory> findExpiringItems(Integer days) {
        return inventoryRepository.findExpiringItems(days);
    }
}