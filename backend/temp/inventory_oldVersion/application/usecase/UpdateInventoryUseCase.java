
// UpdateInventoryUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import com.mediShop.inventory.domain.exception.InventoryNotFoundException;
import com.mediShop.inventory.application.dto.UpdateInventoryRequest;
import com.mediShop.inventory.application.dto.InventoryResponse;

public class UpdateInventoryUseCase implements UseCase<UpdateInventoryRequest, InventoryResponse> {
    private final InventoryRepository inventoryRepository;

    public UpdateInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public InventoryResponse execute(UpdateInventoryRequest request) {
        Inventory inventory = inventoryRepository.findById(request.getInventoryId())
                .orElseThrow(() -> new InventoryNotFoundException(request.getInventoryId()));

        inventory.updateDetails(
                request.getCompanyName(),
                request.getExpiryDate(),
                request.getLocation(),
                request.getUnitPrice(),
                request.getDiscount()
        );

        Inventory updatedInventory = inventoryRepository.save(inventory);
        return InventoryResponse.from(updatedInventory);
    }
}