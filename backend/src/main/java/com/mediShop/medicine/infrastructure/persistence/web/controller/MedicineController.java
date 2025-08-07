package com.mediShop.medicine.infrastructure.persistence.web.controller;

import com.mediShop.medicine.application.dto.MedicineRequestDto;
import com.mediShop.medicine.application.usecase.*;
import com.mediShop.medicine.domain.entity.Medicine;
import com.mediShop.medicine.infrastructure.persistence.mapper.MedicineMapper;
import com.mediShop.security.UserCredentials;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.user.domain.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/medicines")
@RequiredArgsConstructor
public class MedicineController {

    private final AddMedicineUseCase addMedicineUseCase;
    private final UpdateMedicineUseCase updateMedicineUseCase;
    private final RemoveMedicineUseCase removeMedicineUseCase;
    private final GetMedicineDetailsUseCase getMedicineDetailsUseCase;
    private final GetMedicinesByShopUseCase getMedicinesByShopUseCase;

    @PostMapping("/{shopId}/add")
    public ResponseEntity<Shop> addMedicine(@PathVariable UUID shopId,
                                            @Valid @RequestBody MedicineRequestDto medicineDto) {
        User currentUser = UserCredentials.getCurrentUser();
        Medicine medicine = MedicineMapper.medicineDtoToMedicineDomain(medicineDto);
        return ResponseEntity.ok(addMedicineUseCase.execute(medicine, shopId, currentUser));
    }

    @PutMapping("/{medicineId}/update")
    public ResponseEntity<Medicine> updateMedicine(@PathVariable UUID medicineId,
                                                   @Valid @RequestBody MedicineRequestDto updatedMedicineDto) {
        User currentUser = UserCredentials.getCurrentUser();
        Medicine updatedMedicine = MedicineMapper.medicineDtoToMedicineDomain(updatedMedicineDto);
        return ResponseEntity.ok(updateMedicineUseCase.execute(medicineId, updatedMedicine, currentUser));
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Shop> removeMedicine(@PathVariable UUID id) {
        User currentUser = UserCredentials.getCurrentUser();
        return ResponseEntity.ok(removeMedicineUseCase.execute(id, currentUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicine(@PathVariable UUID id) {
        User currentUser = UserCredentials.getCurrentUser();
        return ResponseEntity.ok(getMedicineDetailsUseCase.execute(id, currentUser));
    }

    @GetMapping("/shop/{shopId}")
    public ResponseEntity<Set<Medicine>> getMedicinesByShop(@PathVariable UUID shopId) {
        User currentUser = UserCredentials.getCurrentUser();
        return ResponseEntity.ok(getMedicinesByShopUseCase.execute(shopId, currentUser));
    }
}
