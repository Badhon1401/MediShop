package com.mediShop.customer.infrastructure.persistence.repository;

import com.mediShop.customer.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerJpaRepository extends JpaRepository<Customer, Integer> {
    
    Optional<Customer> findByContactNumber(String contactNumber);
    
    List<Customer> findByName(String name);
    
    List<Customer> findByNameContainingIgnoreCase(String name);
    
    List<Customer> findByRegistrationDateBetween(LocalDate startDate, LocalDate endDate);
    
    List<Customer> findByRegistrationDate(LocalDate registrationDate);
    
    boolean existsByContactNumber(String contactNumber);
    
    @Query("SELECT c FROM Customer c WHERE c.registrationDate > :date")
    List<Customer> findCustomersRegisteredAfter(@Param("date") LocalDate date);
    
    @Query("SELECT c FROM Customer c WHERE c.contactNumber IS NOT NULL AND c.contactNumber != ''")
    List<Customer> findCustomersWithContactNumber();
    
    @Query("SELECT COUNT(c) FROM Customer c WHERE c.registrationDate = :date")
    long countByRegistrationDate(@Param("date") LocalDate date);
    
    @Query("SELECT COUNT(c) FROM Customer c WHERE c.registrationDate BETWEEN :startDate AND :endDate")
    long countByRegistrationDateBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}