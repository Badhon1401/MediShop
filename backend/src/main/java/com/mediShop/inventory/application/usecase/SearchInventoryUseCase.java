package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import com.mediShop.inventory.application.dto.InventorySearchRequest;
import com.mediShop.inventory.application.dto.InventoryResponse;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class SearchInventoryUseCase implements UseCase<InventorySearchRequest, List<InventoryResponse>> {
    private final InventoryRepository inventoryRepository;

    public SearchInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public List<InventoryResponse> execute(InventorySearchRequest request) {
        List<Inventory> inventories;

        // Example condition handling (optional: you can simplify or customize)
        if (request.getMedicineName() != null && !request.getMedicineName().isEmpty()) {
            // if a specific field logic is to be prioritized, add here
            inventories = inventoryRepository.searchInventory(
                    request.getMedicineName(),
                    request.getBatchNumber(),
                    request.getCompanyName(),
                    request.getType()
                    // request.getSupplierId(),
                    // request.getLocation(),
                    // request.getExpired(),
                    // request.getLowStock(),
                    // request.getExpiryDateFrom(),
                    // request.getExpiryDateTo(),
                    // request.getPage(),
                    // request.getSize(),
                    // request.getSortBy(),
                    // request.getSortDirection()
            );
        } else {
            // fallback to general search
            inventories = inventoryRepository.searchInventory(
                    null, null, null, null
            );
        }

        return inventories.stream()
                .map(InventoryResponse::from)
                .collect(Collectors.toList());
    }
}
