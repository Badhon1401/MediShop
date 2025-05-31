package com.sda.medishop.application;

import com.sda.medishop.application.interfaces.UserRepository;
import com.sda.medishop.domain.User;

public class UserService {
    private final UserRepository userRepository;

    User registerUser(User user){
       return userRepository.save(user);
    }
}
