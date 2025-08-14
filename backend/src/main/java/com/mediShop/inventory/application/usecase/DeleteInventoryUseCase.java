// DeleteInventoryUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.application.exception.InventoryNotFoundException;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import org.springframework.stereotype.Service;

@Service
public class DeleteInventoryUseCase {
    private final InventoryRepository inventoryRepository;

    public DeleteInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public void execute(Integer inventoryId) {
        if (!inventoryRepository.existsById(inventoryId)) {
            throw new InventoryNotFoundException(inventoryId);
        }
        
        inventoryRepository.deleteById(inventoryId);
    }
}