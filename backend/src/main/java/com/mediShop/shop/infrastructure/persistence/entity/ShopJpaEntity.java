package com.mediShop.shop.infrastructure.persistence.entity;

import com.mediShop.medicine.infrastructure.persistence.entity.MedicineJpaEntity;
import com.mediShop.user.infrastructure.persistence.entity.UserJpaEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "shops")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShopJpaEntity {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    private String location;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private UserJpaEntity owner;

    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MedicineJpaEntity> medicineList = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "shop_operator_shops",
            joinColumns = @JoinColumn(name = "shop_id"),
            inverseJoinColumns = @JoinColumn(name = "operator_id")
    )
    private Set<ShopOperatorJpaEntity> shopOperatorList = new HashSet<>();

    public ShopJpaEntity(UUID id) {
        this.id = id;
    }


}
