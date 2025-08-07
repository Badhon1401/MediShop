package com.mediShop.shop.infrastructure.persistence.entity;

import com.mediShop.user.infrastructure.persistence.entity.UserJpaEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(
        name = "shop_operators",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "role"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShopOperatorJpaEntity {


    @Id
    @GeneratedValue
    private UUID id;


    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private UserJpaEntity user;

    @ManyToMany(mappedBy = "shopOperatorList")
    private Set<ShopJpaEntity> shopList = new HashSet<>();



    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ShopOperatorJpaEntity that)) return false;
        return Objects.equals(
                this.user != null ? this.user.getId() : null,
                that.user != null ? that.user.getId() : null
        ) && role == that.role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(
                user != null ? user.getId() : null,
                role
        );
    }



    public ShopOperatorJpaEntity(UUID id) {
        this.id=id;
    }


}

