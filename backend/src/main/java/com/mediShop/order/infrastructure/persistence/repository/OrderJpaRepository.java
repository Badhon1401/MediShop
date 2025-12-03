package com.mediShop.order.infrastructure.persistence.repository;

import com.mediShop.order.infrastructure.persistence.entity.OrderJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;

@Repository
public interface OrderJpaRepository extends JpaRepository<OrderJpaEntity, UUID> {
    Set<OrderJpaEntity> findByShopId(UUID id);
}
