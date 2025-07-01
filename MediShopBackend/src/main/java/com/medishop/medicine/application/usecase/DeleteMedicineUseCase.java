package com.medishop.medicine.application.usecase;

import com.medishop.medicine.domain.repository.MedicineRepository;
import com.medishop.medicine.domain.exception.MedicineNotFoundException;

public class DeleteMedicineUseCase implements UseCase<Integer, Void> {
    private final MedicineRepository medicineRepository;

    public DeleteMedicineUseCase(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @Override
    public Void execute(Integer medicineId) {
        if (!medicineRepository.findById(medicineId).isPresent()) {
            throw new MedicineNotFoundException(medicineId);
        }

        medicineRepository.deleteById(medicineId);
        return null;
    }
}