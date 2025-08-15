// SupplierJpaRepository.java
package com.mediShop.supplier.infrastructure.persistence.repository;

import com.mediShop.supplier.domain.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SupplierJpaRepository extends JpaRepository<Supplier, Integer> {
    
    Optional<Supplier> findByEmail(String email);
    
    Optional<Supplier> findByCompanyName(String companyName);
    
    @Query("SELECT s FROM Supplier s WHERE s.status = true ORDER BY s.companyName ASC")
    List<Supplier> findAllActive();
    
    @Query("SELECT s FROM Supplier s WHERE s.status = false ORDER BY s.companyName ASC")
    List<Supplier> findAllInactive();
    
    List<Supplier> findByCompanyNameContainingIgnoreCase(String companyName);
    
    List<Supplier> findByEmailContainingIgnoreCase(String email);
    
    List<Supplier> findByPhoneContaining(String phone);
    
    boolean existsByEmail(String email);
    
    boolean existsByCompanyName(String companyName);
    
    boolean existsByPhone(String phone);
    
    @Query("SELECT COUNT(s) FROM Supplier s WHERE s.status = :status")
    long countByStatus(@Param("status") Boolean status);
    
    @Query("SELECT s FROM Supplier s ORDER BY s.companyName ASC")
    List<Supplier> findAll();
}