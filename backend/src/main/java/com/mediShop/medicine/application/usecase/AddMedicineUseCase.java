package com.mediShop.medicine.application.usecase;


import com.mediShop.medicine.domain.entity.Medicine;
import com.mediShop.medicine.infrastructure.persistence.repository.MedicineRepositoryImpl;
import com.mediShop.security.UnauthorizedException;
import com.mediShop.shop.domain.entity.Role;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.infrastructure.persistence.repository.ShopRepositoryImpl;
import com.mediShop.user.domain.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AddMedicineUseCase {

    private final MedicineRepositoryImpl medicineRepository;
    private final ShopRepositoryImpl shopRepository;

    @Transactional
    public Shop execute(Medicine medicine, UUID shopId, User user) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        boolean isOwner = shop.getOwner().getId().equals(user.getId());
        boolean isAdmin = shop.getShopOperatorList().stream()
                .anyMatch(op -> op.getUser().getId().equals(user.getId()) && op.getRole() == Role.ADMIN);

        if (!(isOwner || isAdmin)) {
            throw new UnauthorizedException("You don't have permission to add medicine.");
        }

        medicine.setShop(shop);
        shop.getMedicineList().add(medicine);

        medicineRepository.save(medicine);
        return shop;
    }
}
