package com.mediShop.shop.infrastructure.persistence.entity;

import com.mediShop.user.infrastructure.persistence.entity.UserJpaEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "shop_operator_invitations", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"shop_id", "user_id", "role"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShopOperatorInvitationJpaEntity {

    @Id
    @GeneratedValue
    @Column(name = "invitation_id", nullable = false, updatable = false)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "shop_id", nullable = false)
    private ShopJpaEntity invitedAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserJpaEntity invitee;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role;

    @Column(name = "invitation_message", nullable = false)
    private String invitationMessage;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}



