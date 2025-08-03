package com.mediShop.user.domain.repository;

import com.mediShop.user.domain.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository {
    User save(User user);
    Optional<User> findById(UUID userId);

    Optional<User> findByUserName(String userName);

    List<User> findByEmail(String email);
}
