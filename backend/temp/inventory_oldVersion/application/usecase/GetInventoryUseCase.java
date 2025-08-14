
// GetInventoryByIdUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import com.mediShop.inventory.domain.exception.InventoryNotFoundException;
import com.mediShop.inventory.application.dto.InventoryResponse;

public class GetInventoryUseCase implements UseCase<Integer, InventoryResponse> {
    private final InventoryRepository inventoryRepository;

    public GetInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public InventoryResponse execute(Integer inventoryId) {
        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new InventoryNotFoundException(inventoryId));

        return InventoryResponse.from(inventory);
    }
}