package com.mediShop.user.domain.repository;

import com.mediShop.user.domain.entity.User;
import java.util.Optional;

public interface UserRepository {
    User save(User user);
    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);
    Optional<User> findByEmailOrPhone(String emailOrPhone);
    Optional<User> findByOtp(String otp);
    Optional<User> findById(Integer id);
    void delete(User user);
}
