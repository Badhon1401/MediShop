package com.mediShop.shop.application.usecase;


import com.mediShop.shop.application.exception.InvalidInputException;
import com.mediShop.shop.application.exception.UnauthorizedException;
import com.mediShop.shop.application.exception.UserAlreadyExistsException;
import com.mediShop.shop.domain.entity.Role;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.domain.entity.ShopOperator;
import com.mediShop.shop.domain.entity.ShopOperatorInvitation;
import com.mediShop.shop.domain.repository.ShopOperatorInvitationRepository;
import com.mediShop.shop.domain.repository.ShopOperatorRepository;
import com.mediShop.shop.infrastructure.persistence.entity.UserRole;
import com.mediShop.shop.infrastructure.persistence.mapper.RoleMapper;
import com.mediShop.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RespondToOperatorInvitationUseCase {

    private final ShopOperatorInvitationRepository invitationRepository;
    private final ShopOperatorRepository operatorRepository;

    @Transactional
    public Shop execute(UUID invitationId, String response, User currentUser) {
        ShopOperatorInvitation invitation = invitationRepository.findById(invitationId)
                .orElseThrow(() -> new UnauthorizedException("Invitation not found."));

        Shop shop = invitation.getInvitedAt();

        if (!invitation.getInvitee().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You are not authorized to respond to this invitation.");
        }

        if (shop.getOwner().getId().equals(currentUser.getId())) {
            invitationRepository.deleteById(invitationId);
            invitationRepository.flush();
            throw new UserAlreadyExistsException("Owner cannot be an operator.");
        }

        boolean alreadyOperator = shop.getShopOperatorList().stream()
                .anyMatch(op -> op.getUser().getId().equals(currentUser.getId()));

        if (alreadyOperator) {
            invitationRepository.deleteById(invitationId);
            invitationRepository.flush();
            throw new UserAlreadyExistsException("Already an operator.");
        }

        switch (response.trim().toLowerCase()) {
            case "accept":
                addOperatorToShop(shop, currentUser, invitation.getRole());
                invitationRepository.deleteById(invitationId);
                invitationRepository.flush();
                return shop;

            case "decline":
                invitationRepository.deleteById(invitationId);
                invitationRepository.flush();
                return shop;

            default:
                throw new InvalidInputException("Only 'accept' or 'decline' are valid responses.");
        }
    }

    private void addOperatorToShop(Shop shop, User user, Role role) {
        UserRole userRole = UserRole.valueOf(role.name());

        Optional<ShopOperator> existing = operatorRepository.findByUserIdAndRole(user.getId(), RoleMapper.mapToDomainRole(userRole));

        ShopOperator operator = existing.orElseGet(() -> {
            ShopOperator newOp = new ShopOperator();
            newOp.setUser(user);
            newOp.setRole(RoleMapper.mapToDomainRole(userRole));
            newOp.setShopList(new HashSet<>());
            return operatorRepository.save(newOp);
        });

        if (!operatorRepository.existsOperatorShopRelation(operator.getId(), shop.getId())) {
            operatorRepository.addOperatorToShop(shop.getId(), operator.getId());
        }
    }
}
