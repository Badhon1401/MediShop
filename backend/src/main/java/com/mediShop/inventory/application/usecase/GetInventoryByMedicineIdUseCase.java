// GetInventoryByMedicineIdUseCase.java
package com.mediShop.inventory.application.usecase;

import com.mediShop.inventory.domain.entity.Inventory;
import com.mediShop.inventory.domain.repository.InventoryRepository;
import com.mediShop.inventory.application.dto.InventoryResponse;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class GetInventoryByMedicineIdUseCase implements UseCase<Integer, List<InventoryResponse>> {
    private final InventoryRepository inventoryRepository;

    public GetInventoryByMedicineIdUseCase(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public List<InventoryResponse> execute(Integer medicineId) {
        List<Inventory> inventories = inventoryRepository.findByMedicineId(medicineId);

        return inventories.stream()
                .map(InventoryResponse::from)
                .collect(Collectors.toList());
    }
}