package com.sda.medishop.infrastructure.persistence.repository;

import com.sda.medishop.domain.UserVerificationMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserVerificationMessageJpaRepository extends JpaRepository<UserVerificationMessage, UUID> {
    UserVerificationMessage findByUserEmail(String userEmail);

    void deleteByUserEmail(String userEmail);
}
