
// UpdateStockUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import com.mediShop.inventory.domain.exception.InventoryNotFoundException;
import com.mediShop.inventory.domain.exception.InsufficientStockException;
import com.mediShop.inventory.application.dto.UpdateStockRequest;
import com.mediShop.inventory.application.dto.InventoryResponse;
import com.mediShop.inventory.application.dto.StockOperation;

public class UpdateStockUseCase implements UseCase<UpdateStockRequest, InventoryResponse> {
    private final InventoryRepository inventoryRepository;

    public UpdateStockUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public InventoryResponse execute(UpdateStockRequest request) {
        Inventory inventory = inventoryRepository.findById(request.getInventoryId())
                .orElseThrow(() -> new InventoryNotFoundException(request.getInventoryId()));

        switch (request.getOperation()) {
            case ADD:
                inventory.addStock(request.getQuantity());
                break;
            case REMOVE:
                if (inventory.getAvailableQuantity() < request.getQuantity()) {
                    throw new InsufficientStockException(
                            request.getInventoryId(), 
                            inventory.getAvailableQuantity(), 
                            request.getQuantity()
                    );
                }
                inventory.removeStock(request.getQuantity());
                break;
            case SET:
                inventory.setAvailableQuantity(request.getQuantity());
                break;
        }

        Inventory updatedInventory = inventoryRepository.save(inventory);
        return InventoryResponse.from(updatedInventory);
    }
}
