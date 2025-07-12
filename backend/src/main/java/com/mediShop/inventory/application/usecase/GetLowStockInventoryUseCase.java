
// GetLowStockInventoryUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import com.mediShop.inventory.application.dto.InventoryResponse;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class GetLowStockInventoryUseCase implements UseCase<Integer, List<InventoryResponse>> {
    private final InventoryRepository inventoryRepository;

    public GetLowStockInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public List<InventoryResponse> execute(Integer threshold) {
        LocalDate thresholdDate = LocalDate.now().plusDays(threshold);
        List<Inventory> lowStockInventories = inventoryRepository.findLowStockInventory(threshold);

        return lowStockInventories.stream()
                .map(InventoryResponse::from)
                .collect(Collectors.toList());
    }
}