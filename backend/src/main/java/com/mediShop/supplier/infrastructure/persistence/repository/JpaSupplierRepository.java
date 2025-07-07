package com.mediShop.supplier.infrastructure.persistence.repository;

import com.mediShop.supplier.infrastructure.persistence.entity.SupplierEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaSupplierRepository extends JpaRepository<SupplierEntity, Long> {
    boolean existsByEmail(String email);
    Optional<SupplierEntity> findByEmail(String email);
    Optional<SupplierEntity> findByName(String name);
}
