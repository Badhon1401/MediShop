// DeleteInventoryUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.domain.repository.InventoryRepository;

import org.springframework.stereotype.Service;

import com.mediShop.inventory.domain.exception.InventoryNotFoundException;

@Service
public class DeleteInventoryUseCase implements UseCase<Integer, Void> {
    private final InventoryRepository inventoryRepository;

    public DeleteInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public Void execute(Integer inventoryId) {
        if (!inventoryRepository.findById(inventoryId).isPresent()) {
            throw new InventoryNotFoundException(inventoryId);
        }

        inventoryRepository.deleteById(inventoryId);
        return null;
    }
}