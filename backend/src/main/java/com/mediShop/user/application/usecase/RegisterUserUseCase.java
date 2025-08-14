package com.mediShop.user.application.usecase;

import com.mediShop.user.application.dto.*;
import com.mediShop.user.application.mapper.UserDtoMapper;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.exception.UserException;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.user.domain.valueobject.Role;
import com.mediShop.validation.ValidationService;
import com.mediShop.user.application.service.EmailService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class RegisterUserUseCase {
    private final UserRepository userRepo;
    private final ValidationService validation;
    private final EmailService emailService;
    private final PasswordEncoder encoder;

    public RegisterUserUseCase(UserRepository userRepo, ValidationService validation, EmailService emailService, PasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.validation = validation;
        this.emailService = emailService;
        this.encoder = encoder;
    }

    public UserResponse register(UserRegistrationRequest req) {
        validation.validateEmail(req.email);
        validation.validatePhoneNumber(req.phone);
        validation.validatePassword(req.password);

        String normalizedPhone = validation.normalizePhoneNumber(req.phone);
        String hashedPassword = encoder.encode(req.password);

        // Check if a user already exists with email
        Optional<User> existingUserByEmail = userRepo.findByEmail(req.email);
        if (existingUserByEmail.isPresent()) {
            User existingUser = existingUserByEmail.get();
            if (existingUser.isVerified()) {
                throw new UserException("Email already in use");
            } else {
                // Allow re-registration for unverified users - update existing user
                existingUser.setName(req.name);
                existingUser.setPhone(normalizedPhone);
                existingUser.setPassword(hashedPassword);
                existingUser.assignRole(req.role);
                existingUser.generateOtp(5);

                User savedUser = userRepo.save(existingUser);
                emailService.sendOtpEmail(savedUser.getEmail(), savedUser.getOtp());
                return UserDtoMapper.toUserResponse(savedUser);
            }
        }

        // Check if a user already exists with a phone
        Optional<User> existingUserByPhone = userRepo.findByPhone(normalizedPhone);
        if (existingUserByPhone.isPresent()) {
            User existingUser = existingUserByPhone.get();
            if (existingUser.isVerified()) {
                throw new UserException("Phone already in use");
            } else {
                // Allow re-registration for unverified users - update existing user
                existingUser.setName(req.name);
                existingUser.setEmail(req.email);
                existingUser.setPassword(hashedPassword);
                existingUser.assignRole(req.role);
                existingUser.generateOtp(5);

                User savedUser = userRepo.save(existingUser);
                emailService.sendOtpEmail(savedUser.getEmail(), savedUser.getOtp());
                return UserDtoMapper.toUserResponse(savedUser);
            }
        }

        // Create new user if no existing user found
        User user = User.create(req.name, req.email, normalizedPhone, hashedPassword, req.role);
        user.generateOtp(5);

        User saveUser = userRepo.save(user);
        emailService.sendOtpEmail(saveUser.getEmail(), saveUser.getOtp());

        return UserDtoMapper.toUserResponse(saveUser);
    }
}
