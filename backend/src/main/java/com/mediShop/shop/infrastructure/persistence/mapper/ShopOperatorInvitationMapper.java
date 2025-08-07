package com.mediShop.shop.infrastructure.persistence.mapper;

import com.mediShop.shop.domain.entity.ShopOperator;
import com.mediShop.shop.domain.entity.ShopOperatorInvitation;
import com.mediShop.shop.infrastructure.persistence.entity.ShopJpaEntity;
import com.mediShop.shop.infrastructure.persistence.entity.ShopOperatorInvitationJpaEntity;
import com.mediShop.shop.infrastructure.persistence.entity.ShopOperatorJpaEntity;
import com.mediShop.shop.infrastructure.persistence.entity.UserRole;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.infrastructure.persistence.entity.UserJpaEntity;
import org.springframework.stereotype.Component;

@Component
public class ShopOperatorInvitationMapper {

    public static ShopOperatorInvitationJpaEntity mapToShopOperatorInvitationJpaEntity(ShopOperatorInvitation domain) {
        if (domain == null) {
            return null;
        }
        return ShopOperatorInvitationJpaEntity.builder()
                .invitedAt(new ShopJpaEntity(domain.getInvitedAt().getId()))
                .invitee(new UserJpaEntity(domain.getInvitee().getId()))
                .role(domain.getRole() != null ? UserRole.valueOf(domain.getRole().name()) : null)
                .invitationMessage(domain.getInvitationMessage())
                .build();
    }
    private static ShopOperator mapToShopOperatorDomainLight(ShopOperatorJpaEntity entity) {
        ShopOperator shopOperator = new ShopOperator(entity.getId());
        UserJpaEntity entity1 = entity.getUser();
        shopOperator.setUser(new User(entity1.getId()));
        shopOperator.setRole(RoleMapper.mapToDomainRole(entity.getRole()));
        return shopOperator;
    }


    public static ShopOperatorInvitation mapToShopOperatorInvitationDomain(ShopOperatorInvitationJpaEntity entity) {
        if (entity == null) {
            return null;
        }
        System.out.println("Jpa invitation role: asdfasdfsadf" + entity.getRole());

        return new ShopOperatorInvitation(
                entity.getId(),
                ShopMapper.mapToShopDomain(entity.getInvitedAt()),
                new User(entity.getInvitee().getId()),
                entity.getRole() != null ? RoleMapper.mapToDomainRole(entity.getRole()) : null,
                entity.getInvitationMessage(),
                entity.getCreatedAt()
        );
    }

}
