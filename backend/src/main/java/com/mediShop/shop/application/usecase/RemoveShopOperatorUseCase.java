package com.mediShop.shop.application.usecase;

import com.mediShop.shop.application.exception.ShopNotFoundException;
import com.mediShop.shop.application.exception.UnauthorizedException;
import com.mediShop.shop.application.exception.UserNotFoundException;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.domain.repository.ShopOperatorRepository;
import com.mediShop.shop.domain.repository.ShopRepository;
import com.mediShop.user.domain.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RemoveShopOperatorUseCase {

    private final ShopRepository shopRepository;
    private final ShopOperatorRepository shopOperatorRepository;

    @Transactional
    public String execute(UUID operatorId, UUID shopId, User currentUser) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new ShopNotFoundException("Shop not found."));

        if (!shop.getOwner().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Only the shop owner can remove an operator.");
        }

        if (!shopOperatorRepository.existsById(operatorId)) {
            throw new UserNotFoundException("Operator not found.");
        }

        if (shopOperatorRepository.countOperatorShopRelation(operatorId, shopId) == 0) {
            throw new UserNotFoundException("Operator is not assigned to this shop.");
        }

        shopOperatorRepository.removeOperatorFromShop(operatorId, shopId);

        if (shopOperatorRepository.countShopsForOperator(operatorId) == 0) {
            shopOperatorRepository.deleteById(operatorId);
        }
        return "Successfully operation performed";
    }
}