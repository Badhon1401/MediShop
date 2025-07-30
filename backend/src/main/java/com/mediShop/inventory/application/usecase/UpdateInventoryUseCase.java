// UpdateInventoryUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.application.dto.UpdateInventoryRequest;
import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UpdateInventoryUseCase {
    
    private final InventoryRepository inventoryRepository;
    
    @Autowired
    public UpdateInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    
    public Optional<Inventory> updateInventory(UpdateInventoryRequest updateRequest) {
        Optional<Inventory> existingInventory = inventoryRepository.findById(updateRequest.getInventoryId());
        
        if (existingInventory.isEmpty()) {
            return Optional.empty();
        }
        
        Inventory inventory = existingInventory.get();
        
        // Update inventory fields
        inventory.setMedicineName(updateRequest.getMedicineName());
        inventory.setBatchNumber(updateRequest.getBatchNumber());
        inventory.setCompanyName(updateRequest.getCompanyName());
        inventory.setExpiryDate(updateRequest.getExpiryDate());
        inventory.setLocation(updateRequest.getLocation());
        inventory.setType(updateRequest.getType());
        inventory.setPurchaseDate(updateRequest.getPurchaseDate());
        inventory.setTotalQuantity(updateRequest.getTotalQuantity());
        inventory.setAvailableQuantity(updateRequest.getAvailableQuantity());
        inventory.setUnitPrice(updateRequest.getUnitPrice());
        inventory.setPurchasePrice(updateRequest.getPurchasePrice());
        
        if (updateRequest.getDiscount() != null) {
            inventory.setDiscount(updateRequest.getDiscount());
        }
        
        // Validate available quantity doesn't exceed total quantity
        if (inventory.getAvailableQuantity() > inventory.getTotalQuantity()) {
            throw new IllegalArgumentException("Available quantity cannot exceed total quantity");
        }
        
        Inventory updatedInventory = inventoryRepository.save(inventory);
        return Optional.of(updatedInventory);
    }
    
    public boolean inventoryExists(Integer inventoryId) {
        return inventoryRepository.existsById(inventoryId);
    }
}