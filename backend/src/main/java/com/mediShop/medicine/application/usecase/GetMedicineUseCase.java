package com.mediShop.medicine.application.usecase;

import com.mediShop.medicine.domain.entity.Medicine;
import com.mediShop.medicine.domain.repository.MedicineRepository;
import com.mediShop.medicine.domain.exception.MedicineNotFoundException;
import com.mediShop.medicine.application.dto.MedicineResponse;
import org.springframework.stereotype.Service;

@Service
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