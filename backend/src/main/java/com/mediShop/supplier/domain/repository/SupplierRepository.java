// SupplierRepository.java - Domain Repository Interface
package com.mediShop.supplier.domain.repository;

import com.mediShop.supplier.domain.entity.Supplier;
import java.util.List;
import java.util.Optional;

public interface SupplierRepository {
    
    Supplier save(Supplier supplier);
    
    Optional<Supplier> findById(Integer id);
    
    Optional<Supplier> findByEmail(String email);
    
    Optional<Supplier> findByCompanyName(String companyName);
    
    List<Supplier> findAll();
    
    List<Supplier> findAllActive();
    
    List<Supplier> findAllInactive();
    
    List<Supplier> findByCompanyNameContainingIgnoreCase(String companyName);
    
    List<Supplier> findByEmailContainingIgnoreCase(String email);
    
    List<Supplier> findByPhoneContaining(String phone);
    
    boolean existsByEmail(String email);
    
    boolean existsByCompanyName(String companyName);
    
    boolean existsByPhone(String phone);
    
    void deleteById(Integer id);
    
    long count();
    
    long countByStatus(Boolean status);
}