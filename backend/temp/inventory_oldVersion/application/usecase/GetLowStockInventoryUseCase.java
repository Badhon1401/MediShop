
// GetLowStockInventoryUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import com.mediShop.inventory.application.dto.InventoryResponse;
import java.util.List;
import java.util.stream.Collectors;

public class GetLowStockInventoryUseCase implements UseCase<Void, List<InventoryResponse>> {
    private final InventoryRepository inventoryRepository;

    public GetLowStockInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public List<InventoryResponse> execute(Void request) {
        List<Inventory> lowStockInventories = inventoryRepository.findLowStockInventory();

        return lowStockInventories.stream()
                .map(InventoryResponse::from)
                .collect(Collectors.toList());
    }
}