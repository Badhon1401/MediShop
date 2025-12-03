package com.mediShop.order.domain.repository;


import com.mediShop.order.domain.entity.Order;

import java.util.Set;
import java.util.UUID;

public interface OrderRepository {
    Order save(Order order);

    Order findById(UUID orderId);

    void delete(Order order);

    Set<Order> findByShopId(UUID id);

}
