// File: src/main/java/com/mediShop/sales/infrastructure/persistence/SalesJpaRepository.java
package com.mediShop.sales.infrastructure.persistence;

import com.mediShop.sales.domain.entity.Sales;
import com.mediShop.sales.domain.repository.SalesRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SalesJpaRepository extends JpaRepository<Sales, Integer>, SalesRepository {
    
    @Override
    @Query("SELECT s FROM Sales s WHERE s.salesId = :salesId ORDER BY s.salesDate DESC")
    List<Sales> findBySalesId(@Param("salesId") Integer salesId);
    
    @Override
    @Query("SELECT s FROM Sales s WHERE s.customerPhoneNumber = :customerPhoneNumber ORDER BY s.salesDate DESC")
    List<Sales> findByCustomerPhoneNumber(@Param("customerPhoneNumber") String customerPhoneNumber);
    
    @Override
    @Query("SELECT s FROM Sales s WHERE s.salesDate = :salesDate ORDER BY s.salesId DESC")
    List<Sales> findBySalesDate(@Param("salesDate") LocalDate salesDate);
    
    @Override
    @Query("SELECT s FROM Sales s WHERE s.salesDate BETWEEN :startDate AND :endDate ORDER BY s.salesDate DESC, s.salesId DESC")
    List<Sales> findBySalesDateBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Override
    @Query("SELECT s FROM Sales s WHERE s.medicineName = :medicineName ORDER BY s.salesDate DESC")
    List<Sales> findByMedicineName(@Param("medicineName") String medicineName);
    
    @Override
    @Query("SELECT COALESCE(MAX(s.salesId), 0) FROM Sales s")
    Optional<Integer> findMaxSalesId();
    
    @Override
    @Query("SELECT COALESCE(SUM(s.totalPricePerCustomerTransaction), 0.0) FROM Sales s WHERE s.salesDate = :date")
    Optional<Double> getTotalSalesAmountByDate(@Param("date") LocalDate date);
    
    @Override
    @Query("SELECT COALESCE(SUM(s.totalPricePerCustomerTransaction), 0.0) FROM Sales s WHERE s.salesDate BETWEEN :startDate AND :endDate")
    Optional<Double> getTotalSalesAmountBetweenDates(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Override
    @Query("SELECT s.medicineName, SUM(s.perMedicineTotalQuantity) FROM Sales s WHERE s.salesDate BETWEEN :startDate AND :endDate GROUP BY s.medicineName ORDER BY SUM(s.perMedicineTotalQuantity) DESC")
    List<Object[]> getTopSellingMedicines(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}