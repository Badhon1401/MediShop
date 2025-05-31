package com.sda.medishop.application;

import com.sda.medishop.application.interfaces.ShopRepository;
import com.sda.medishop.domain.Shop;

public class ShopService {
    private final ShopRepository shopRepository;

    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    Shop registerShop(Shop shop){
        return shopRepository.save(shop);
    }
}
