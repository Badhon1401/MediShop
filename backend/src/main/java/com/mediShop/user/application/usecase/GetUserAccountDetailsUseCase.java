package com.mediShop.user.application.dto.usecase;


import com.mediShop.user.application.dto.exception.UserNotFoundException;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetUserAccountDetailsUseCase {
    private final UserRepository userRepository;

    public User execute(String username) {
        return userRepository.findByUserName(username)
                .orElseThrow(() -> new UserNotFoundException("User not found."));
    }
}