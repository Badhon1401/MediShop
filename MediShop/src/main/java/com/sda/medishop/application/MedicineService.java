package com.sda.medishop.application;

import com.sda.medishop.application.interfaces.MedicineRepository;
import com.sda.medishop.domain.Medicine;

import java.util.UUID;

public class MedicineService {
    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    Medicine addMedicine(Medicine medicine){
        return medicineRepository.save(medicine);
    }
    Medicine updateMedicine(UUID medicineId,Medicine updatedMedicineData){
        Medicine medicine=medicineRepository.findById(medicineId);
        if(medicine==null){
            return null;
        }
        medicine=updatedMedicineData;
        return medicineRepository.save(medicine);
    }
    void deleteMedicine(UUID medicineId){
        Medicine medicine=medicineRepository.findById(medicineId);
        if(medicine==null){
            return;
        }
        medicineRepository.delete(medicine);
        return ;
    }
    Medicine getMedicineDetails(UUID medicineId){
        Medicine medicine=medicineRepository.findById(medicineId);
        if(medicine==null){
            return null;
        }
        return medicine;
    }
}
