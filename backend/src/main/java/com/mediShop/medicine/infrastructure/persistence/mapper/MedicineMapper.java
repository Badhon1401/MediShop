package com.mediShop.medicine.infrastructure.persistence.mapper;

import com.mediShop.medicine.application.dto.MedicineRequestDto;
import com.mediShop.medicine.domain.entity.Medicine;
import com.mediShop.medicine.infrastructure.persistence.entity.MedicineJpaEntity;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.infrastructure.persistence.entity.ShopJpaEntity;
import com.mediShop.shop.infrastructure.persistence.mapper.ShopMapper;
import org.springframework.stereotype.Component;

@Component
public class MedicineMapper {

    public static Medicine mapToMedicineDomainLight(MedicineJpaEntity medicineJpaEntity) {
        Medicine medicine = new Medicine(medicineJpaEntity.getId());
        ShopJpaEntity entity=medicineJpaEntity.getShop();
        medicine.setShop(new Shop(entity.getId()));
        return medicine;
    }
    public static Medicine mapToMedicineDomain(MedicineJpaEntity entity) {
        if (entity == null) {
            return null;
        }
        return new Medicine(
                entity.getId(),
                ShopMapper.shopWithOwner(entity.getShop()),
                entity.getName(),
                entity.getGroupName(),
                entity.getPower(),
                entity.getCategory(),
                entity.getPrice(),
                entity.getGivenFor(),
                entity.getAvailableQuantity(),
                entity.getManufacturedDate(),
                entity.getExpiryDate(),
                entity.getPosition(),
                entity.getDiscountPercentage()
        );
    }

    public static MedicineJpaEntity mapToMedicineJpaEntity(Medicine medicine) {
        if (medicine == null) {
            return null;
        }
        return MedicineJpaEntity.builder()
                .id(medicine.getId())
                .shop(new ShopJpaEntity(medicine.getShop().getId()))
                .name(medicine.getName())
                .groupName(medicine.getGroupName())
                .power(medicine.getPower())
                .category(medicine.getCategory())
                .price(medicine.getPrice())
                .givenFor(medicine.getGivenFor())
                .availableQuantity(medicine.getAvailableQuantity())
                .manufacturedDate(medicine.getManufacturedDate())
                .expiryDate(medicine.getExpiryDate())
                .position(medicine.getPosition())
                .discountPercentage(medicine.getDiscountPercentage())
                .build();
    }

    public static Medicine medicineDtoToMedicineDomain(MedicineRequestDto dto) {
        if (dto == null) {
            return null;
        }
        return new Medicine(
                null,
                null,
                dto.getName(),
                dto.getGroupName(),
                dto.getPower(),
                dto.getCategory(),
                dto.getPrice(),
                dto.getGivenFor(),
                dto.getAvailableQuantity(),
                dto.getManufacturedDate(),
                dto.getExpiryDate(),
                dto.getPosition(),
                dto.getDiscountPercentage()
        );
    }
}
