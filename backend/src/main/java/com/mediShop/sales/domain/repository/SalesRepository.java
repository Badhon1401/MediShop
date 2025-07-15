// File: src/main/java/com/mediShop/sales/domain/repository/SalesRepository.java
package com.mediShop.sales.domain.repository;

import com.mediShop.sales.domain.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SalesRepository extends JpaRepository<Sales, Integer> {
    
    List<Sales> findBySalesId(Integer salesId);
    
    List<Sales> findByCustomerPhoneNumber(String customerPhoneNumber);
    
    List<Sales> findBySalesDate(LocalDate salesDate);
    
    List<Sales> findBySalesDateBetween(LocalDate startDate, LocalDate endDate);
    
    List<Sales> findByMedicineName(String medicineName);
    
    @Query("SELECT MAX(s.salesId) FROM Sales s")
    Optional<Integer> findMaxSalesId();
    
    @Query("SELECT SUM(s.totalPricePerCustomerTransaction) FROM Sales s WHERE s.salesDate = :date")
    Optional<Double> getTotalSalesAmountByDate(@Param("date") LocalDate date);
    
    @Query("SELECT SUM(s.totalPricePerCustomerTransaction) FROM Sales s WHERE s.salesDate BETWEEN :startDate AND :endDate")
    Optional<Double> getTotalSalesAmountBetweenDates(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT s.medicineName, SUM(s.perMedicineTotalQuantity) FROM Sales s WHERE s.salesDate BETWEEN :startDate AND :endDate GROUP BY s.medicineName ORDER BY SUM(s.perMedicineTotalQuantity) DESC")
    List<Object[]> getTopSellingMedicines(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}