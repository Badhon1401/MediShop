package com.mediShop.order.infrastructure.persistence.repository;

import com.mediShop.order.domain.entity.Order;
import com.mediShop.order.domain.repository.OrderRepository;
import com.mediShop.order.infrastructure.persistence.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class OrderRepositoryImpl implements OrderRepository {

    @Autowired
    private final OrderJpaRepository repository;

    @Autowired
    public OrderRepositoryImpl(OrderJpaRepository repository){
        this.repository=repository;
    }

    @Override
    public Order save(Order order) {
        return OrderMapper.orderJpaToOrderDomain(repository.save(OrderMapper.toOrderJpaEntity(order)));
    }

    @Override
    public Order findById(UUID orderId) {
        return null;
    }

    @Override
    public void delete(Order order) {

    }

    @Override
    public Set<Order> findByShopId(UUID id) {
        return repository.findByShopId(id).stream()
                .map(OrderMapper::orderJpaToOrderDomain)
                .collect(Collectors.toSet());
    }
}
