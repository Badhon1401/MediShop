package com.mediShop.medicine.infrastructure.persistence.repository;

import com.mediShop.medicine.domain.entity.Medicine;
import com.mediShop.medicine.domain.repository.MedicineRepository;
import com.mediShop.medicine.infrastructure.persistence.entity.MedicineJpaEntity;
import com.mediShop.medicine.infrastructure.persistence.mapper.MedicineMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class MedicineRepositoryImpl implements MedicineRepository {

    @Autowired
    private MedicineJpaRepository medicineJpaRepository;

    @Override
    public Medicine save(Medicine medicine) {
        return MedicineMapper.mapToMedicineDomain(
                medicineJpaRepository.save(MedicineMapper.mapToMedicineJpaEntity(medicine))
        );
    }

    @Override
    public Optional<Medicine> findById(UUID id) {
        return medicineJpaRepository.findById(id)
                .map(MedicineMapper::mapToMedicineDomain);
    }

    @Override
    public void delete(Medicine medicine) {
        medicineJpaRepository.delete(MedicineMapper.mapToMedicineJpaEntity(medicine));
    }

    @Override
    public Medicine update(UUID id, Medicine updatedMedicine) {
        return medicineJpaRepository.findById(id)
                .map(existingEntity -> {
                    MedicineJpaEntity updatedEntity = MedicineMapper.mapToMedicineJpaEntity(updatedMedicine);
                    updatedEntity.setId(existingEntity.getId()); // ensure ID remains the same
                    return MedicineMapper.mapToMedicineDomain(medicineJpaRepository.save(updatedEntity));
                })
                .orElseThrow(() -> new IllegalArgumentException("Medicine with ID " + id + " not found"));
    }

    @Override
    public Set<Medicine> findByShopId(UUID shopId) {
        return medicineJpaRepository.findByShopId(shopId).stream()
                .map(MedicineMapper::mapToMedicineDomain)
                .collect(Collectors.toSet());
    }

    @Override
    public void deleteById(UUID medicineId) {
        medicineJpaRepository.deleteById(medicineId);
    }

//    @Override
//    public Set<Medicine> findByShopIdAndCategory(UUID shopId, String category) {
//        return Set.of();
//    }
//
//    @Override
//    public Set<Medicine> findByShopIdAndExpiryDateBefore(UUID shopId, Date date) {
//        return Set.of();
//    }
}
