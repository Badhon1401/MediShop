package com.mediShop.shop.infrastructure.persistence.repository;


import com.mediShop.shop.infrastructure.persistence.entity.ShopOperatorJpaEntity;
import com.mediShop.shop.infrastructure.persistence.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ShopOperatorJpaRepository extends JpaRepository<ShopOperatorJpaEntity, UUID> {

        @Query("SELECT CASE WHEN COUNT(o) > 0 THEN TRUE ELSE FALSE END " +
                "FROM ShopOperatorJpaEntity o JOIN o.shopList s " +
                "WHERE o.user.id = :userId AND s.id = :shopId AND o.role = :role")
        boolean existsByUserIdAndShopIdAndRole(UUID userId, UUID shopId, UserRole role);
        Optional<ShopOperatorJpaEntity> findByUserIdAndRole(UUID userId, UserRole role);


        List<ShopOperatorJpaEntity> findByUser_Id(UUID userId);

        @Query("SELECT CASE WHEN COUNT(o) > 0 THEN TRUE ELSE FALSE END " +
                "FROM ShopOperatorJpaEntity o JOIN o.shopList s " +
                "WHERE o.user.id = :userId AND s.id = :shopId")
        boolean existsByUserIdAndShopId(UUID userId, UUID shopId);

        @Modifying
        @Query(value = "DELETE FROM shop_operator_shops WHERE operator_id = :operatorId AND shop_id = :shopId",
                nativeQuery = true)
        void removeOperatorFromShop(@Param("operatorId") UUID operatorId, @Param("shopId") UUID shopId);

        // Check if operator is still assigned to any shops
        @Query(value = "SELECT COUNT(*) FROM shop_operator_shops WHERE operator_id = :operatorId",
                nativeQuery = true)
        int countShopsForOperator(@Param("operatorId") UUID operatorId);

        // Check if operator exists and is assigned to the specific shop
        @Query(value = "SELECT COUNT(*) FROM shop_operator_shops WHERE operator_id = :operatorId AND shop_id = :shopId",
                nativeQuery = true)
        int countOperatorShopRelation(@Param("operatorId") UUID operatorId, @Param("shopId") UUID shopId);

        @Modifying
        @Query(value = "INSERT INTO shop_operator_shops (shop_id, operator_id) VALUES (:shopId, :operatorId)",
                nativeQuery = true)
        void addOperatorToShop(@Param("shopId") UUID shopId, @Param("operatorId") UUID operatorId);

        @Query(value = "SELECT COUNT(*) > 0 FROM shop_operator_shops WHERE operator_id = :operatorId AND shop_id = :shopId",
                nativeQuery = true)
        boolean existsOperatorShopRelation(@Param("operatorId") UUID operatorId, @Param("shopId") UUID shopId);
}
