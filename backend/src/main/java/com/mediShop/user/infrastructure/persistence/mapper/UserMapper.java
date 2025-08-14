package com.mediShop.user.infrastructure.persistence.mapper;

import com.mediShop.user.domain.entity.User;
import com.mediShop.user.infrastructure.persistence.entity.UserJpaEntity;
import org.springframework.stereotype.Component;


@Component
public class UserMapper {

    public static User toDomainEntity(UserJpaEntity jpaEntity) {
        return new User(
                jpaEntity.getId(),
                jpaEntity.getName(),
                jpaEntity.getEmail(),
                jpaEntity.getPhone(),
                jpaEntity.getPassword(),
                jpaEntity.getRole(),
                jpaEntity.getOtp(),
                jpaEntity.getOtpExpiresAt(),
                jpaEntity.isVerified(),
                jpaEntity.getCreatedAt(),
                jpaEntity.getUpdatedAt()
        );
    }

    public static UserJpaEntity toJpaEntity(User domainEntity) {
        UserJpaEntity entity = new UserJpaEntity();
        if (domainEntity.getId() != null) {
            entity.setId(domainEntity.getId());
        }
        entity.setName(domainEntity.getName());
        entity.setEmail(domainEntity.getEmail());
        entity.setPhone(domainEntity.getPhone());
        entity.setRole(domainEntity.getRole());
        entity.setPassword(domainEntity.getPassword());
        entity.setOtp(domainEntity.getOtp());
        entity.setOtpExpiresAt(domainEntity.getOtpExpiresAt());
        entity.setVerified(domainEntity.isVerified());
        entity.setCreatedAt(domainEntity.getCreatedAt());
        entity.setUpdatedAt(domainEntity.getUpdatedAt());
        return entity;
    }
}
