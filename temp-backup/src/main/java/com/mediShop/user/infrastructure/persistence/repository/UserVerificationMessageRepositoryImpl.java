package com.mediShop.user.infrastructure.persistence.repository;

import com.mediShop.user.domain.entity.UserVerificationMessage;
import com.mediShop.user.domain.repository.UserVerificationMessageRepository;
import com.mediShop.user.infrastructure.persistence.mapper.UserVerificationMessageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public class UserVerificationMessageRepositoryImpl implements UserVerificationMessageRepository {

    @Autowired
    private UserVerificationMessageJpaRepository userVerificationMessageJpaRepository;

    @Override
    @Transactional
    public void deleteByUserEmail( String email) {

        userVerificationMessageJpaRepository.deleteByUserEmail(email);
        userVerificationMessageJpaRepository.flush();
    }

    @Override
    public UserVerificationMessage save(UserVerificationMessage verificationMessage) {
        return UserVerificationMessageMapper.mapToUserVerificationMessageDomain(userVerificationMessageJpaRepository.save(UserVerificationMessageMapper.mapToUserVerificationMessageJpaEntity(verificationMessage)));
    }


    @Override
    public Optional<UserVerificationMessage> findByUserEmail(String email) {
        return userVerificationMessageJpaRepository.findByUserEmail(email).map(UserVerificationMessageMapper::mapToUserVerificationMessageDomain);
    }

    @Override
    public void delete(UserVerificationMessage verificationMessage) {
        userVerificationMessageJpaRepository.delete(UserVerificationMessageMapper.mapToUserVerificationMessageJpaEntity(verificationMessage));
    }

}
