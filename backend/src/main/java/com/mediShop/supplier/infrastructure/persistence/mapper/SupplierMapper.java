package com.mediShop.supplier.infrastructure.persistence.mapper;

import com.mediShop.supplier.domain.entity.Supplier;
import com.mediShop.supplier.domain.valueobject.ContactInfo;
import com.mediShop.supplier.domain.valueobject.SupplierId;
import com.mediShop.supplier.infrastructure.persistence.entity.SupplierEntity;
import org.springframework.stereotype.Component;

@Component
public class SupplierMapper {
    public Supplier toDomain(SupplierEntity entity) {
        return Supplier.builder()
                .supplierId(new SupplierId(entity.getSupplierId()))
                .name(entity.getName())
                .contactPerson(entity.getContactPerson())
                .contactInfo(new ContactInfo(entity.getEmail(), entity.getPhone()))
                .address(entity.getAddress())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public SupplierEntity toEntity(Supplier domain) {
        return SupplierEntity.builder()
                .supplierId(domain.getSupplierId() != null ? domain.getSupplierId().getId() : null)
                .name(domain.getName())
                .contactPerson(domain.getContactPerson())
                .email(domain.getContactInfo().getEmail())
                .phone(domain.getContactInfo().getPhone())
                .address(domain.getAddress())
                .status(domain.getStatus())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }
}
