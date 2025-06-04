package com.sda.medishop.infrastructure.persistence.repository;

import com.sda.medishop.application.interfaces.UserRepository;
import com.sda.medishop.domain.User;
import com.sda.medishop.infrastructure.persistence.UserJpaEntity;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.UUID;

public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private UserJpaRepository userJpaRepository;

    @Override
    public User save(User user) {
        UserJpaEntity userJpaEntity=new UserJpaEntity();
        userJpaEntity.setId(user.getId());
        userJpaEntity.setUserName(user.getUserName());
        userJpaEntity.setEmail(user.getEmail());
        userJpaEntity.setPassword(user.getPassword());
        userJpaEntity.setContactNumber(user.getContactNumber());
        userJpaRepository.save(userJpaEntity);
        return user;
    }

    @Override
    public Optional<User> findById(UUID userId) {
        return userJpaRepository.findById(userId)
                .map(this::mapToDomain);
    }

    public Optional<User> findByUserName(String username) {
        return userJpaRepository.findByUserName(username)
                .map(this::mapToDomain);
    }
    private User mapToDomain(UserJpaEntity entity) {
        return new User(
                entity.getId(),
                entity.getUserName(),
                entity.getEmail(),
                entity.getPassword(),
                entity.getContactNumber()
        );
    }
}
