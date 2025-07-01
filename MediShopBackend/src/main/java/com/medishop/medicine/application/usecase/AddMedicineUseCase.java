package com.medishop.medicine.application.usecase;

import com.medishop.medicine.domain.entity.Medicine;
import com.medishop.medicine.domain.repository.MedicineRepository;
import com.medishop.medicine.domain.exception.DuplicateBatchNumberException;
import com.medishop.medicine.application.dto.AddMedicineRequest;
import com.medishop.medicine.application.dto.MedicineResponse;

public class AddMedicineUseCase implements UseCase<AddMedicineRequest, MedicineResponse> {
    private final MedicineRepository medicineRepository;

    public AddMedicineUseCase(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @Override
    public MedicineResponse execute(AddMedicineRequest request) {
        if (medicineRepository.existsByBatchNumber(request.getBatchNumber())) {
            throw new DuplicateBatchNumberException(request.getBatchNumber());
        }

        Medicine medicine = Medicine.create(
                request.getName(),
                request.getType(),
                request.getCategory(),
                request.getBatchNumber(),
                request.getExpiryDate(),
                request.getLocation(),
                request.getSupplierId()
        );

        Medicine savedMedicine = medicineRepository.save(medicine);
        return MedicineResponse.from(savedMedicine);
    }
}