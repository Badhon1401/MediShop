package com.mediShop.user.infrastructure.persistence.mapper;

import com.mediShop.user.application.dto.UserRequestDto;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.infrastructure.persistence.entity.UserJpaEntity;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

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
}
