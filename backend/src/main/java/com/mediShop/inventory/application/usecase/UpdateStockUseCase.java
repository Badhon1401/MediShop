// UpdateStockUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.application.dto.UpdateStockRequest;
import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UpdateStockUseCase {
    
    private final InventoryRepository inventoryRepository;
    
    @Autowired
    public UpdateStockUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    
    public Optional<Inventory> updateAvailableStock(UpdateStockRequest updateRequest) {
        Optional<Inventory> existingInventory = inventoryRepository.findById(updateRequest.getInventoryId());
        
        if (existingInventory.isEmpty()) {
            return Optional.empty();
        }
        
        Inventory inventory = existingInventory.get();
        
        // Validate that new available quantity doesn't exceed total quantity
        if (updateRequest.getQuantity() > inventory.getTotalQuantity()) {
            throw new IllegalArgumentException("Available quantity cannot exceed total quantity");
        }
        
        inventory.setAvailableQuantity(updateRequest.getQuantity());
        
        Inventory updatedInventory = inventoryRepository.save(inventory);
        return Optional.of(updatedInventory);
    }
    
    public Optional<Inventory> reduceStock(Integer inventoryId, Integer quantity) {
        Optional<Inventory> existingInventory = inventoryRepository.findById(inventoryId);
        
        if (existingInventory.isEmpty()) {
            return Optional.empty();
        }
        
        Inventory inventory = existingInventory.get();
        
        // Validate sufficient stock available
        if (inventory.getAvailableQuantity() < quantity) {
            throw new IllegalArgumentException("Insufficient stock available");
        }
        
        inventory.setAvailableQuantity(inventory.getAvailableQuantity() - quantity);
        
        Inventory updatedInventory = inventoryRepository.save(inventory);
        return Optional.of(updatedInventory);
    }
    
    public Optional<Inventory> increaseStock(Integer inventoryId, Integer quantity) {
        Optional<Inventory> existingInventory = inventoryRepository.findById(inventoryId);
        
        if (existingInventory.isEmpty()) {
            return Optional.empty();
        }
        
        Inventory inventory = existingInventory.get();
        
        int newAvailableQuantity = inventory.getAvailableQuantity() + quantity;
        int newTotalQuantity = Math.max(inventory.getTotalQuantity(), newAvailableQuantity);
        
        inventory.setAvailableQuantity(newAvailableQuantity);
        inventory.setTotalQuantity(newTotalQuantity);
        
        Inventory updatedInventory = inventoryRepository.save(inventory);
        return Optional.of(updatedInventory);
    }
    
    public boolean hasAvailableStock(Integer inventoryId, Integer requiredQuantity) {
        Optional<Inventory> inventory = inventoryRepository.findById(inventoryId);
        return inventory.map(inv -> inv.getAvailableQuantity() >= requiredQuantity).orElse(false);
    }
}