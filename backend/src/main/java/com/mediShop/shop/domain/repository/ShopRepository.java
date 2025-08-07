package com.mediShop.shop.domain.repository;

import com.mediShop.shop.domain.entity.Shop;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface ShopRepository {
    Shop save(Shop shop);

    Optional<Shop> findById(UUID shopId);

    Optional<Shop> findWithOwnerById(UUID shopId);

    Set<Shop> findByOwnerId(UUID ownerId);

    Set<Shop> findByOperatorUserId(UUID operatorUserId);
}