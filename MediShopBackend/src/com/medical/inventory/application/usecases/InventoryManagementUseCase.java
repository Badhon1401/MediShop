
package com.medical.inventory.application.usecases;

import com.medical.inventory.domain.entities.Inventory;
import com.medical.inventory.domain.services.InventoryDomainService;
import com.medical.inventory.infrastructure.repositories.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class InventoryManagementUseCase {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private InventoryDomainService inventoryDomainService;

    public Inventory createInventoryEntry(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public Optional<Inventory> getInventoryById(Long id) {
        return inventoryRepository.findById(id);
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public List<Inventory> getInventoryByMedicine(Long medicineId) {
        return inventoryRepository.findByMedicineId(medicineId);
    }

    public List<Inventory> getLowStockItems() {
        List<Inventory> allInventory = inventoryRepository.findAll();
        return inventoryDomainService.findLowStockItems(allInventory);
    }

    public List<Inventory> getExpiringSoonItems(int daysThreshold) {
        List<Inventory> allInventory = inventoryRepository.findAll();
        return inventoryDomainService.findExpiringSoon(allInventory, daysThreshold);
    }

    public List<Inventory> getExpiredItems() {
        List<Inventory> allInventory = inventoryRepository.findAll();
        return inventoryDomainService.findExpiredItems(allInventory);
    }

    public Inventory updateInventoryQuantity(Long inventoryId, int quantitySold) {
        Optional<Inventory> inventoryOpt = inventoryRepository.findById(inventoryId);
        if (inventoryOpt.isPresent()) {
            Inventory inventory = inventoryOpt.get();
            inventory.updateQuantity(quantitySold);
            return inventoryRepository.save(inventory);
        }
        throw new RuntimeException("Inventory not found with id: " + inventoryId);
    }

    public void deleteInventoryEntry(Long id) {
        inventoryRepository.deleteById(id);
    }
}