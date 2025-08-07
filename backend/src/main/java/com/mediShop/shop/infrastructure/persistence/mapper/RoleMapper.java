package com.mediShop.shop.infrastructure.persistence.mapper;

import com.mediShop.shop.domain.entity.Role;
import com.mediShop.shop.infrastructure.persistence.entity.UserRole;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {

    public static Role mapToDomainRole(UserRole userRole) {
        if (userRole == null) return null;
        return Role.valueOf(userRole.name());
    }

    public static UserRole mapToEntityUserRole(Role role) {
        if (role == null) return null;
        return UserRole.valueOf(role.name());
    }

}
