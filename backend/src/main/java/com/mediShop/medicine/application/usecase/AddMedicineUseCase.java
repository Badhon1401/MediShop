package com.mediShop.medicine.application.usecase;

import com.mediShop.medicine.domain.entity.Medicine;
import com.mediShop.medicine.domain.repository.MedicineRepository;
import com.mediShop.medicine.domain.exception.DuplicateBatchNumberException;
import com.mediShop.medicine.application.dto.AddMedicineRequest;
import com.mediShop.medicine.application.dto.MedicineResponse;
import org.springframework.stereotype.Service;

@Service
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