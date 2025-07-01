package com.medishop.medicine.application.usecase;

import com.medishop.medicine.domain.entity.Medicine;
import com.medishop.medicine.domain.repository.MedicineRepository;
import com.medishop.medicine.domain.exception.MedicineNotFoundException;
import com.medishop.medicine.application.dto.UpdateMedicineRequest;
import com.medishop.medicine.application.dto.MedicineResponse;

public class UpdateMedicineUseCase implements UseCase<UpdateMedicineRequest, MedicineResponse> {
    private final MedicineRepository medicineRepository;

    public UpdateMedicineUseCase(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @Override
    public MedicineResponse execute(UpdateMedicineRequest request) {
        Medicine medicine = medicineRepository.findById(request.getMedicineId())
                .orElseThrow(() -> new MedicineNotFoundException(request.getMedicineId()));

        medicine.updateDetails(
                request.getName(),
                request.getType(),
                request.getCategory(),
                request.getLocation(),
                request.getSupplierId()
        );

        Medicine updatedMedicine = medicineRepository.save(medicine);
        return MedicineResponse.from(updatedMedicine);
    }
}