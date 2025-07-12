// GetExpiredInventoryUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import com.mediShop.inventory.application.dto.InventoryResponse;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class GetExpiredInventoryUseCase implements UseCase<Void, List<InventoryResponse>> {
    private final InventoryRepository inventoryRepository;

    public GetExpiredInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public List<InventoryResponse> execute(Void input) {
        List<Inventory> expiredInventories = inventoryRepository.findExpiredInventory();

        return expiredInventories.stream()
                .map(InventoryResponse::from)
                .collect(Collectors.toList());
    }
}