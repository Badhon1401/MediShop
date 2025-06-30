
// Infrastructure Layer - Repositories
package com.medical.inventory.infrastructure.persistence.repositories;

import com.medical.inventory.domain.entities.Medicine;
import com.medical.inventory.domain.enums.MedicineType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    List<Medicine> findByNameContainingIgnoreCase(String name);

    List<Medicine> findByCategory(String category);

    List<Medicine> findByType(MedicineType type);

    List<Medicine> findByBatchNumber(String batchNumber);

    List<Medicine> findByExpiryDateBefore(LocalDate date);

    List<Medicine> findByExpiryDateBetween(LocalDate startDate, LocalDate endDate);

    List<Medicine> findBySupplierId(Long supplierId);

    @Query("SELECT m FROM Medicine m WHERE m.name LIKE %:searchTerm% OR m.category LIKE %:searchTerm%")
    List<Medicine> searchMedicines(@Param("searchTerm") String searchTerm);
}
