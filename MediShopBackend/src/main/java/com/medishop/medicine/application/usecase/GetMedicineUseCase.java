package com.medishop.medicine.application.usecase;

import com.medishop.medicine.domain.entity.Medicine;
import com.medishop.medicine.domain.repository.MedicineRepository;
import com.medishop.medicine.domain.exception.MedicineNotFoundException;
import com.medishop.medicine.application.dto.MedicineResponse;

public class GetMedicineUseCase implements UseCase<Integer, MedicineResponse> {
    private final MedicineRepository medicineRepository;

    public GetMedicineUseCase(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @Override
    public MedicineResponse execute(Integer medicineId) {
        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new MedicineNotFoundException(medicineId));

        return MedicineResponse.from(medicine);
    }
}