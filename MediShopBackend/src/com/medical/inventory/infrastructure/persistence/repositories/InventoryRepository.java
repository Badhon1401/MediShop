
package com.medical.inventory.infrastructure.persistence.repositories;

import com.medical.inventory.domain.entities.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    List<Inventory> findByMedicineId(Long medicineId);

    List<Inventory> findByBatchNumber(String batchNumber);

    List<Inventory> findByLocation(String location);

    @Query("SELECT i FROM Inventory i WHERE i.quantityAvailable <= i.minimumThreshold")
    List<Inventory> findLowStockItems();

    @Query("SELECT i FROM Inventory i WHERE i.expiryDate <= :date")
    List<Inventory> findByExpiryDateBefore(@Param("date") LocalDate date);

    @Query("SELECT i FROM Inventory i WHERE i.expiryDate BETWEEN :startDate AND :endDate")
    List<Inventory> findExpiringBetween(@Param("startDate") LocalDate startDate,
                                        @Param("endDate") LocalDate endDate);

    @Query("SELECT i FROM Inventory i WHERE i.quantityAvailable > 0")
    List<Inventory> findAvailableStock();
}