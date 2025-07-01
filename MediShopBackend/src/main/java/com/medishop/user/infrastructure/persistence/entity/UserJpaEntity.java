package com.sda.medishop.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "medishop_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserJpaEntity {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true)
    private String userName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "contact_number")
    private String contactNumber;


    public UserJpaEntity(UUID id) {
        this.id=id;
    }
//
//    public UserJpaEntity(UUID id, String userName, String email, String password, String contactNumber) {
//        this.id = id;
//        this.userName = userName;
//        this.email = email;
//        this.password = password;
//        this.contactNumber = contactNumber;
//    }

//    public void setId(UUID id) {
//        this.id = id;
//    }
//
//    public void setUserName(String userName) {
//        this.userName = userName;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public void setContactNumber(String contactNumber) {
//        this.contactNumber = contactNumber;
//    }
//
//    public UUID getId() {
//        return id;
//    }
//
//    public String getUserName() {
//        return userName;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public String getContactNumber() {
//        return contactNumber;
//    }
}

//eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6Im1ybWludXM0NDBAZ21haWwuY29tIiwidXNlcm5hbWUiOiJhYmIiLCJzdWIiOiJjNGMxYWY5Yy1lZWI5LTQyNGQtOGE4Mi1kZjdlZWNhYzkwNzUiLCJpYXQiOjE3NTA5MTQ4MTIsImV4cCI6MTc1MjcyOTIxMn0.dTE-6UE2kbAtFV-PsI9-ek-cFNnJEpGAcc15vYDVpuK0D-rWpIZ5CuepJYQ1A06QIiPA_vsgNRgwwLEuIJMoaQ