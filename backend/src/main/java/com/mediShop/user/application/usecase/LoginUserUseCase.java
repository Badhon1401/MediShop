package com.mediShop.user.application.usecase;

import com.mediShop.security.JWTService;
import com.mediShop.user.application.dto.exception.UserNotFoundException;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class LoginUserUseCase {
    private final UserRepository userRepository;

    private final AuthenticationManager authManager;

    private final JWTService jwtService;


    public ResponseEntity<?> execute(String userName, String password) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userName, password)
            );

            if (authentication.isAuthenticated()) {
                Optional<User> authenticatedUser = userRepository.findByUserName(userName);
                return authenticatedUser.map(user -> ResponseEntity.ok(jwtService.generateToken(user.getId(), user.getUserName(), user.getEmail()))).orElseGet(() -> ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found in the database."));


            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authentication failed. Invalid credentials.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authentication failed. Bad credentials.");
        }
    }
}


