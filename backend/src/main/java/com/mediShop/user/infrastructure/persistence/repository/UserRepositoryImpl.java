// com/mediShop/user/infrastructure/persistence/repository/UserRepositoryImpl.java
package com.mediShop.user.infrastructure.persistence.repository;

import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.user.infrastructure.persistence.entity.UserJpaEntity;
import com.mediShop.user.infrastructure.persistence.mapper.UserMapper;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public class UserRepositoryImpl implements UserRepository {
    private final UserJpaRepository jpaRepository;

    public UserRepositoryImpl(UserJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public User save(User user) {
        UserJpaEntity entity = UserMapper.toJpaEntity(user);
        UserJpaEntity saved = jpaRepository.save(entity);
        return UserMapper.toDomainEntity(saved);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpaRepository
                .findByEmail(email)
                .map(UserMapper::toDomainEntity);
    }

    @Override
    public Optional<User> findByPhone(String phone) {
        return jpaRepository
                .findByPhone(phone)
                .map(UserMapper::toDomainEntity);
    }

    @Override
    public Optional<User> findById(Integer id) {
        return jpaRepository
                .findById(id)
                .map(UserMapper::toDomainEntity);
    }

    @Override
    public Optional<User> findByOtp(String otp) {
        return jpaRepository
                .findByOtp(otp)
                .map(UserMapper::toDomainEntity);
    }

    @Override
    public Optional<User> findByEmailOrPhone(String emailOrPhone) {
        return jpaRepository
                .findByEmailOrPhone(emailOrPhone, emailOrPhone)
                .map(UserMapper::toDomainEntity);
    }

    @Override
    public void delete(User user) {
        // either delete by ID or by mapping back to the JPA entity
        if (user.getId() != null) {
            jpaRepository.deleteById(user.getId());
        }
    }
}
