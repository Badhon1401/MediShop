package com.mediShop.shop.application.usecase;

import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.domain.repository.ShopOperatorRepository;
import com.mediShop.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CanAccessShopUseCase {

    private final ShopOperatorRepository shopOperatorRepository;

    public boolean execute(Shop shop, User user) {
        return shop.getOwner().getId().equals(user.getId()) ||
                shopOperatorRepository.existsByUserIdAndShopId(user.getId(), shop.getId());
    }
}