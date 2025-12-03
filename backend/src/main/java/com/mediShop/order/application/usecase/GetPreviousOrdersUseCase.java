package com.mediShop.order.application.usecase;

import com.mediShop.medicine.domain.entity.Medicine;
import com.mediShop.medicine.domain.repository.MedicineRepository;
import com.mediShop.order.application.dto.OrderItemResponse;
import com.mediShop.order.application.dto.OrderResponse;
import com.mediShop.order.domain.entity.Order;
import com.mediShop.order.domain.repository.OrderRepository;
import com.mediShop.security.UnauthorizedException;
import com.mediShop.shop.application.exception.ShopNotFoundException;
import com.mediShop.shop.domain.entity.Role;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.domain.repository.ShopRepository;
import com.mediShop.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GetPreviousOrdersUseCase {

    private final ShopRepository shopRepository;
    private final OrderRepository orderRepository;
    private final MedicineRepository medicineRepository;

    public List<OrderResponse> execute(UUID shopId, User user) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new ShopNotFoundException("Shop not found"));

        boolean isOwner = shop.getOwner().getId().equals(user.getId());
        boolean isSalesman = shop.getShopOperatorList().stream()
                .anyMatch(op -> op.getUser().getId().equals(user.getId()) && op.getRole() == Role.SALESMAN);

        if (!(isOwner || isSalesman)) {
            throw new UnauthorizedException("You don't have permission to view orders of this shop.");
        }

        Set<Order> orders = orderRepository.findByShopId(shop.getId());

        return orders.stream().map(order -> {
            List<OrderItemResponse> itemResponses = order.getItems().stream().map(item -> {
                Medicine medicine = medicineRepository.findById(item.getMedicineId())
                        .orElseThrow(() -> new RuntimeException("Medicine not found in order: " + item.getMedicineId()));
                return new OrderItemResponse(medicine.getName(), item.getQuantity(), medicine.getCategory());
            }).toList();

            return new OrderResponse(
                    order.getId(),
                    shop.getName(),
                    shop.getLocation(),
                    order.getCustomerName(),
                    order.getCustomerContactNumber(),
                    order.getCustomerAge(),
                    order.getOrderDate(),
                    order.getTotalAmount(),
                    itemResponses
            );
        }).toList();
    }
}