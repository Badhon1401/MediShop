package com.mediShop.shop.application.usecase;

import com.mediShop.shop.application.exception.ShopNotFoundException;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.domain.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FindShopUseCase {

    private final ShopRepository shopRepository;

    public Shop execute(UUID shopId) {
        return shopRepository.findById(shopId)
                .orElseThrow(() -> new ShopNotFoundException("Shop not found."));
    }
}