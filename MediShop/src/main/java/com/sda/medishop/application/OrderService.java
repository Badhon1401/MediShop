package com.sda.medishop.application;

import com.sda.medishop.application.interfaces.OrderRepository;
import com.sda.medishop.domain.Order;

import java.util.List;
import java.util.UUID;

public class OrderService {
    private final OrderRepository orderRepository;


    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order placeOrder(Order order){
        orderRepository.save(order);
        return order;
    }
    public Order updateOrder(UUID orderId, Order updatedOrder){

    }
    public void deleteOrder(UUID orderId){
        Order order=orderRepository.findById(orderId);
        if(order==null){
            return;
        }
        orderRepository.delete(order);
        return ;
    }
    public Order getOrderDetails(UUID orderId){
        Order order=orderRepository.findById(orderId);
        return order;
    }

    public List<Order> getPreviousOrdersDetails(UUID shopId){
        Order order=orderRepository.findById(orderId);
        return order;
    }


}
