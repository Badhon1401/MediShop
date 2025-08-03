// GetLowStockInventoryUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetLowStockInventoryUseCase {
    
    private final InventoryRepository inventoryRepository;
    
    @Autowired
    public GetLowStockInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    
    public List<Inventory> getLowStockItems(Integer threshold) {
        return inventoryRepository.findByAvailableQuantityLessThanEqual(threshold);
    }
    
    public List<Inventory> getItemsWithStockGreaterThan(Integer quantity) {
        return inventoryRepository.findByAvailableQuantityGreaterThan(quantity);
    }
    
    public List<Inventory> getItemsByStockRange(Integer minQuantity, Integer maxQuantity) {
        return inventoryRepository.findByTotalQuantityBetween(minQuantity, maxQuantity);
    }
}