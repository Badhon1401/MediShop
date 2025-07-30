package com.mediShop.inventory.infrastructure.persistence.repository;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import com.mediShop.inventory.domain.valueobject.MedicineType;
import com.mediShop.inventory.infrastructure.persistence.entity.InventoryJpaEntity;
import com.mediShop.inventory.infrastructure.persistence.mapper.InventoryMapper;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class InventoryRepositoryImpl implements InventoryRepository {
    
    private final InventoryJpaRepository jpaRepository;
    private final InventoryMapper mapper;
    
    public InventoryRepositoryImpl(InventoryJpaRepository jpaRepository, InventoryMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }
    
    @Override
    public Inventory save(Inventory inventory) {
        InventoryJpaEntity entity = mapper.toEntity(inventory);
        InventoryJpaEntity savedEntity = jpaRepository.save(entity);
        return mapper.toDomain(savedEntity);
    }
    
    @Override
    public Optional<Inventory> findById(Integer inventoryId) {
        return jpaRepository.findById(inventoryId)
                .map(mapper::toDomain);
    }
    
    @Override
    public List<Inventory> findAll() {
        return jpaRepository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public void deleteById(Integer inventoryId) {
        jpaRepository.deleteById(inventoryId);
    }
    
    @Override
    public boolean existsById(Integer inventoryId) {
        return jpaRepository.existsById(inventoryId);
    }
    
    @Override
    public List<Inventory> findByMedicineNameContainingIgnoreCase(String medicineName) {
        return jpaRepository.findByMedicineNameContainingIgnoreCase(medicineName).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByBatchNumber(String batchNumber) {
        return jpaRepository.findByBatchNumber(batchNumber).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByCompanyNameContainingIgnoreCase(String companyName) {
        return jpaRepository.findByCompanyNameContainingIgnoreCase(companyName).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByType(MedicineType type) {
        return jpaRepository.findByType(type).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByLocation(String location) {
        return jpaRepository.findByLocation(location).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByAvailableQuantityLessThanEqual(Integer threshold) {
        return jpaRepository.findByAvailableQuantityLessThanEqual(threshold).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByAvailableQuantityGreaterThan(Integer quantity) {
        return jpaRepository.findByAvailableQuantityGreaterThan(quantity).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByTotalQuantityBetween(Integer minQuantity, Integer maxQuantity) {
        return jpaRepository.findByTotalQuantityBetween(minQuantity, maxQuantity).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByExpiryDateBefore(LocalDate date) {
        return jpaRepository.findByExpiryDateBefore(date).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByExpiryDateBetween(LocalDate startDate, LocalDate endDate) {
        return jpaRepository.findByExpiryDateBetween(startDate, endDate).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findExpiredItems() {
        return jpaRepository.findExpiredItems().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findExpiringItems(Integer days) {
        LocalDate expiryDate = LocalDate.now().plusDays(days);
        return jpaRepository.findExpiringItems(expiryDate).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByPurchaseDateBetween(LocalDate startDate, LocalDate endDate) {
        return jpaRepository.findByPurchaseDateBetween(startDate, endDate).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByPurchasePriceBetween(Double minPrice, Double maxPrice) {
        return jpaRepository.findByPurchasePriceBetween(minPrice, maxPrice).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByUnitPriceBetween(Double minPrice, Double maxPrice) {
        return jpaRepository.findByUnitPriceBetween(minPrice, maxPrice).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> searchInventory(String medicineName, String batchNumber, 
                                         String companyName, MedicineType type, 
                                         String location, Boolean isExpired, 
                                         Boolean isLowStock, Integer stockThreshold) {
        List<InventoryJpaEntity> entities = jpaRepository.searchInventory(medicineName, batchNumber, companyName, type, location);
        
        List<Inventory> inventories = entities.stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
        
        // Apply additional filters
        if (isExpired != null && isExpired) {
            inventories = inventories.stream()
                    .filter(Inventory::isExpired)
                    .collect(Collectors.toList());
        }
        
        if (isLowStock != null && isLowStock && stockThreshold != null) {
            inventories = inventories.stream()
                    .filter(inventory -> inventory.isLowStock(stockThreshold))
                    .collect(Collectors.toList());
        }
        
        return inventories;
    }
}