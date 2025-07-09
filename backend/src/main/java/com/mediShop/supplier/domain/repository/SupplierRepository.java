package com.mediShop.supplier.domain.repository;

import com.mediShop.supplier.domain.entity.Supplier;
import com.mediShop.supplier.domain.valueobject.SupplierId;

import java.util.List;
import java.util.Optional;

public interface SupplierRepository {
    Supplier save(Supplier supplier);
    Optional<Supplier> findById(SupplierId id);
    Optional<Supplier> findByName(String name);
    List<Supplier> findAll();
    void delete(Supplier supplier);
    boolean existsByEmail(String email);
}
