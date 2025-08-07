package com.mediShop.medicine.application.usecase;


import com.mediShop.medicine.application.exception.MedicineNotFoundException;
import com.mediShop.medicine.domain.entity.Medicine;
import com.mediShop.medicine.infrastructure.persistence.repository.MedicineRepositoryImpl;
import com.mediShop.security.UnauthorizedException;
import com.mediShop.shop.domain.entity.Role;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.infrastructure.persistence.repository.ShopRepositoryImpl;
import com.mediShop.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetMedicinesByShopUseCase {

    private final MedicineRepositoryImpl medicineRepository;
    private final ShopRepositoryImpl shopRepository;

    public Set<Medicine> execute(UUID shopId, User currentUser) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        boolean isMember = shop.getOwner().getId().equals(currentUser.getId()) ||
                shop.getShopOperatorList().stream()
                        .anyMatch(op -> op.getUser().getId().equals(currentUser.getId()));

        if (!isMember) {
            throw new UnauthorizedException("You are not authorized to access this shop's medicines.");
        }

        return medicineRepository.findByShopId(shopId);
    }
}