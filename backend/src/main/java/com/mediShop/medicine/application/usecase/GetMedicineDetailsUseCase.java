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
public class GetMedicineDetailsUseCase {

    private final MedicineRepositoryImpl medicineRepository;
    private final ShopRepositoryImpl shopRepository;

    public Medicine execute(UUID medicineId, User currentUser) {
        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new MedicineNotFoundException("Medicine not found"));

        Shop shop = shopRepository.findById(medicine.getShop().getId())
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        boolean isMember = shop.getOwner().getId().equals(currentUser.getId()) ||
                shop.getShopOperatorList().stream()
                        .anyMatch(op -> op.getUser().getId().equals(currentUser.getId()));

        if (!isMember) {
            throw new UnauthorizedException("You are not authorized to view this medicine.");
        }

        return medicine;
    }
}
