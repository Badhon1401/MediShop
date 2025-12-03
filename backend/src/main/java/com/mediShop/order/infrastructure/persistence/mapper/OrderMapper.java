package com.mediShop.order.infrastructure.persistence.mapper;

import com.mediShop.order.application.dto.CreateOrderRequestDTO;
import com.mediShop.order.domain.entity.Order;
import com.mediShop.order.domain.entity.OrderItem;
import com.mediShop.order.infrastructure.persistence.entity.MedicineQuantity;
import com.mediShop.order.infrastructure.persistence.entity.OrderJpaEntity;
import com.mediShop.shop.domain.entity.Shop;
import com.mediShop.shop.infrastructure.persistence.entity.ShopJpaEntity;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderJpaEntity toOrderJpaEntity(Order order) {
        List<MedicineQuantity> itemEntities = order.getItems().stream()
                .map(OrderMapper::toEmbedded)
                .collect(Collectors.toList());

        return OrderJpaEntity.builder()
                .shop(new ShopJpaEntity(order.getShop().getId()))
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .customerName(order.getCustomerName())
                .customerContactNumber(order.getCustomerContactNumber())
                .customerAge(order.getCustomerAge())
                .items(itemEntities)
                .build();
    }


    public static Order orderJpaToOrderDomain(OrderJpaEntity entity) {
        List<OrderItem> items = entity.getItems().stream()
                .map(i -> new OrderItem(i.getMedicineId(), i.getQuantity()))
                .collect(Collectors.toList());

        return new Order(
                entity.getId(),
                new Shop(entity.getShop().getId()),
                entity.getCustomerName(),
                entity.getCustomerContactNumber(),
                entity.getCustomerAge(),
                entity.getOrderDate(),
                entity.getTotalAmount(),
                items
        );
    }

    public static MedicineQuantity toEmbedded(OrderItem item) {
        return MedicineQuantity.builder()
                .medicineId(item.getMedicineId())
                .quantity(item.getQuantity())
                .build();
    }
    public static Order toOrderDomain(CreateOrderRequestDTO dto) {
        List<OrderItem> items = dto.getItems().stream()
                .map(item -> new OrderItem(item.getMedicineId(), item.getQuantity()))
                .toList();

        return new Order(
                new Shop(dto.getShopId()),
                dto.getCustomerName(),
                dto.getCustomerContactNumber(),
                dto.getCustomerAge(),
                new Date(),
                dto.getTotalAmount(),
                items
        );
    }
}
