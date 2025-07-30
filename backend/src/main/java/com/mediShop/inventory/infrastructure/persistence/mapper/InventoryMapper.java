package com.mediShop.inventory.infrastructure.persistence.mapper;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.infrastructure.persistence.entity.InventoryJpaEntity;
import org.springframework.stereotype.Component;

@Component
public class InventoryMapper {
    
    public Inventory toDomain(InventoryJpaEntity entity) {
        if (entity == null) {
            return null;
        }
        
        return new Inventory(
            entity.getInventoryId(),
            entity.getMedicineName(),
            entity.getBatchNumber(),
            entity.getCompanyName(),
            entity.getExpiryDate(),
            entity.getLocation(),
            entity.getLastUpdated(),
            entity.getType(),
            entity.getPurchaseDate(),
            entity.getTotalQuantity(),
            entity.getAvailableQuantity(),
            entity.getUnitPrice(),
            entity.getPurchasePrice(),
            entity.getDiscount()
        );
    }
    
    public InventoryJpaEntity toEntity(Inventory domain) {
        if (domain == null) {
            return null;
        }
        
        InventoryJpaEntity entity = new InventoryJpaEntity(
            domain.getMedicineName(),
            domain.getBatchNumber(),
            domain.getCompanyName(),
            domain.getExpiryDate(),
            domain.getLocation(),
            domain.getLastUpdated(),
            domain.getType(),
            domain.getPurchaseDate(),
            domain.getTotalQuantity(),
            domain.getAvailableQuantity(),
            domain.getUnitPrice(),
            domain.getPurchasePrice(),
            domain.getDiscount()
        );
        
        if (domain.getInventoryId() != null) {
            entity.setInventoryId(domain.getInventoryId());
        }
        
        return entity;
    }
    
    public void updateEntity(InventoryJpaEntity entity, Inventory domain) {
        if (entity == null || domain == null) {
            return;
        }
        
        entity.setMedicineName(domain.getMedicineName());
        entity.setBatchNumber(domain.getBatchNumber());
        entity.setCompanyName(domain.getCompanyName());
        entity.setExpiryDate(domain.getExpiryDate());
        entity.setLocation(domain.getLocation());
        entity.setLastUpdated(domain.getLastUpdated());
        entity.setType(domain.getType());
        entity.setPurchaseDate(domain.getPurchaseDate());
        entity.setTotalQuantity(domain.getTotalQuantity());
        entity.setAvailableQuantity(domain.getAvailableQuantity());
        entity.setUnitPrice(domain.getUnitPrice());
        entity.setPurchasePrice(domain.getPurchasePrice());
        entity.setDiscount(domain.getDiscount());
    }
}