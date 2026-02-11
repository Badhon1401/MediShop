package com.mediShop.shop.application.usecase;


import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.domain.repository.ShopRepository;
import com.mediShop.user.domain.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class RegisterShopUseCase {

    private final ShopRepository shopRepository;

    @Transactional
    public Shop execute(Shop shop, User user) {
        shop.setOwner(user);
        shop.setShopOperatorList(new HashSet<>());
        shop.setMedicineList(new HashSet<>());
        return shopRepository.save(shop);
    }
}
