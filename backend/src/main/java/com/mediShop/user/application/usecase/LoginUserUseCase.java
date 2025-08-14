package com.mediShop.user.application.usecase;

import com.mediShop.security.jwt.JwtUtil;
import com.mediShop.user.application.dto.UserLoginRequest;
import com.mediShop.user.application.dto.UserResponse;
import com.mediShop.user.application.mapper.UserDtoMapper;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.exception.UserException;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.validation.ValidationService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class LoginUserUseCase {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final ValidationService validationService;

    public LoginUserUseCase(UserRepository userRepository,
                            AuthenticationManager authenticationManager,
                            JwtUtil jwtUtil,
                            ValidationService validationService) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.validationService = validationService;
    }

    public UserResponse login(UserLoginRequest request) {
        String loginId = request.getLoginIdentifier();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginId, request.getPassword())
            );
        } catch (Exception e) {
            throw new UserException("Invalid credentials");
        }

        String searchIdentifier = loginId;
        if (!loginId.contains("@")) {
            try {
                searchIdentifier = validationService.normalizePhoneNumber(loginId);
            } catch (Exception e) {
                searchIdentifier = loginId;
            }
        }

        User user = userRepository.findByEmailOrPhone(searchIdentifier)
                .orElseThrow(() -> new UserException("User not found"));

        String token = jwtUtil.generateToken(user.getPhone());
        UserResponse userResponse = UserDtoMapper.toUserResponse(user);

        userResponse.setToken(token);

        return userResponse;
    }
}