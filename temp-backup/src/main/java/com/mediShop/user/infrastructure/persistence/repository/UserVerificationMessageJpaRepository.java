package com.mediShop.user.infrastructure.persistence.repository;

import com.mediShop.user.infrastructure.persistence.entity.UserVerificationMessageJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserVerificationMessageJpaRepository extends JpaRepository<UserVerificationMessageJpaEntity, UUID> {
    Optional<UserVerificationMessageJpaEntity> findByUserEmail(String userEmail);

    @Transactional
    void deleteByUserEmail(String userEmail);
}
