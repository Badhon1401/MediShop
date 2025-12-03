package com.mediShop.order.infrastructure.web.controller;

import com.mediShop.order.application.dto.CreateOrderRequestDTO;
import com.mediShop.order.application.usecase.*;

import com.mediShop.order.domain.entity.Order;
import com.mediShop.order.infrastructure.persistence.mapper.OrderMapper;
import com.mediShop.security.UserCredentials;
import com.mediShop.user.domain.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final ProcessOrderUseCase processOrderUseCase;
    private final GetPreviousOrdersUseCase getPreviousOrdersUseCase;

    @PostMapping("/{shopId}/place")
    public ResponseEntity<Order> processOrder(@Valid @RequestBody CreateOrderRequestDTO request) {
        User currentUser = UserCredentials.getCurrentUser();
        return ResponseEntity.ok(processOrderUseCase.execute(OrderMapper.toOrderDomain(request), currentUser));
    }

    @GetMapping("/{shopId}/get")
    public ResponseEntity<?> getPreviousOrders(@PathVariable UUID shopId) {
        User currentUser = UserCredentials.getCurrentUser();
        return ResponseEntity.ok(getPreviousOrdersUseCase.execute(shopId, currentUser));
    }
}
