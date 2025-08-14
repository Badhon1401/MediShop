
// InventoryJpaRepository.java
package com.mediShop.inventory.infrastructure.persistence.repository;

import com.mediShop.inventory.infrastructure.persistence.entity.InventoryJpaEntity;
import com.mediShop.medicine.domain.valueobject.MedicineType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface InventoryJpaRepository extends JpaRepository<InventoryJpaEntity, Integer> {
    
    List<InventoryJpaEntity> findByMedicineId(Integer medicineId);
    
    List<InventoryJpaEntity> findByBatchNumber(String batchNumber);
    
    List<InventoryJpaEntity> findByCompanyNameContainingIgnoreCase(String companyName);
    
    List<InventoryJpaEntity> findByLocationContainingIgnoreCase(String location);
    
    List<InventoryJpaEntity> findByType(MedicineType type);
    
    List<InventoryJpaEntity> findBySupplierId(Integer supplierId);
    
    @Query("SELECT i FROM InventoryJpaEntity i WHERE i.expiryDate <= :date")
    List<InventoryJpaEntity> findExpiringBefore(@Param("date") LocalDate date);
    
    @Query("SELECT i FROM InventoryJpaEntity i WHERE i.expiryDate < CURRENT_DATE")
    List<InventoryJpaEntity> findExpiredInventory();
    
    @Query("SELECT i FROM InventoryJpaEntity i WHERE i.availableQuantity <= :threshold")
    List<InventoryJpaEntity> findLowStockItems(@Param("threshold") Integer threshold);
    
    @Query("SELECT i FROM InventoryJpaEntity i WHERE i.availableQuantity = 0")
    List<InventoryJpaEntity> findOutOfStockItems();
    
    List<InventoryJpaEntity> findByBuyingDateBetween(LocalDate startDate, LocalDate endDate);
    
    List<InventoryJpaEntity> findByUnitPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    List<InventoryJpaEntity> findByAvailableQuantityGreaterThan(Integer quantity);
    
    boolean existsByMedicineIdAndBatchNumber(Integer medicineId, String batchNumber);
    
    @Query("SELECT SUM(i.unitPrice * i.availableQuantity) FROM InventoryJpaEntity i")
    BigDecimal getTotalInventoryValue();
    
    @Query("SELECT SUM(i.availableQuantity) FROM InventoryJpaEntity i")
    Integer getTotalAvailableQuantity();
    
    @Query("SELECT i FROM InventoryJpaEntity i WHERE i.availableQuantity <= 10")
    List<InventoryJpaEntity> findLowStockInventory();
    
    @Query("SELECT i FROM InventoryJpaEntity i " +
           "JOIN MedicineJpaEntity m ON i.medicineId = m.medicineId " +
           "WHERE (:medicineName IS NULL OR m.name LIKE %:medicineName%) " +
           "AND (:batchNumber IS NULL OR i.batchNumber LIKE %:batchNumber%) " +
           "AND (:companyName IS NULL OR i.companyName LIKE %:companyName%) " +
           "AND (:type IS NULL OR i.type = :type) " +
           "AND (:supplierId IS NULL OR i.supplierId = :supplierId) " +
           "AND (:location IS NULL OR i.location LIKE %:location%) " +
           "AND (:expired IS NULL OR (:expired = true AND i.expiryDate < CURRENT_DATE) OR (:expired = false AND i.expiryDate >= CURRENT_DATE)) " +
           "AND (:lowStock IS NULL OR (:lowStock = true AND i.availableQuantity <= 10) OR (:lowStock = false AND i.availableQuantity > 10)) " +
           "AND (:expiryDateFrom IS NULL OR i.expiryDate >= :expiryDateFrom) " +
           "AND (:expiryDateTo IS NULL OR i.expiryDate <= :expiryDateTo)")
    Page<InventoryJpaEntity> searchInventory(
            @Param("medicineName") String medicineName,
            @Param("batchNumber") String batchNumber,
            @Param("companyName") String companyName,
            @Param("type") MedicineType type,
            @Param("supplierId") Integer supplierId,
            @Param("location") String location,
            @Param("expired") Boolean expired,
            @Param("lowStock") Boolean lowStock,
            @Param("expiryDateFrom") LocalDate expiryDateFrom,
            @Param("expiryDateTo") LocalDate expiryDateTo,
            Pageable pageable);
}
