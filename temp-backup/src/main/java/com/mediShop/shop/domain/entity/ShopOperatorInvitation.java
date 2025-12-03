package com.mediShop.shop.domain.entity;

import com.mediShop.user.domain.entity.User;

import java.time.LocalDateTime;
import java.util.UUID;

public class ShopOperatorInvitation {

    private UUID id;
    private Shop invitedAt;
    private User invitee;
    private Role role;
    private String invitationMessage;
    private LocalDateTime createdAt;

    public ShopOperatorInvitation(UUID invitationId, Shop invitedAt, User invitee, Role role, String invitationMessage, LocalDateTime createdAt) {
        this.id = invitationId;
        this.invitedAt = invitedAt;
        this.invitee = invitee;
        this.role = role;
        this.invitationMessage = invitationMessage;
        this.createdAt = createdAt;
    }

    public ShopOperatorInvitation(Shop invitedAt, User invitee, Role role, String invitationMessage) {
        this.invitedAt = invitedAt;
        this.invitee = invitee;
        this.role = role;
        this.invitationMessage = invitationMessage;
        this.createdAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Shop getInvitedAt() {
        return invitedAt;
    }

    public void setInvitedAt(Shop invitedAt) {
        this.invitedAt = invitedAt;
    }

    public User getInvitee() {
        return invitee;
    }

    public void setInvitee(User invitee) {
        this.invitee = invitee;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getInvitationMessage() {
        return invitationMessage;
    }

    public void setInvitationMessage(String invitationMessage) {
        this.invitationMessage = invitationMessage;
    }


}
