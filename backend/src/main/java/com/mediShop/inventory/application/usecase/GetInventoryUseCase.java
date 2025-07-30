// GetInventoryUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GetInventoryUseCase {
    
    private final InventoryRepository inventoryRepository;
    
    @Autowired
    public GetInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    
    public Optional<Inventory> getInventoryById(Integer inventoryId) {
        return inventoryRepository.findById(inventoryId);
    }
    
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }
    
    public boolean existsById(Integer inventoryId) {
        return inventoryRepository.existsById(inventoryId);
    }
}