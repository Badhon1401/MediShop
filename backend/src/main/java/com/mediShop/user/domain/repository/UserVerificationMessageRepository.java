package com.sda.medishop.user.domain.repository;

import com.sda.medishop.user.domain.entity.UserVerificationMessage;

public interface UserVerificationMessageRepository {
    void deleteByUserEmail( String email);

    UserVerificationMessage save(UserVerificationMessage verificationCode);

    UserVerificationMessage findByUserEmail(String email);

    void delete(UserVerificationMessage verificationMessage);
}
