package com.mediShop.inventory.infrastructure.persistence.repository;

import com.mediShop.inventory.infrastructure.persistence.entity.InventoryJpaEntity;
import com.mediShop.inventory.domain.valueobject.MedicineType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface InventoryJpaRepository extends JpaRepository<InventoryJpaEntity, Integer> {
    
    // Search and filter methods
    List<InventoryJpaEntity> findByMedicineNameContainingIgnoreCase(String medicineName);
    List<InventoryJpaEntity> findByBatchNumber(String batchNumber);
    List<InventoryJpaEntity> findByCompanyNameContainingIgnoreCase(String companyName);
    List<InventoryJpaEntity> findByType(MedicineType type);
    List<InventoryJpaEntity> findByLocation(String location);
    
    // Stock-related queries
    List<InventoryJpaEntity> findByAvailableQuantityLessThanEqual(Integer threshold);
    List<InventoryJpaEntity> findByAvailableQuantityGreaterThan(Integer quantity);
    List<InventoryJpaEntity> findByTotalQuantityBetween(Integer minQuantity, Integer maxQuantity);
    
    // Expiry-related queries
    List<InventoryJpaEntity> findByExpiryDateBefore(LocalDate date);
    List<InventoryJpaEntity> findByExpiryDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT i FROM InventoryJpaEntity i WHERE i.expiryDate < CURRENT_DATE")
    List<InventoryJpaEntity> findExpiredItems();
    
    @Query("SELECT i FROM InventoryJpaEntity i WHERE i.expiryDate <= :expiryDate")
    List<InventoryJpaEntity> findExpiringItems(@Param("expiryDate") LocalDate expiryDate);
    
    // Purchase-related queries
    List<InventoryJpaEntity> findByPurchaseDateBetween(LocalDate startDate, LocalDate endDate);
    List<InventoryJpaEntity> findByPurchasePriceBetween(Double minPrice, Double maxPrice);
    List<InventoryJpaEntity> findByUnitPriceBetween(Double minPrice, Double maxPrice);
    
    // Complex search query
    @Query("SELECT i FROM InventoryJpaEntity i WHERE " +
           "(:medicineName IS NULL OR UPPER(i.medicineName) LIKE UPPER(CONCAT('%', :medicineName, '%'))) AND " +
           "(:batchNumber IS NULL OR i.batchNumber = :batchNumber) AND " +
           "(:companyName IS NULL OR UPPER(i.companyName) LIKE UPPER(CONCAT('%', :companyName, '%'))) AND " +
           "(:type IS NULL OR i.type = :type) AND " +
           "(:location IS NULL OR i.location = :location)")
    List<InventoryJpaEntity> searchInventory(@Param("medicineName") String medicineName,
                                            @Param("batchNumber") String batchNumber,
                                            @Param("companyName") String companyName,
                                            @Param("type") MedicineType type,
                                            @Param("location") String location);
    
    // Stock value calculations
    @Query("SELECT SUM(i.availableQuantity * i.unitPrice) FROM InventoryJpaEntity i")
    Double calculateTotalStockValue();
    
    @Query("SELECT SUM(i.availableQuantity * i.unitPrice) FROM InventoryJpaEntity i WHERE i.location = :location")
    Double calculateStockValueByLocation(@Param("location") String location);
    
    // Low stock items
    @Query("SELECT i FROM InventoryJpaEntity i WHERE i.availableQuantity <= :threshold")
    List<InventoryJpaEntity> findLowStockItems(@Param("threshold") Integer threshold);
    
    // Most sold items (based on difference between total and available quantity)
    @Query("SELECT i FROM InventoryJpaEntity i ORDER BY (i.totalQuantity - i.availableQuantity) DESC")
    List<InventoryJpaEntity> findMostSoldItems();
}