package com.mediShop.shop.infrastructure.persistence.repository;

import com.mediShop.shop.infrastructure.persistence.entity.ShopOperatorInvitationJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ShopOperatorInvitationJpaRepository extends JpaRepository<ShopOperatorInvitationJpaEntity, UUID> {

    List<ShopOperatorInvitationJpaEntity> findByInvitee_Id(UUID userId);
}
