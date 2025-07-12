
// AddInventoryUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import com.mediShop.inventory.domain.exception.DuplicateInventoryException;

import org.springframework.stereotype.Service;

import com.mediShop.inventory.application.dto.AddInventoryRequest;
import com.mediShop.inventory.application.dto.InventoryResponse;

@Service 
public class AddInventoryUseCase implements UseCase<AddInventoryRequest, InventoryResponse> {
    private final InventoryRepository inventoryRepository;

    public AddInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public InventoryResponse execute(AddInventoryRequest request) {
        System.out.println("----------------------------------AddInventoryUseCase.execute: ----------------------------------- "+request);
        // Check if inventory entry already exists for this medicine and batch
//        if (inventoryRepository.existsByMedicineIdAndBatchNumber(
//                request.getMedicineId(), request.getBatchNumber())) {
//            throw new DuplicateInventoryException(
//                    request.getMedicineId(), request.getBatchNumber());
//        }

        Inventory inventory = Inventory.create(
                request.getMedicineId(),
                request.getBatchNumber(),
                request.getCompanyName(),
                request.getExpiryDate(),
                request.getLocation(),
                request.getType(),
                request.getSupplierId(),
                request.getBuyingDate(),
                request.getTotalQuantity(),
                request.getUnitPrice(),
                request.getBuyingPrice(),
                request.getDiscount()
        );

        Inventory savedInventory = inventoryRepository.save(inventory);
        return InventoryResponse.from(savedInventory);
    }
}