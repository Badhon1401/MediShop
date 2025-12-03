package com.mediShop.user.infrastructure.persistence.mapper;

import com.mediShop.user.domain.entity.UserVerificationMessage;
import com.mediShop.user.infrastructure.persistence.entity.UserVerificationMessageJpaEntity;

public class UserVerificationMessageMapper {

    public static UserVerificationMessage mapToUserVerificationMessageDomain(UserVerificationMessageJpaEntity entity) {
        if (entity == null) {
            return null;
        }
        return new UserVerificationMessage(
                entity.getId(),
                entity.getCode(),
                entity.getUserEmail(),
                entity.getExpiry()
        );
    }

    public static UserVerificationMessageJpaEntity mapToUserVerificationMessageJpaEntity(UserVerificationMessage entity) {
        if (entity == null) {
            return null;
        }
        return UserVerificationMessageJpaEntity.builder()
                .code(entity.getCode())
                .userEmail(entity.getUserEmail())
                .expiry(entity.getExpiry())
                .build();


    }
}
