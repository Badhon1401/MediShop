package com.mediShop.supplier.infrastructure.persistence.repository;

import com.mediShop.supplier.domain.entity.Supplier;
import com.mediShop.supplier.domain.repository.SupplierRepository;
import com.mediShop.supplier.domain.valueobject.SupplierId;
import com.mediShop.supplier.infrastructure.persistence.mapper.SupplierMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class SupplierRepositoryImpl implements SupplierRepository {

    private final JpaSupplierRepository jpaRepository;
    private final SupplierMapper mapper;

    @Autowired
    public SupplierRepositoryImpl(JpaSupplierRepository jpaRepository, SupplierMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }

    @Override
    public Supplier save(Supplier supplier) {
        return mapper.toDomain(jpaRepository.save(mapper.toEntity(supplier)));
    }

    @Override
    public Optional<Supplier> findById(SupplierId id) {
        return jpaRepository.findById(id.getId()).map(mapper::toDomain);
    }

    @Override
    public Optional<Supplier> findByName(String name) {
        return jpaRepository.findByName(name).map(mapper::toDomain);
    }

    @Override
    public List<Supplier> findAll() {
        return jpaRepository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Supplier supplier) {
        jpaRepository.deleteById(supplier.getSupplierId().getId());
    }

    @Override
    public boolean existsByEmail(String email) {
        return jpaRepository.existsByEmail(email);
    }
}
