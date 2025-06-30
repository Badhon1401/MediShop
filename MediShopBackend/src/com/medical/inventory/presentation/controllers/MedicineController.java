// Presentation Layer - Controllers
package com.medical.inventory.presentation.controllers;

import com.medical.inventory.application.usecases.MedicineManagementUseCase;
import com.medical.inventory.domain.entities.Medicine;
import com.medical.inventory.presentation.dto.MedicineDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "*")
public class MedicineController {

    @Autowired
    private MedicineManagementUseCase medicineManagementUseCase;

    @GetMapping
    public ResponseEntity<List<MedicineDTO>> getAllMedicines() {
        List<Medicine> medicines = medicineManagementUseCase.getAllMedicines();
        List<MedicineDTO> medicineDTOs = medicines.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(medicineDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineDTO> getMedicineById(@PathVariable Long id) {
        Optional<Medicine> medicine = medicineManagementUseCase.getMedicineById(id);
        if (medicine.isPresent()) {
            return ResponseEntity.ok(convertToDTO(medicine.get()));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<MedicineDTO> createMedicine(@RequestBody MedicineDTO medicineDTO) {
        Medicine medicine = convertToEntity(medicineDTO);
        Medicine savedMedicine = medicineManagementUseCase.createMedicine(medicine);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedMedicine));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicineDTO> updateMedicine(@PathVariable Long id, @RequestBody MedicineDTO medicineDTO) {
        medicineDTO.setMedicineId(id);
        Medicine medicine = convertToEntity(medicineDTO);
        Medicine updatedMedicine = medicineManagementUseCase.updateMedicine(medicine);
        return ResponseEntity.ok(convertToDTO(updatedMedicine));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicine(@PathVariable Long id) {
        medicineManagementUseCase.deleteMedicine(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<MedicineDTO>> searchMedicines(@RequestParam String term) {
        List<Medicine> medicines = medicineManagementUseCase.searchMedicines(term);
        List<MedicineDTO> medicineDTOs = medicines.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(medicineDTOs);
    }

    private MedicineDTO convertToDTO(Medicine medicine) {
        MedicineDTO dto = new MedicineDTO();
        dto.setMedicineId(medicine.getMedicineId());
        dto.setName(medicine.getName());
        dto.setType(medicine.getType().toString());
        dto.setCategory(medicine.getCategory());
        dto.setBatchNumber(medicine.getBatchNumber());
        dto.setExpiryDate(medicine.getExpiryDate());
        dto.setLocation(medicine.getLocation());
        dto.setSupplierId(medicine.getSupplierId());
        return dto;
    }

    private Medicine convertToEntity(MedicineDTO dto) {
        Medicine medicine = new Medicine();
        medicine.setMedicineId(dto.getMedicineId());
        medicine.setName(dto.getName());
        medicine.setType(MedicineType.valueOf(dto.getType()));
        medicine.setCategory(dto.getCategory());
        medicine.setBatchNumber(dto.getBatchNumber());
        medicine.setExpiryDate(dto.getExpiryDate());
        medicine.setLocation(dto.getLocation());
        medicine.setSupplierId(dto.getSupplierId());
        return medicine;
    }
}