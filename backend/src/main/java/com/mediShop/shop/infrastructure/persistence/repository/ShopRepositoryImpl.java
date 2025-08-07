package com.mediShop.shop.infrastructure.persistence.repository;


import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.domain.repository.ShopRepository;
import com.mediShop.shop.infrastructure.persistence.entity.ShopJpaEntity;
import com.mediShop.shop.infrastructure.persistence.mapper.ShopMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class ShopRepositoryImpl implements ShopRepository {

    @Autowired
    private ShopJpaRepository shopJpaRepository;


    @Override
    public Shop save(Shop shop) {
        return ShopMapper.mapToShopDomain(shopJpaRepository.save(ShopMapper.mapToShopJpaEntity(shop)));
    }

    @Override
    public Optional<Shop> findById(UUID shopId) {
        return shopJpaRepository.findById(shopId).map(ShopMapper::mapToShopDomain);
    }

    @Override
    public Optional<Shop> findWithOwnerById(UUID shopId) {
        return shopJpaRepository.findWithOwnerById(shopId).map(ShopMapper::mapToShopDomain);
    }




    @Override
    public Set<Shop> findByOwnerId(UUID ownerId) {
        Set<ShopJpaEntity> entities = shopJpaRepository.findByOwnerId(ownerId);
        return entities.stream()
                .map(ShopMapper::mapToShopDomain)
                .collect(Collectors.toSet());
    }

    @Override
    public Set<Shop> findByOperatorUserId(UUID operatorUserId) {
        Set<ShopJpaEntity> entities = shopJpaRepository.findByOperatorUserId(operatorUserId);
        return entities.stream()
                .map(ShopMapper::mapToShopDomain)
                .collect(Collectors.toSet());
    }


}
