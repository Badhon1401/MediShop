package com.mediShop.user.application.usecase;

import com.mediShop.security.jwt.JwtUtil;
import com.mediShop.user.application.dto.UpdateProfileRequest;
import com.mediShop.user.application.dto.UserResponse;
import com.mediShop.user.application.mapper.UserDtoMapper;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.exception.UserException;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.validation.ValidationService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UpdateProfileUseCase {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ValidationService validationService;
    private final JwtUtil jwtUtil;

    public UpdateProfileUseCase(UserRepository userRepository,
                               PasswordEncoder passwordEncoder,
                               ValidationService validationService,
                               JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.validationService = validationService;
        this.jwtUtil = jwtUtil;
    }

    public UserResponse updateProfile(String userPhone, UpdateProfileRequest request) {
        // Find the user by phone number (which comes from JWT token)
        User user = userRepository.findByPhone(userPhone)
                .orElseThrow(() -> new UserException("User not found"));

        // Verify the current password for identity confirmation (NOT for updating password)
        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new UserException("Current password is incorrect. Please provide your current password for verification.");
        }

        // Update name if provided
        String newName = user.getName(); // Keep the existing name by default
        if (request.name() != null && !request.name().isBlank()) {
            newName = request.name();
        }

        // Validate and update email if provided
        String newEmail = user.getEmail(); // Keep existing email by default
        if (request.email() != null && !request.email().isBlank()) {
            if (!validationService.isValidEmail(request.email())) {
                throw new UserException("Invalid email format");
            }
            // Check if email is already taken by another user
            userRepository.findByEmail(request.email())
                    .ifPresent(existingUser -> {
                        if (!existingUser.getId().equals(user.getId())) {
                            throw new UserException("Email is already taken");
                        }
                    });
            newEmail = request.email();
        }

        // Validate and update the phone if provided
        String newPhone = user.getPhone(); // Keep an existing phone by default
        boolean phoneChanged = false;

        if (request.phone() != null && !request.phone().isBlank()) {
            if (!validationService.isValidPhoneNumber(request.phone())) {
                throw new UserException("Invalid phone number format");
            }
            // Check if the phone is already taken by another user
            userRepository.findByPhone(request.phone())
                    .ifPresent(existingUser -> {
                        if (!existingUser.getId().equals(user.getId())) {
                            throw new UserException("Phone number is already taken");
                        }
                    });

            // Check if the phone number is actually changing
            phoneChanged = !request.phone().equals(user.getPhone());
            newPhone = request.phone();
        }

        // Update user profile (NAME, EMAIL, PHONE only - NOT password)
        user.updateProfile(newName, newEmail, newPhone);

        // Save an updated user
        User updatedUser = userRepository.save(user);

        // Create response
        UserResponse response = UserDtoMapper.toUserResponse(updatedUser);

        // Generate new JWT token if phone number changed
        if (phoneChanged) {
            String newToken = jwtUtil.generateToken(updatedUser.getPhone());
            response.setToken(newToken);
        }

        return response;
    }
}
