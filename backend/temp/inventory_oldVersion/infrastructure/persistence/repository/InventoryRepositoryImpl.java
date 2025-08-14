
// InventoryRepositoryImpl.java
package com.mediShop.inventory.infrastructure.persistence.repository;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import com.mediShop.inventory.infrastructure.persistence.entity.InventoryJpaEntity;
import com.mediShop.inventory.infrastructure.persistence.mapper.InventoryMapper;
import com.mediShop.medicine.domain.valueobject.MedicineType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
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
        InventoryJpaEntity entity = mapper.toJpaEntity(inventory);
        InventoryJpaEntity savedEntity = jpaRepository.save(entity);
        return mapper.toDomainEntity(savedEntity);
    }
    
    @Override
    public Optional<Inventory> findById(Integer inventoryId) {
        return jpaRepository.findById(inventoryId)
                .map(mapper::toDomainEntity);
    }
    
    @Override
    public List<Inventory> findAll() {
        return jpaRepository.findAll().stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByMedicineId(Integer medicineId) {
        return jpaRepository.findByMedicineId(medicineId).stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByBatchNumber(String batchNumber) {
        return jpaRepository.findByBatchNumber(batchNumber).stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByCompanyName(String companyName) {
        return jpaRepository.findByCompanyNameContainingIgnoreCase(companyName).stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByLocation(String location) {
        return jpaRepository.findByLocationContainingIgnoreCase(location).stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByType(MedicineType type) {
        return jpaRepository.findByType(type).stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findBySupplierId(Integer supplierId) {
        return jpaRepository.findBySupplierId(supplierId).stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findExpiringBefore(LocalDate date) {
        return jpaRepository.findExpiringBefore(date).stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findExpiredInventory() {
        return jpaRepository.findExpiredInventory().stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findLowStockItems(Integer threshold) {
        return jpaRepository.findLowStockItems(threshold).stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findOutOfStockItems() {
        return jpaRepository.findOutOfStockItems().stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByBuyingDateBetween(LocalDate startDate, LocalDate endDate) {
        return jpaRepository.findByBuyingDateBetween(startDate, endDate).stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByUnitPriceBetween(BigDecimal minPrice, BigDecimal maxPrice) {
        return jpaRepository.findByUnitPriceBetween(minPrice, maxPrice).stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> findByAvailableQuantityGreaterThan(Integer quantity) {
        return jpaRepository.findByAvailableQuantityGreaterThan(quantity).stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public boolean existsByMedicineIdAndBatchNumber(Integer medicineId, String batchNumber) {
        return jpaRepository.existsByMedicineIdAndBatchNumber(medicineId, batchNumber);
    }
    
    @Override
    public void deleteById(Integer inventoryId) {
        jpaRepository.deleteById(inventoryId);
    }
    
    @Override
    public BigDecimal getTotalInventoryValue() {
        BigDecimal total = jpaRepository.getTotalInventoryValue();
        return total != null ? total : BigDecimal.ZERO;
    }
    
    @Override
    public Integer getTotalAvailableQuantity() {
        Integer total = jpaRepository.getTotalAvailableQuantity();
        return total != null ? total : 0;
    }
    
    @Override
    public List<Inventory> findLowStockInventory() {
        return jpaRepository.findLowStockInventory().stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<Inventory> searchInventory(String medicineName, String batchNumber, String companyName, 
                                         MedicineType type, Integer supplierId, String location, 
                                         Boolean expired, Boolean lowStock, LocalDate expiryDateFrom, 
                                         LocalDate expiryDateTo, Integer page, Integer size, 
                                         String sortBy, String sortDirection) {
        
        // Set default values
        page = page != null ? page : 0;
        size = size != null ? size : 10;
        sortBy = sortBy != null ? sortBy : "inventoryId";
        sortDirection = sortDirection != null ? sortDirection : "ASC";
        
        // Create sort object
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        // Perform search
        Page<InventoryJpaEntity> result = jpaRepository.searchInventory(
            medicineName, batchNumber, companyName, type, supplierId, location,
            expired, lowStock, expiryDateFrom, expiryDateTo, pageable
        );
        
        return result.getContent().stream()
                .map(mapper::toDomainEntity)
                .collect(Collectors.toList());
    }
}
