package com.mediShop.shop.infrastructure.persistence.mapper;

import com.mediShop.medicine.infrastructure.persistence.mapper.MedicineMapper;
import com.mediShop.shop.application.dto.ShopRequestDto;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.infrastructure.persistence.entity.ShopJpaEntity;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.infrastructure.persistence.entity.UserJpaEntity;
import com.mediShop.user.infrastructure.persistence.mapper.UserMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
public class ShopMapper {

    public static Shop shopWithOwner(ShopJpaEntity entity){
        Shop shop = new Shop(entity.getId());
        if (entity.getOwner() != null) {
            shop.setOwner(new User(entity.getOwner().getId()));
        }
        return shop;
    }
    public static ShopJpaEntity mapToShopJpaEntity(Shop shop) {
        if (shop == null) {
            return null;
        }
        return new ShopJpaEntity(
                shop.getId(),
                shop.getName(),
                shop.getLocation(),
                UserMapper.mapToUserJpaEntity(shop.getOwner()),
                shop.getMedicineList() != null
                        ? shop.getMedicineList().stream()
                        .map(MedicineMapper::mapToMedicineJpaEntity)
                        .collect(Collectors.toSet())
                        : Collections.emptySet(),
                shop.getShopOperatorList() != null
                        ? shop.getShopOperatorList().stream()
                        .map(ShopOperatorMapper::mapToShopOperatorJpaEntity)
                        .collect(Collectors.toSet())
                        : Collections.emptySet()
        );
    }

    public static Shop mapToShopDomain(ShopJpaEntity entity) {
        if (entity == null) {
            return null;
        }
        UserJpaEntity entity1= entity.getOwner();
        return new Shop(
                entity.getId(),
                entity.getName(),
                entity.getLocation(),
                entity.getOwner() != null ? new User(entity1.getId()) : null,
                entity.getShopOperatorList() != null
                        ? entity.getShopOperatorList().stream()
                        .map(ShopOperatorMapper::mapToShopOperatorDomainLight)
                        .collect(Collectors.toSet())
                        : Collections.emptySet(),
                entity.getMedicineList() != null
                        ? entity.getMedicineList().stream()
                        .map(MedicineMapper::mapToMedicineDomainLight)
                        .collect(Collectors.toSet())
                        : Collections.emptySet()
        );
    }
    public static Shop mapToShopDomainLight(ShopJpaEntity shopJpaEntity) {
        return new Shop(shopJpaEntity.getId());
    }



    public static Shop mapToShopDomain(ShopRequestDto dto) {
        if (dto == null) {
            return null;
        }
        return new Shop(dto.getName(), dto.getLocation());
    }

}
