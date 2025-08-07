package com.mediShop.shop.infrastructure.persistence.mapper;

import com.mediShop.shop.domain.entity.ShopOperator;
import com.mediShop.shop.infrastructure.persistence.entity.ShopJpaEntity;
import com.mediShop.shop.infrastructure.persistence.entity.ShopOperatorJpaEntity;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.infrastructure.persistence.entity.UserJpaEntity;
import com.mediShop.user.infrastructure.persistence.mapper.UserMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ShopOperatorMapper {

    public static ShopOperator mapToShopOperatorDomainLight(ShopOperatorJpaEntity entity) {
        ShopOperator shopOperator = new ShopOperator(entity.getId());
        UserJpaEntity entity1 = entity.getUser();
        shopOperator.setUser(new User(entity1.getId()));
        shopOperator.setRole(RoleMapper.mapToDomainRole(entity.getRole()));
        return shopOperator;
    }



    public static ShopOperatorJpaEntity mapToShopOperatorJpaEntity(ShopOperator operator) {
        if (operator == null) {
            throw new IllegalArgumentException("ShopOperator cannot be null");
        }
        if (operator.getUser() == null) {
            throw new IllegalArgumentException("ShopOperator user cannot be null");
        }
        if (operator.getRole() == null) {
            throw new IllegalArgumentException("ShopOperator role cannot be null");
        }


        Set<ShopJpaEntity> shopEntities = Optional.ofNullable(operator.getShopList())
                .orElse(Collections.emptySet())
                .stream()
                .map(shop -> new ShopJpaEntity(shop.getId()))
                .collect(Collectors.toSet());

        return ShopOperatorJpaEntity.builder()
                .user(new UserJpaEntity(operator.getUser().getId()))
                .shopList(shopEntities)
                .role(RoleMapper.mapToEntityUserRole(operator.getRole()))
                .build();
    }
    public static ShopOperator mapToShopOperatorDomain(ShopOperatorJpaEntity entity) {
        if (entity == null) {
            return null;
        }
        return new ShopOperator(
                entity.getId(),
                UserMapper.mapToUserDomain(entity.getUser()),
                entity.getShopList() != null
                        ? entity.getShopList().stream()
                        .map(ShopMapper::mapToShopDomainLight)
                        .collect(Collectors.toSet())
                        : Collections.emptySet(),
                RoleMapper.mapToDomainRole(entity.getRole())
        );
    }

}
