
package com.mediShop.sales.infrastructure.persistence;


import com.mediShop.sales.domain.entity.Sales;
import com.mediShop.sales.domain.repository.SalesRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.time.LocalDate;
import java.util.List;


@Repository
public interface SalesJpaRepository extends JpaRepository<Sales, Integer>, SalesRepository {
  
   @Override
   @Query("SELECT s FROM Sales s WHERE s.salesId = :salesId")
   List<Sales> findBySalesId(@Param("salesId") Integer salesId);
  
   @Override
   @Query("SELECT s FROM Sales s WHERE s.customerPhoneNumber = :phoneNumber")
   List<Sales> findByCustomerPhoneNumber(@Param("phoneNumber") String customerPhoneNumber);
  
   @Override
   @Query("SELECT s FROM Sales s WHERE s.medicineName LIKE %:medicineName%")
   List<Sales> findByMedicineName(@Param("medicineName") String medicineName);
  
   @Override
   @Query("SELECT s FROM Sales s WHERE s.salesDate BETWEEN :startDate AND :endDate")
   List<Sales> findBySalesDateBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
  
   @Override
   @Query("SELECT s FROM Sales s WHERE s.salesDate = :date")
   List<Sales> findBySalesDate(@Param("date") LocalDate date);
  
   @Override
   @Query("SELECT DISTINCT s.salesId FROM Sales s ORDER BY s.salesId")
   List<Integer> findAllUniqueSalesIds();
  
   @Override
   @Query("SELECT COALESCE(SUM(s.totalPricePerCustomerTransaction), 0.0) FROM Sales s WHERE s.salesDate = :date")
   Double getTotalSalesAmountByDate(@Param("date") LocalDate date);
  
   @Override
   @Query("SELECT COALESCE(SUM(s.totalPricePerCustomerTransaction), 0.0) FROM Sales s WHERE s.salesDate BETWEEN :startDate AND :endDate")
   Double getTotalSalesAmountBetweenDates(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
  
   @Override
   @Query("SELECT s.medicineName, SUM(s.perMedicineTotalQuantity) FROM Sales s GROUP BY s.medicineName ORDER BY SUM(s.perMedicineTotalQuantity) DESC")
   List<Object[]> getMedicineWiseSalesQuantity();
}