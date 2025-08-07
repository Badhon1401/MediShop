package com.mediShop.shop.domain.repository;

import com.mediShop.shop.domain.entity.Role;
import com.mediShop.shop.domain.entity.ShopOperator;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ShopOperatorRepository {

    boolean existsByUserIdAndShopIdAndRole(UUID userId, UUID shopId, Role role);
    Optional<ShopOperator> findByUserIdAndRole(UUID userId, Role role);
    ShopOperator save(ShopOperator operator);
    List<ShopOperator> findByUserId(UUID userId);
    void delete(ShopOperator operator);

    boolean existsByUserIdAndShopId(UUID id, UUID id1);

    void deleteById(UUID operatorId);

    Optional<ShopOperator> findById(UUID operatorId);

    boolean existsById(UUID operatorId);

    int countOperatorShopRelation(UUID operatorId, UUID shopId);

    void removeOperatorFromShop(UUID operatorId, UUID shopId);

    int countShopsForOperator(UUID operatorId);


    void addOperatorToShop( UUID shopId, UUID operatorId);

    boolean existsOperatorShopRelation(UUID operatorId, UUID shopId);

}
