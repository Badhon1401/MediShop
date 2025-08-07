package com.mediShop.shop.infrastructure.persistence.repository;

import com.mediShop.shop.infrastructure.persistence.entity.ShopJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface ShopJpaRepository extends JpaRepository<ShopJpaEntity, UUID> {

    @Query("SELECT s FROM ShopJpaEntity s JOIN s.shopOperatorList op WHERE op.user.id = :operatorUserId")
    Set<ShopJpaEntity> findByOperatorUserId(@Param("operatorUserId") UUID operatorUserId);


    Set<ShopJpaEntity> findByOwnerId(UUID ownerId);

    @Query("SELECT s FROM ShopJpaEntity s JOIN FETCH s.owner WHERE s.id = :id")
    Optional<ShopJpaEntity> findWithOwnerById(UUID id);
}
