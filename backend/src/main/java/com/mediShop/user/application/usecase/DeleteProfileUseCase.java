package com.mediShop.user.application.usecase;

import com.mediShop.user.application.dto.DeleteProfileRequest;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.exception.UserException;
import com.mediShop.user.domain.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DeleteProfileUseCase {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DeleteProfileUseCase(UserRepository userRepository,
                               PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void deleteProfile(String userPhone, DeleteProfileRequest request) {
        // Find the user by phone number (which comes from JWT token)
        User user = userRepository.findByPhone(userPhone)
                .orElseThrow(() -> new UserException("User not found"));

        // Verify password
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new UserException("Invalid password");
        }

        // Delete user from database
        userRepository.delete(user);
    }
}
