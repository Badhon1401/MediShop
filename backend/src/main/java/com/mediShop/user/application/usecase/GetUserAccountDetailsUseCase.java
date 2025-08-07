package com.mediShop.user.application.usecase;


import com.mediShop.shop.application.exception.UserNotFoundException;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetUserAccountDetailsUseCase {
    private final UserRepository userRepository;

    public User execute(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found."));
    }
}