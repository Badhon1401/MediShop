
package com.mediShop.sales.domain.repository;


import com.mediShop.sales.domain.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.time.LocalDate;
import java.util.List;


@Repository
public interface SalesRepository extends JpaRepository<Sales, Integer> {
  
   List<Sales> findBySalesId(Integer salesId);
  
   List<Sales> findByCustomerPhoneNumber(String customerPhoneNumber);
  
   List<Sales> findByMedicineName(String medicineName);
  
   List<Sales> findBySalesDateBetween(LocalDate startDate, LocalDate endDate);
  
   @Query("SELECT s FROM Sales s WHERE s.salesDate = :date")
   List<Sales> findBySalesDate(@Param("date") LocalDate date);
  
   @Query("SELECT DISTINCT s.salesId FROM Sales s")
   List<Integer> findAllUniqueSalesIds();
  
   @Query("SELECT SUM(s.totalPricePerCustomerTransaction) FROM Sales s WHERE s.salesDate = :date")
   Double getTotalSalesAmountByDate(@Param("date") LocalDate date);
  
   @Query("SELECT SUM(s.totalPricePerCustomerTransaction) FROM Sales s WHERE s.salesDate BETWEEN :startDate AND :endDate")
   Double getTotalSalesAmountBetweenDates(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
  
   @Query("SELECT s.medicineName, SUM(s.perMedicineTotalQuantity) FROM Sales s GROUP BY s.medicineName")
   List<Object[]> getMedicineWiseSalesQuantity();
}