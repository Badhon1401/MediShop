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
public class UpdateMedicineUseCase {

    private final MedicineRepositoryImpl medicineRepository;
    private final ShopRepositoryImpl shopRepository;

    public Medicine execute(UUID medicineId, Medicine updatedMedicine, User currentUser) {
        Medicine existingMedicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new MedicineNotFoundException("Medicine not found"));

        Shop shop = existingMedicine.getShop();

        boolean isOwner = shop.getOwner().getId().equals(currentUser.getId());
        boolean isAdmin = shop.getShopOperatorList().stream()
                .anyMatch(op -> op.getUser().getId().equals(currentUser.getId()) && op.getRole() == Role.ADMIN);

        if (!(isOwner || isAdmin)) {
            throw new UnauthorizedException("You don't have permission to update medicine.");
        }

        existingMedicine.setName(updatedMedicine.getName());
        existingMedicine.setGroupName(updatedMedicine.getGroupName());
        existingMedicine.setPower(updatedMedicine.getPower());
        existingMedicine.setCategory(updatedMedicine.getCategory());
        existingMedicine.setPrice(updatedMedicine.getPrice());
        existingMedicine.setGivenFor(updatedMedicine.getGivenFor());
        existingMedicine.setAvailableQuantity(updatedMedicine.getAvailableQuantity());
        existingMedicine.setManufacturedDate(updatedMedicine.getManufacturedDate());
        existingMedicine.setExpiryDate(updatedMedicine.getExpiryDate());
        existingMedicine.setPosition(updatedMedicine.getPosition());
        existingMedicine.setDiscountPercentage(updatedMedicine.getDiscountPercentage());

        return medicineRepository.save(existingMedicine);
    }
}
