package com.mediShop.inventory.domain.repository;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.valueobject.MedicineType;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface InventoryRepository {
    Inventory save(Inventory inventory);
    Optional<Inventory> findById(Integer inventoryId);
    List<Inventory> findAll();
    void deleteById(Integer inventoryId);
    boolean existsById(Integer inventoryId);
    
    // Search and filter methods
    List<Inventory> findByMedicineNameContainingIgnoreCase(String medicineName);
    List<Inventory> findByBatchNumber(String batchNumber);
    List<Inventory> findByCompanyNameContainingIgnoreCase(String companyName);
    List<Inventory> findByType(MedicineType type);
    List<Inventory> findByLocation(String location);
    
    // Stock-related queries
    List<Inventory> findByAvailableQuantityLessThanEqual(Integer threshold);
    List<Inventory> findByAvailableQuantityGreaterThan(Integer quantity);
    List<Inventory> findByTotalQuantityBetween(Integer minQuantity, Integer maxQuantity);
    
    // Expiry-related queries
    List<Inventory> findByExpiryDateBefore(LocalDate date);
    List<Inventory> findByExpiryDateBetween(LocalDate startDate, LocalDate endDate);
    List<Inventory> findExpiredItems();
    List<Inventory> findExpiringItems(Integer days);
    
    // Purchase-related queries
    List<Inventory> findByPurchaseDateBetween(LocalDate startDate, LocalDate endDate);
    List<Inventory> findByPurchasePriceBetween(Double minPrice, Double maxPrice);
    List<Inventory> findByUnitPriceBetween(Double minPrice, Double maxPrice);
    
    // Combined search
    List<Inventory> searchInventory(String medicineName, String batchNumber, 
                                  String companyName, MedicineType type, 
                                  String location, Boolean isExpired, 
                                  Boolean isLowStock, Integer stockThreshold);
}