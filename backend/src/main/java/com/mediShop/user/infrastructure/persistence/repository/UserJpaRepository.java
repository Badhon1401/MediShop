package com.mediShop.user.infrastructure.persistence.repository;

import com.mediShop.user.infrastructure.persistence.entity.UserJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserJpaRepository extends JpaRepository<UserJpaEntity, Integer> {
    Optional<UserJpaEntity> findByEmail(String email);
    Optional<UserJpaEntity> findByPhone(String phone);
    Optional<UserJpaEntity> findByEmailOrPhone(String email, String phone);
    Optional<UserJpaEntity> findByOtp(String otp);
}
