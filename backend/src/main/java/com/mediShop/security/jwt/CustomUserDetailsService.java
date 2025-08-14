package com.mediShop.security.jwt;

import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.repository.UserRepository;
import com.mediShop.validation.ValidationService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final ValidationService validationService;

    public CustomUserDetailsService(UserRepository userRepository, ValidationService validationService) {
        this.userRepository = userRepository;
        this.validationService = validationService;
    }

    @Override
    public UserDetails loadUserByUsername(String loginIdentifier) throws UsernameNotFoundException {
        String searchIdentifier = loginIdentifier;
        if (!loginIdentifier.contains("@")) {
            try {
                searchIdentifier = validationService.normalizePhoneNumber(loginIdentifier);
            } catch (Exception e) {
                searchIdentifier = loginIdentifier;
            }
        }
        Optional<User> userOptional = userRepository.findByEmailOrPhone(searchIdentifier);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with identifier: " + loginIdentifier);
        }
        User user = userOptional.get();
        return new org.springframework.security.core.userdetails.User(
                searchIdentifier, // For consistency, use the identifier
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }
}

