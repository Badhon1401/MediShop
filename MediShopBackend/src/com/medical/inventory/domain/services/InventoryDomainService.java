// Domain Services
package com.medical.inventory.domain.services;

import com.medical.inventory.domain.entities.Inventory;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryDomainService {

    public List<Inventory> findLowStockItems(List<Inventory> inventories) {
        return inventories.stream()
                .filter(Inventory::isLowStock)
                .collect(Collectors.toList());
    }

    public List<Inventory> findExpiringSoon(List<Inventory> inventories, int daysThreshold) {
        return inventories.stream()
                .filter(inventory -> inventory.isExpiringSoon(daysThreshold))
                .collect(Collectors.toList());
    }

    public List<Inventory> findExpiredItems(List<Inventory> inventories) {
        return inventories.stream()
                .filter(Inventory::isExpired)
                .collect(Collectors.toList());
    }

    public boolean canFulfillOrder(Inventory inventory, int requestedQuantity) {
        return inventory.getQuantityAvailable() >= requestedQuantity;
    }

    public void processStockUpdate(Inventory inventory, int quantityChange) {
        int newQuantity = inventory.getQuantityAvailable() + quantityChange;
        if (newQuantity < 0) {
            throw new IllegalArgumentException("Stock cannot be negative");
        }
        inventory.setQuantityAvailable(newQuantity);
    }
}
