package com.mediShop.user.application.usecase;

import com.mediShop.user.application.dto.UserResponse;
import com.mediShop.user.application.mapper.UserDtoMapper;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.exception.UserException;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.validation.ValidationService;
import org.springframework.stereotype.Service;

@Service
public class GetUserProfileUseCase {
    private final UserRepository userRepo;
    private final ValidationService validation;

    public GetUserProfileUseCase(UserRepository userRepo, ValidationService validation) {
        this.userRepo = userRepo;
        this.validation = validation;
    }

    public UserResponse getProfile(String userPhone) {
        String searchIdentifier = userPhone;

        // Normalize phone number if needed
        if (!userPhone.contains("@")) {
            try {
                searchIdentifier = validation.normalizePhoneNumber(userPhone);
            } catch (Exception e) {
                searchIdentifier = userPhone;
            }
        }

        // Find user by phone (since JWT token contains phone)
        User user = userRepo.findByPhone(searchIdentifier)
                .orElseThrow(() -> new UserException("User not found"));

        return UserDtoMapper.toUserResponse(user);
    }
}
