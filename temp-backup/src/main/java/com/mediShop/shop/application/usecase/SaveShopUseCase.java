package com.mediShop.shop.application.usecase;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.domain.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveShopUseCase {

    private final ShopRepository shopRepository;

    public Shop execute(Shop shop) {
        return shopRepository.save(shop);
    }
}