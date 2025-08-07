package com.sda.medishop.user.infrastructure.persistence.mapper;

import com.sda.medishop.user.application.dto.UserRequestDto;
import com.sda.medishop.user.domain.*;

import com.sda.medishop.user.domain.entity.User;
import com.sda.medishop.user.domain.entity.UserVerificationMessage;
import com.sda.medishop.user.infrastructure.persistence.entity.UserJpaEntity;
import com.sda.medishop.user.infrastructure.persistence.entity.UserVerificationMessageJpaEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DomainMapperService {





    public static User mapToUserDomain(UserJpaEntity entity) {
        if (entity == null) {
            return null;
        }
        return new User(
                entity.getId(),
                entity.getUserName(),
                entity.getEmail(),
                entity.getPassword(),
                entity.getContactNumber()
        );
    }

    public static UserJpaEntity mapToUserJpaEntity(User user) {
        if (user == null) {
            return null;
        }
        return new UserJpaEntity(
                user.getId(),
                user.getUserName(),
                user.getEmail(),
                user.getPassword(),
                user.getContactNumber()
        );
    }

    public static User userDtoToUserDomain(UserRequestDto dto) {
        if (dto == null) {
            return null;
        }
        return new User(null, dto.getUserName(), dto.getEmail(), dto.getPassword(), dto.getContactNumber());
    }



    // ===== VERIFICATION =====

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
