package com.sda.medishop.domain;

import java.util.UUID;

public class User {
    private final UUID id;
    private String userName;
    private  String email;
    private String password;
    private  String contactNumber;

    public User(UUID id, String userName, String email, String password, String contactNumber) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.contactNumber = contactNumber;
    }
}
