package com.mediShop.shop.application.usecase;

import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.domain.repository.ShopRepository;
import com.mediShop.shop.domain.repository.ShopOperatorRepository;
import com.mediShop.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetShopUseCase {

    private final ShopRepository shopRepository;
    private final ShopOperatorRepository shopOperatorRepository;

    public Shop execute(UUID shopId, User currentUser) {

        Shop shop = shopRepository.findWithOwnerById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        boolean isOwner =
                shop.getOwner() != null &&
                        shop.getOwner().getId().equals(currentUser.getId());

        boolean isOperator =
                shopOperatorRepository.existsByUserIdAndShopId(
                        currentUser.getId(),
                        shop.getId()
                );

        if (!isOwner && !isOperator) {
            throw new RuntimeException("Access denied to this shop");
        }

        return shop;
    }
}
