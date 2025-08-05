package com.mediShop.security;

import com.mediShop.security.UserPrincipal;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.infrastructure.persistence.repository.UserRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepositoryImpl userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username).orElseThrow(() -> new UsernameNotFoundException("User not found with name: " + username));; // You must define this in your repository
        return new UserPrincipal(user);
    }

    public UserPrincipal loadUserByUserId(UUID userId) throws UsernameNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + userId));
        return new UserPrincipal(user);
    }
}
