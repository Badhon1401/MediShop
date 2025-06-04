package com.sda.medishop.infrastructure.persistence.repository;

import com.sda.medishop.application.interfaces.UserVerificationMessageRepository;
import com.sda.medishop.domain.UserVerificationMessage;
import org.springframework.beans.factory.annotation.Autowired;

public class UserVerificationMessageRepositoryImpl implements UserVerificationMessageRepository {

    @Autowired
    private UserVerificationMessageJpaRepository userVerificationMessageJpaRepository;

    @Override
    public void deleteByUserEmail( String email) {
        userVerificationMessageJpaRepository.deleteByUserEmail(email);
    }

    @Override
    public UserVerificationMessage save(UserVerificationMessage verificationCode) {
        return userVerificationMessageJpaRepository.save(verificationCode);
    }

    @Override
    public UserVerificationMessage findByUserEmail(String email) {
        return userVerificationMessageJpaRepository.findByUserEmail(email);
    }

    @Override
    public void delete(UserVerificationMessage verificationMessage) {
            userVerificationMessageJpaRepository.delete(verificationMessage);
    }
}
