package com.mediShop.shop.infrastructure.web.controller;

import com.mediShop.security.UserCredentials;
import com.mediShop.shop.application.dto.ShopOperatorInvitationRequestDto;
import com.mediShop.shop.application.dto.ShopOperatorInvitationResponseDto;
import com.mediShop.shop.application.dto.ShopRequestDto;
import com.mediShop.shop.application.usecase.*;
import com.mediShop.shop.infrastructure.persistence.mapper.ShopMapper;
import com.mediShop.user.domain.entity.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/shops")
public class ShopController {

    private final CanAccessShopUseCase canAccessShopUseCase;
    private final CanManageShopUseCase canManageShopUseCase;
    private final InviteShopOperatorUseCase inviteShopOperatorUseCase;
    private final RegisterShopUseCase registerShopUseCase;
    private final RemoveShopOperatorUseCase removeShopOperatorUseCase;
    private final RespondToOperatorInvitationUseCase respondToOperatorInvitationUseCase;

    @Autowired
    public ShopController(CanAccessShopUseCase canAccessShopUseCase, CanManageShopUseCase canManageShopUseCase, InviteShopOperatorUseCase inviteShopOperatorUseCase, RegisterShopUseCase registerShopUseCase, RemoveShopOperatorUseCase removeShopOperatorUseCase, RespondToOperatorInvitationUseCase respondToOperatorInvitationUseCase) {
        this.canAccessShopUseCase = canAccessShopUseCase;
        this.canManageShopUseCase = canManageShopUseCase;
        this.inviteShopOperatorUseCase = inviteShopOperatorUseCase;
        this.registerShopUseCase = registerShopUseCase;
        this.removeShopOperatorUseCase = removeShopOperatorUseCase;
        this.respondToOperatorInvitationUseCase = respondToOperatorInvitationUseCase;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerShop(@Valid @RequestBody ShopRequestDto shop) {
        User currentUser= UserCredentials.getCurrentUser();
        return ResponseEntity.ok(registerShopUseCase.execute(ShopMapper.mapToShopDomain(shop),currentUser));
    }

    @PostMapping("/operator/invite")
    public ResponseEntity<?> inviteShopOperator(
            @Valid @RequestBody ShopOperatorInvitationRequestDto requestDto
    ) {
        User currentUser= UserCredentials.getCurrentUser();
        return ResponseEntity.ok(inviteShopOperatorUseCase.execute(requestDto.getUserId(),requestDto.getShopId(),requestDto.getRole(),requestDto.getInvitationMessage(),currentUser));
    }
    @PostMapping("/operator/invite/response")
    public ResponseEntity<?> responseToShopOperatorInvitation(
            @Valid @RequestBody ShopOperatorInvitationResponseDto responseDto
    ) {
        User currentUser= UserCredentials.getCurrentUser();
        return ResponseEntity.ok(respondToOperatorInvitationUseCase.execute(responseDto.getInvitationId(),responseDto.getResponse(),currentUser));
    }

    @DeleteMapping("/operator/remove")
    public ResponseEntity<?> removeShopOperator(
            @RequestParam UUID operatorId,
            @RequestParam UUID shopId
    ) {
        User currentUser= UserCredentials.getCurrentUser();
        return ResponseEntity.ok(removeShopOperatorUseCase.execute(operatorId,shopId,currentUser));
    }
}

