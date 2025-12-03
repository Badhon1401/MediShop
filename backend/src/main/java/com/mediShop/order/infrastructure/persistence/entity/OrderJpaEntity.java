package com.mediShop.order.infrastructure.persistence.entity;

import com.mediShop.shop.infrastructure.persistence.entity.ShopJpaEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderJpaEntity {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "shop_id", nullable = false)
    private ShopJpaEntity shop;

    @ElementCollection
    @CollectionTable(name = "order_medicines", joinColumns = @JoinColumn(name = "order_id"))
    private List<MedicineQuantity> items;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerContactNumber;

    private String customerAge;

    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    @Column(precision = 10, scale = 2)
    private BigDecimal totalAmount;
}
