// AddInventoryUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.application.dto.AddInventoryRequest;
import com.mediShop.inventory.application.dto.InventoryResponse;
// import com.mediShop.inventory.application.exception.DuplicateBatchNumberException;
import com.mediShop.inventory.application.exception.InvalidInventoryOperationException;
import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import org.springframework.stereotype.Service;

@Service
public class AddInventoryUseCase {
    private final InventoryRepository inventoryRepository;

    public AddInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public InventoryResponse execute(AddInventoryRequest request) {
        // Validate available quantity doesn't exceed total quantity
        if (request.getAvailableQuantity() > request.getTotalQuantity()) {
            throw new InvalidInventoryOperationException("Available quantity cannot exceed total quantity");
        }

        // Check if batch number already exists
        // if (!inventoryRepository.findByBatchNumber(request.getBatchNumber()).isEmpty()) {
        //     throw new DuplicateBatchNumberException(request.getBatchNumber());
        // }

        // Create new inventory item
        Inventory inventory = new Inventory(
            request.getMedicineName(),
            request.getBatchNumber(),
            request.getCompanyName(),
            request.getExpiryDate(),
            request.getLocation(),
            request.getType(),
            request.getPurchaseDate(),
            request.getTotalQuantity(),
            request.getAvailableQuantity(),
            request.getUnitPrice(),
            request.getPurchasePrice(),
            request.getDiscount()
        );

        Inventory savedInventory = inventoryRepository.save(inventory);
        return mapToResponse(savedInventory);
    }

    private InventoryResponse mapToResponse(Inventory inventory) {
        InventoryResponse response = new InventoryResponse();
        response.setInventoryId(inventory.getInventoryId());
        response.setMedicineName(inventory.getMedicineName());
        response.setBatchNumber(inventory.getBatchNumber());
        response.setCompanyName(inventory.getCompanyName());
        response.setExpiryDate(inventory.getExpiryDate());
        response.setLocation(inventory.getLocation());
        response.setLastUpdated(inventory.getLastUpdated());
        response.setType(inventory.getType());
        response.setPurchaseDate(inventory.getPurchaseDate());
        response.setTotalQuantity(inventory.getTotalQuantity());
        response.setAvailableQuantity(inventory.getAvailableQuantity());
        response.setUnitPrice(inventory.getUnitPrice());
        response.setPurchasePrice(inventory.getPurchasePrice());
        response.setDiscount(inventory.getDiscount());
        response.setIsExpired(inventory.isExpired());
        response.setIsExpiringSoon(inventory.isExpiringSoon(30));
        response.setStockValue(inventory.calculateStockValue());
        response.setProfit(inventory.calculateProfit());
        return response;
    }
}





