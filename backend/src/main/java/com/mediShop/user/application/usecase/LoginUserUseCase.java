package com.mediShop.user.application.dto.usecase;

import com.mediShop.user.application.dto.exception.UserNotFoundException;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class LoginUserUseCase {
    private final UserRepository userRepository;

    public User execute(String username, String password) {
        return userRepository.findByUserName(username)
                .filter(u -> u.getPassword().equals(password))
                .orElseThrow(() -> new UserNotFoundException("Invalid username or password."));
    }
}


