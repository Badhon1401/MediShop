package com.mediShop.user.domain.repository;

import com.mediShop.user.domain.entity.UserVerificationMessage;

import java.util.Optional;

public interface UserVerificationMessageRepository {
    void deleteByUserEmail( String email);

    UserVerificationMessage save(UserVerificationMessage verificationCode);

    Optional<UserVerificationMessage> findByUserEmail(String email);

    void delete(UserVerificationMessage verificationMessage);
}
