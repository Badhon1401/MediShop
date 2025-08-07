package com.mediShop.shop.application.usecase;

import com.mediShop.shop.application.exception.ShopNotFoundException;
import com.mediShop.shop.application.exception.UnauthorizedException;
import com.mediShop.shop.application.exception.UserAlreadyExistsException;
import com.mediShop.shop.domain.entity.Role;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.domain.entity.ShopOperatorInvitation;
import com.mediShop.shop.domain.repository.ShopOperatorInvitationRepository;
import com.mediShop.shop.domain.repository.ShopRepository;
import com.mediShop.user.domain.entity.User;
import com.mediShop.user.domain.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InviteShopOperatorUseCase {

    private final ShopRepository shopRepository;
    private final UserRepository userRepository;
    private final ShopOperatorInvitationRepository invitationRepository;

    @Transactional
    public Shop execute(UUID userId, UUID shopId, Role role, String message, User currentUser) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new ShopNotFoundException("No shop with given ID found."));

        if (!shop.getOwner().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Only shop owner can invite operators.");
        }

        if (userId.equals(shop.getOwner().getId())) {
            throw new UserAlreadyExistsException("Owner cannot be an operator.");
        }

        User operatorUser = userRepository.findById(userId)
                .orElseThrow(() -> new com.mediShop.user.application.dto.exception.UserNotFoundException("Invited user not found."));

        boolean alreadyOperator = shop.getShopOperatorList().stream()
                .anyMatch(op -> op.getUser().getId().equals(userId));
        if (alreadyOperator) {
            throw new UserAlreadyExistsException("User is already an operator.");
        }

        ShopOperatorInvitation invitation = new ShopOperatorInvitation(shop, operatorUser, role, message);
        invitationRepository.save(invitation);

        return shop;
    }
}
