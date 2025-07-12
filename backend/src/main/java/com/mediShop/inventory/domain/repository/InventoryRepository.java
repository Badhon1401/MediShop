package com.mediShop.inventory.domain.repository;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.medicine.domain.valueobject.MedicineType;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface InventoryRepository {
    Inventory save(Inventory inventory);
    Optional<Inventory> findById(Integer inventoryId);
    List<Inventory> findAll();
    List<Inventory> findByMedicineId(Integer medicineId);
    List<Inventory> findByBatchNumber(String batchNumber);
    List<Inventory> findByCompanyName(String companyName);
    List<Inventory> findByLocation(String location);
    List<Inventory> findByType(MedicineType type);
    List<Inventory> findBySupplierId(Integer supplierId);
    List<Inventory> findExpiringBefore(LocalDate date);
    List<Inventory> findExpiredInventory();
    List<Inventory> findLowStockItems(Integer threshold);
    List<Inventory> findOutOfStockItems();
    List<Inventory> findByBuyingDateBetween(LocalDate startDate, LocalDate endDate);
    List<Inventory> findByUnitPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    List<Inventory> findByAvailableQuantityGreaterThan(Integer quantity);
    boolean existsByMedicineIdAndBatchNumber(Integer medicineId, String batchNumber);
    void deleteById(Integer inventoryId);
    BigDecimal getTotalInventoryValue();
    Integer getTotalAvailableQuantity();
    List<Inventory> findLowStockInventory(Integer threshold);
    List<Inventory> searchInventory(String medicineName, String batchNumber, String companyName, MedicineType type);
    
    
}

