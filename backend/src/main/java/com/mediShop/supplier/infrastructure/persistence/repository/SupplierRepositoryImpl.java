
// SupplierRepositoryImpl.java
package com.mediShop.supplier.infrastructure.persistence.repository;

import com.mediShop.supplier.domain.entity.Supplier;
import com.mediShop.supplier.domain.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class SupplierRepositoryImpl implements SupplierRepository {
    
    private final SupplierJpaRepository supplierJpaRepository;
    
    @Autowired
    public SupplierRepositoryImpl(SupplierJpaRepository supplierJpaRepository) {
        this.supplierJpaRepository = supplierJpaRepository;
    }
    
    @Override
    public Supplier save(Supplier supplier) {
        return supplierJpaRepository.save(supplier);
    }
    
    @Override
    public Optional<Supplier> findById(Integer id) {
        return supplierJpaRepository.findById(id);
    }
    
    @Override
    public Optional<Supplier> findByEmail(String email) {
        return supplierJpaRepository.findByEmail(email);
    }
    
    @Override
    public Optional<Supplier> findByCompanyName(String companyName) {
        return supplierJpaRepository.findByCompanyName(companyName);
    }
    
    @Override
    public List<Supplier> findAll() {
        return supplierJpaRepository.findAll();
    }
    
    @Override
    public List<Supplier> findAllActive() {
        return supplierJpaRepository.findAllActive();
    }
    
    @Override
    public List<Supplier> findAllInactive() {
        return supplierJpaRepository.findAllInactive();
    }
    
    @Override
    public List<Supplier> findByCompanyNameContainingIgnoreCase(String companyName) {
        return supplierJpaRepository.findByCompanyNameContainingIgnoreCase(companyName);
    }
    
    @Override
    public List<Supplier> findByEmailContainingIgnoreCase(String email) {
        return supplierJpaRepository.findByEmailContainingIgnoreCase(email);
    }
    
    @Override
    public List<Supplier> findByPhoneContaining(String phone) {
        return supplierJpaRepository.findByPhoneContaining(phone);
    }
    
    @Override
    public boolean existsByEmail(String email) {
        return supplierJpaRepository.existsByEmail(email);
    }
    
    @Override
    public boolean existsByCompanyName(String companyName) {
        return supplierJpaRepository.existsByCompanyName(companyName);
    }
    
    @Override
    public boolean existsByPhone(String phone) {
        return supplierJpaRepository.existsByPhone(phone);
    }
    
    @Override
    public void deleteById(Integer id) {
        supplierJpaRepository.deleteById(id);
    }
    
    @Override
    public long count() {
        return supplierJpaRepository.count();
    }
    
    @Override
    public long countByStatus(Boolean status) {
        return supplierJpaRepository.countByStatus(status);
    }
}