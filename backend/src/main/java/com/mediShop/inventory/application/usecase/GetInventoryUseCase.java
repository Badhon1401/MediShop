
// GetInventoryByIdUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import com.mediShop.inventory.domain.exception.InventoryNotFoundException;
import com.mediShop.inventory.application.dto.InventoryResponse;

import org.springframework.stereotype.Service;

@Service
public class GetInventoryUseCase implements UseCase<Integer, InventoryResponse> {
    private final InventoryRepository inventoryRepository;

    public GetInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    // Check if inventory entry already exists for this medicine and batch
//        if (inventoryRepository.existsByMedicineIdAndBatchNumber(
//                request.getMedicineId(), request.getBatchNumber())) {
//            throw new DuplicateInventoryException(
//                    request.getMedicineId(), request.getBatchNumber());
//        }

    @Override
    public InventoryResponse execute(Integer inventoryId) {
        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new InventoryNotFoundException(inventoryId));

        return InventoryResponse.from(inventory);
    }
}