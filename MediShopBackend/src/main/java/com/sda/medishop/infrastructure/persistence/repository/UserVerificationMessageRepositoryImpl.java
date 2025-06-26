package com.sda.medishop.infrastructure.persistence.repository;

import com.sda.medishop.application.interfaces.UserVerificationMessageRepository;
import com.sda.medishop.domain.User;
import com.sda.medishop.domain.UserVerificationMessage;
import com.sda.medishop.infrastructure.persistence.entity.UserJpaEntity;
import com.sda.medishop.infrastructure.persistence.entity.UserVerificationMessageJpaEntity;
import com.sda.medishop.infrastructure.service.DomainMapperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UserVerificationMessageRepositoryImpl implements UserVerificationMessageRepository {

    @Autowired
    private UserVerificationMessageJpaRepository userVerificationMessageJpaRepository;

    @Override
    @Transactional
    public void deleteByUserEmail( String email) {
        userVerificationMessageJpaRepository.deleteByUserEmail(email);
    }

    @Override
    public UserVerificationMessage save(UserVerificationMessage verificationMessage) {
        return DomainMapperService.mapToUserVerificationMessageDomain(userVerificationMessageJpaRepository.save(DomainMapperService.mapToUserVerificationMessageJpaEntity(verificationMessage)));

    }


    @Override
    public UserVerificationMessage findByUserEmail(String email) {
        return DomainMapperService.mapToUserVerificationMessageDomain( userVerificationMessageJpaRepository.findByUserEmail(email));
    }

    @Override
    public void delete(UserVerificationMessage verificationMessage) {
        userVerificationMessageJpaRepository.delete(DomainMapperService.mapToUserVerificationMessageJpaEntity(verificationMessage));
    }



}
