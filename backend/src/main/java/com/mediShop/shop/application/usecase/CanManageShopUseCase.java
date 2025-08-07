package com.mediShop.shop.application.usecase;

import com.mediShop.shop.domain.entity.Role;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.domain.repository.ShopOperatorRepository;
import com.mediShop.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CanManageShopUseCase {

    private final ShopOperatorRepository shopOperatorRepository;

    public boolean execute(Shop shop, User user, Role role) {
        return shopOperatorRepository.existsByUserIdAndShopIdAndRole(
                user.getId(), shop.getId(), role
        );
    }
}