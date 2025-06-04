package com.sda.medishop.infrastructure.persistence.repository;

import com.sda.medishop.domain.User;
import com.sda.medishop.infrastructure.persistence.UserJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserJpaRepository extends JpaRepository<UserJpaEntity, UUID> {

    Optional<UserJpaEntity> findByUserName(String username);
    @Override
    Optional<UserJpaEntity> findById(UUID uuid);
}
