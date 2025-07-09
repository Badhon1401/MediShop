package com.sda.medishop.user.infrastructure.persistence.repository;

import com.sda.medishop.user.infrastructure.persistence.mapper.DomainMapperService;
import com.sda.medishop.user.infrastructure.persistence.repository.UserJpaRepository;
import com.sda.medishop.user.domain.entity.User;
import com.sda.medishop.user.domain.repository.UserRepository;

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
        return DomainMapperService.mapToUserDomain(userJpaRepository.save(DomainMapperService.mapToUserJpaEntity(user)));
    }

    @Override
    public Optional<User> findById(UUID userId) {
        return userJpaRepository.findById(userId)
                .map(DomainMapperService::mapToUserDomain);
    }

    @Override
    public Optional<User> findByUserName(String username) {
        return userJpaRepository.findByUserName(username)
                .map(DomainMapperService::mapToUserDomain);
    }

    @Override
    public List<User> findByEmail(String email) {
        return userJpaRepository.findByEmail(email)
                .stream()
                .map(DomainMapperService::mapToUserDomain)
                .collect(Collectors.toList());
    }
}
