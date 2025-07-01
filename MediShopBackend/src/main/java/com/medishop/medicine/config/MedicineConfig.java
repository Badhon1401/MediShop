package com.medishop.medicine.config;

import com.medishop.medicine.application.usecase.*;
import com.medishop.medicine.domain.repository.MedicineRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MedicineConfig {

    @Bean
    public AddMedicineUseCase addMedicineUseCase(MedicineRepository medicineRepository) {
        return new AddMedicineUseCase(medicineRepository);
    }

    @Bean
    public UpdateMedicineUseCase updateMedicineUseCase(MedicineRepository medicineRepository) {
        return new UpdateMedicineUseCase(medicineRepository);
    }

    @Bean
    public GetMedicineUseCase getMedicineUseCase(MedicineRepository medicineRepository) {
        return new GetMedicineUseCase(medicineRepository);
    }

    @Bean
    public SearchMedicinesUseCase searchMedicinesUseCase(MedicineRepository medicineRepository) {
        return new SearchMedicinesUseCase(medicineRepository);
    }

    @Bean
    public GetExpiringMedicinesUseCase getExpiringMedicinesUseCase(MedicineRepository medicineRepository) {
        return new GetExpiringMedicinesUseCase(medicineRepository);
    }

    @Bean
    public DeleteMedicineUseCase deleteMedicineUseCase(MedicineRepository medicineRepository) {
        return new DeleteMedicineUseCase(medicineRepository);
    }
}