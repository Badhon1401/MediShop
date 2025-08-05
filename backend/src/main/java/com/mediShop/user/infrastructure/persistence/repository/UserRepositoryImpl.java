package com.mediShop.user.infrastructure.persistence.repository;

import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.user.infrastructure.persistence.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class UserRepositoryImpl implements UserRepository {

    private final UserJpaRepository userJpaRepository;

    @Autowired
    public UserRepositoryImpl(UserJpaRepository userJpaRepository) {
        this.userJpaRepository = userJpaRepository;
    }

    @Override
    public User save(User user) {
        return UserMapper.mapToUserDomain(
                userJpaRepository.save(UserMapper.mapToUserJpaEntity(user))
        );
    }

    @Override
    public Optional<User> findById(UUID userId) {
        return userJpaRepository.findById(userId)
                .map(UserMapper::mapToUserDomain);
    }

    @Override
    public Optional<User> findByUserName(String username) {
        return userJpaRepository.findByUserName(username)
                .map(UserMapper::mapToUserDomain);
    }

    @Override
    public List<User> findByEmail(String email) {
        return userJpaRepository.findByEmail(email).stream()
                .map(UserMapper::mapToUserDomain)
                .collect(Collectors.toList());
    }
}
