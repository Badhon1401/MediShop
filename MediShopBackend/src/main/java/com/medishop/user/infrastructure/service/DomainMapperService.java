package com.sda.medishop.infrastructure.service;

import com.sda.medishop.domain.*;
import com.sda.medishop.infrastructure.persistence.entity.*;
import com.sda.medishop.infrastructure.persistence.repository.ShopRepositoryImpl;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DomainMapperService {

    public static Shop mapToShopDomain(ShopJpaEntity shopJpaEntity){
        List<ShopOperator> operators=new ArrayList<>();
        for(ShopOperatorJpaEntity entity:shopJpaEntity.getShopOperatorList()){
            operators.add(new ShopOperator(entity.getId()));
        }
        List<Medicine> medicines=new ArrayList<>();
        for(MedicineJpaEntity entity:shopJpaEntity.getMedicineList()){
            medicines.add(new Medicine(entity.getId()));
        }
        return new Shop(
                shopJpaEntity.getId(),
                shopJpaEntity.getName(),
                shopJpaEntity.getLocation(),
                new User(shopJpaEntity.getOwner().getId()),
                operators,
                medicines
        );
    }
    public static UserJpaEntity mapToUserJpaEntity(User user){
        return new UserJpaEntity(
                user.getId(),
                user.getUserName(),
                user.getEmail(),
                user.getPassword(),
                user.getContactNumber()
        );
    }
    public static User mapToUserDomain(UserJpaEntity entity) {
        return new User(
                entity.getId(),
                entity.getUserName(),
                entity.getEmail(),
                entity.getPassword(),
                entity.getContactNumber()
        );
    }
    public static ShopOperator mapToShopOperatorDomain(ShopOperatorJpaEntity entity){
        List<Shop> shopList=new ArrayList<>();
        for(ShopJpaEntity shop: entity.getShopList()){
            shopList.add(new Shop(shop.getId()));
        }
        return new ShopOperator(
                entity.getId(),
                new User(entity.getUser().getId()),
                shopList,
                entity.getRole()
        );


    }
    public static ShopOperatorJpaEntity mapToShopOperatorJpaEntity(ShopOperator operator){
        List<ShopJpaEntity> shopList=new ArrayList<>();
        for(Shop shop: operator.getShopList()){
            shopList.add(new ShopJpaEntity(shop.getId()));
        }
        return new ShopOperatorJpaEntity(
                operator.getId(),
                new UserJpaEntity(operator.getUser().getId()),
                shopList,
                operator.getRole()
        );
    }
    public static ShopJpaEntity mapToShopJpaEntity(Shop shop){
        List<MedicineJpaEntity>  medicineJpaEntities =new ArrayList<>();
        for(Medicine medicine:shop.getMedicineList()){
            medicineJpaEntities.add(new MedicineJpaEntity(medicine.getId()));
        }
        List<ShopOperatorJpaEntity> entities =new ArrayList<>();
        for(ShopOperator operator:shop.getShopOperatorList()){
            entities.add(new ShopOperatorJpaEntity(operator.getId()));
        }
        return new ShopJpaEntity(
               shop.getId(),
               shop.getName(),
               shop.getLocation(),
               new UserJpaEntity(shop.getOwner().getId()),
                medicineJpaEntities,
               entities
        );

    }

    public static MedicineJpaEntity mapToMedicineJpaEntity(Medicine medicine) {
        return new MedicineJpaEntity(
                new ShopJpaEntity(medicine.getShop().getId()),
                medicine.getName(),
                medicine.getGroupName(),
                medicine.getPower(),
                medicine.getCategory(),
                medicine.getPrice(),
                medicine.getGivenFor(),
                medicine.getAvailableQuantity(),
                medicine.getManufacturedDate(),
                medicine.getExpiryDate(),
                medicine.getPosition(),
                medicine.getDiscountPercentage()

        );
    }
    public static Medicine mapToMedicineDomain(MedicineJpaEntity medicine) {
        return new Medicine(
                medicine.getId(),
                new Shop(medicine.getShop().getId()),
                medicine.getName(),
                medicine.getGroupName(),
                medicine.getPower(),
                medicine.getCategory(),
                medicine.getPrice(),
                medicine.getGivenFor(),
                medicine.getAvailableQuantity(),
                medicine.getManufacturedDate(),
                medicine.getExpiryDate(),
                medicine.getPosition(),
                medicine.getDiscountPercentage()

        );
    }
    public static UserVerificationMessageJpaEntity mapToUserVerificationMessageJpaEntity(UserVerificationMessage entity) {
        return new UserVerificationMessageJpaEntity(
                entity.getVerificationCodeId(),
                entity.getCode(),
                entity.getUserEmail(),
                entity.getExpiry()
        );
    }
    public static UserVerificationMessage mapToUserVerificationMessageDomain(UserVerificationMessageJpaEntity entity) {
        return new UserVerificationMessage(
                entity.getId(),
                entity.getCode(),
                entity.getUserEmail(),
                entity.getExpiry()
        );
    }
}
