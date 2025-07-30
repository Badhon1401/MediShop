// GetExpiredInventoryUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.application.dto.InventoryResponse;
import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetExpiredInventoryUseCase {
    private final InventoryRepository inventoryRepository;

    public GetExpiredInventoryUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<InventoryResponse> execute(Integer days) {
        List<Inventory> expiredItems;
        
        if (days == null || days == 0) {
            expiredItems = inventoryRepository.findExpiredItems();
        } else {
            expiredItems = inventoryRepository.findExpiringItems(days);
        }
        
        return expiredItems.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
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
