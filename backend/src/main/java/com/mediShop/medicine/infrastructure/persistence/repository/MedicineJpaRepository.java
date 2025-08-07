package com.mediShop.medicine.infrastructure.persistence.repository;

import com.mediShop.medicine.infrastructure.persistence.entity.MedicineJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;

@Repository
public interface MedicineJpaRepository extends JpaRepository<MedicineJpaEntity, UUID> {
    Set<MedicineJpaEntity> findByShopId(UUID shopId);
}
