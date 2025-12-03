package com.mediShop.shop.application.dto;

import com.mediShop.shop.domain.entity.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShopOperatorInvitationRequestDto {

    @NotNull(message = "User ID must not be null")
    private UUID userId;

    @NotNull(message = "Shop ID must not be null")
    private UUID shopId;

    @NotNull(message = "Role must not be null")
    private Role role;

    @NotBlank(message = "Invitation message must not be blank")
    private String invitationMessage;

}
