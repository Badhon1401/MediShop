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

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RemoveMedicineUseCase {

    private final MedicineRepositoryImpl medicineRepository;
    private final ShopRepositoryImpl shopRepository;

    public Shop execute(UUID medicineId, User currentUser) {
        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new MedicineNotFoundException("Medicine not found"));

        Shop shop = medicine.getShop();

        boolean isOwner = shop.getOwner().getId().equals(currentUser.getId());
        boolean isAdmin = shop.getShopOperatorList().stream()
                .anyMatch(op -> op.getUser().getId().equals(currentUser.getId()) && op.getRole() == Role.ADMIN);

        if (!(isOwner || isAdmin)) {
            throw new UnauthorizedException("You don't have permission to remove medicine.");
        }

        medicineRepository.deleteById(medicineId);
        return shop;
    }
}
