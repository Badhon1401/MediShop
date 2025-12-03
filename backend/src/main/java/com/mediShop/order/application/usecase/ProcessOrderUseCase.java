package com.mediShop.order.application.usecase;


import com.mediShop.medicine.domain.entity.Medicine;
import com.mediShop.medicine.domain.repository.MedicineRepository;
import com.mediShop.order.domain.entity.Order;
import com.mediShop.order.domain.entity.OrderItem;
import com.mediShop.order.domain.repository.OrderRepository;
import com.mediShop.security.UnauthorizedException;
import com.mediShop.shop.application.exception.ShopNotFoundException;
import com.mediShop.shop.domain.entity.Role;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.domain.repository.ShopRepository;
import com.mediShop.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProcessOrderUseCase {

    private final MedicineRepository medicineRepository;
    private final OrderRepository orderRepository;
    private final ShopRepository shopRepository;

    public Order execute(Order request, User user) {
        Shop shop = shopRepository.findById(request.getShop().getId())
                .orElseThrow(() -> new ShopNotFoundException("Shop not found: " + request.getShop().getId()));

        boolean isOwner = shop.getOwner().getId().equals(user.getId());
        boolean isSalesman = shop.getShopOperatorList().stream()
                .anyMatch(op -> op.getUser().getId().equals(user.getId()) && op.getRole() == Role.SALESMAN);

        if (!(isOwner || isSalesman)) {
            throw new UnauthorizedException("You don't have permission to place orders for this shop.");
        }

        List<OrderItem> validatedItems = new ArrayList<>();
        BigDecimal calculatedTotal = BigDecimal.ZERO;

        for (OrderItem item : request.getItems()) {
            Medicine medicine = medicineRepository.findById(item.getMedicineId())
                    .orElseThrow(() -> new IllegalArgumentException("Medicine not found: " + item.getMedicineId()));

            if (medicine.getAvailableQuantity() < item.getQuantity()) {
                throw new IllegalArgumentException("Insufficient stock for: " + medicine.getName());
            }

            BigDecimal unitPrice = medicine.getPrice();
            BigDecimal discount = unitPrice.multiply(medicine.getDiscountPercentage().divide(BigDecimal.valueOf(100)));
            BigDecimal discountedPrice = unitPrice.subtract(discount);
            BigDecimal lineTotal = discountedPrice.multiply(new BigDecimal(item.getQuantity()));

            calculatedTotal = calculatedTotal.add(lineTotal);
            validatedItems.add(new OrderItem(medicine.getId(), item.getQuantity()));
        }

        BigDecimal providedTotal = request.getTotalAmount().setScale(2, RoundingMode.HALF_UP);
        BigDecimal backendTotal = calculatedTotal.setScale(2, RoundingMode.HALF_UP);

        if (!providedTotal.equals(backendTotal)) {
            throw new IllegalArgumentException("Total mismatch: expected " + backendTotal + ", got " + providedTotal);
        }

        for (OrderItem item : validatedItems) {
            Medicine medicine = medicineRepository.findById(item.getMedicineId()).orElseThrow();
            medicine.setAvailableQuantity(medicine.getAvailableQuantity() - item.getQuantity());
            medicineRepository.save(medicine);
        }

        Order orderToSave = new Order(
                shop,
                request.getCustomerName(),
                request.getCustomerContactNumber(),
                request.getCustomerAge(),
                request.getOrderDate(),
                backendTotal,
                validatedItems
        );

        return orderRepository.save(orderToSave);
    }
}