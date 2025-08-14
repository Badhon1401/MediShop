
// InventoryMapper.java
package com.mediShop.inventory.infrastructure.persistence.mapper;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.infrastructure.persistence.entity.InventoryJpaEntity;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class InventoryMapper {
    
    public InventoryJpaEntity toJpaEntity(Inventory inventory) {
        if (inventory == null) {
            return null;
        }
        
        InventoryJpaEntity entity = new InventoryJpaEntity();
        entity.setInventoryId(inventory.getInventoryId());
        entity.setMedicineId(inventory.getMedicineId());
        entity.setBatchNumber(inventory.getBatchNumber());
        entity.setCompanyName(inventory.getCompanyName());
        entity.setExpiryDate(inventory.getExpiryDate());
        entity.setLocation(inventory.getLocation());
        entity.setLastUpdated(inventory.getLastUpdated());
        entity.setType(inventory.getType());
        entity.setSupplierId(inventory.getSupplierId());
        entity.setBuyingDate(inventory.getBuyingDate());
        entity.setTotalQuantity(inventory.getTotalQuantity());
        entity.setAvailableQuantity(inventory.getAvailableQuantity());
        entity.setUnitPrice(inventory.getUnitPrice());
        entity.setBuyingPrice(inventory.getBuyingPrice());
        entity.setDiscount(inventory.getDiscount() != null ? inventory.getDiscount() : BigDecimal.ZERO);
        
        return entity;
    }
    
    public Inventory toDomainEntity(InventoryJpaEntity entity) {
        if (entity == null) {
            return null;
        }
        
        return new Inventory(
            entity.getInventoryId(),
            entity.getMedicineId(),
            entity.getBatchNumber(),
            entity.getCompanyName(),
            entity.getExpiryDate(),
            entity.getLocation(),
            entity.getType(),
            entity.getSupplierId(),
            entity.getBuyingDate(),
            entity.getTotalQuantity(),
            entity.getAvailableQuantity(),
            entity.getUnitPrice(),
            entity.getBuyingPrice(),
            entity.getDiscount() != null ? entity.getDiscount() : BigDecimal.ZERO
        );
    }
}
