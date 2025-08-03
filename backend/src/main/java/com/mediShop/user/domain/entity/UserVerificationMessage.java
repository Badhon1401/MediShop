package com.mediShop.user.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "user_verification_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserVerificationMessage {

    @Id
    @GeneratedValue
    private UUID id;
    @Column(nullable = false)
    private String code;
    @Column(nullable = false, unique = true)
    private String userEmail;
    @Column(nullable = false)
    private Date expiry;

}