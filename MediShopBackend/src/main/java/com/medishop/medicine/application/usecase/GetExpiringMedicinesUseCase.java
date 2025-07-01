package com.medishop.medicine.application.usecase;

import com.medishop.medicine.domain.entity.Medicine;
import com.medishop.medicine.domain.repository.MedicineRepository;
import com.medishop.medicine.application.dto.MedicineResponse;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class GetExpiringMedicinesUseCase implements UseCase<Integer, List<MedicineResponse>> {
    private final MedicineRepository medicineRepository;

    public GetExpiringMedicinesUseCase(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @Override
    public List<MedicineResponse> execute(Integer daysThreshold) {
        LocalDate thresholdDate = LocalDate.now().plusDays(daysThreshold);
        List<Medicine> expiringMedicines = medicineRepository.findExpiringBefore(thresholdDate);

        return expiringMedicines.stream()
                .map(MedicineResponse::from)
                .collect(Collectors.toList());
    }
}