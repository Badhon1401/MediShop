package com.mediShop.supplier.application.usecase;

import com.mediShop.supplier.application.dto.*;
import com.mediShop.supplier.domain.entity.Supplier;
import com.mediShop.supplier.domain.exception.SupplierAlreadyExistsException;
import com.mediShop.supplier.domain.exception.SupplierNotFoundException;
import com.mediShop.supplier.domain.repository.SupplierRepository;
import com.mediShop.supplier.domain.valueobject.ContactInfo;
import com.mediShop.supplier.domain.valueobject.SupplierId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    @Autowired
    public SupplierServiceImpl(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Override
    public SupplierDto createSupplier(CreateSupplierRequest request) {
        // Check if supplier already exists
        Optional<Supplier> existingSupplier = supplierRepository.findByName(request.getName());
        if (existingSupplier.isPresent()) {
            throw new SupplierAlreadyExistsException("Supplier with name '" + request.getName() + "' already exists");
        }

        // Create new supplier without supplierId (will be auto-generated)
        Supplier supplier = Supplier.builder()
                .supplierId(null) // Explicitly set to null for new entities
                .name(request.getName())
                .contactPerson(request.getContactPerson())
                .contactInfo(new ContactInfo(request.getEmail(), request.getPhone()))
                .address(request.getAddress())
                .status("ACTIVE")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Supplier savedSupplier = supplierRepository.save(supplier);
        return mapToDto(savedSupplier);
    }

    @Override
    public SupplierDto updateSupplier(Long id, UpdateSupplierRequest request) {
        Supplier supplier = supplierRepository.findById(new SupplierId(id))
                .orElseThrow(() -> new SupplierNotFoundException("Supplier with ID " + id + " not found"));

        // Update supplier fields
        supplier.setName(request.getName() != null ? request.getName() : supplier.getName());
        supplier.setContactPerson(request.getContactPerson() != null ? request.getContactPerson() : supplier.getContactPerson());

        if (request.getEmail() != null || request.getPhone() != null) {
            String email = request.getEmail() != null ? request.getEmail() : supplier.getContactInfo().getEmail();
            String phone = request.getPhone() != null ? request.getPhone() : supplier.getContactInfo().getPhone();
            supplier.setContactInfo(new ContactInfo(email, phone));
        }

        supplier.setAddress(request.getAddress() != null ? request.getAddress() : supplier.getAddress());
        supplier.setStatus(request.getStatus() != null ? request.getStatus() : supplier.getStatus());
        supplier.setUpdatedAt(LocalDateTime.now());

        Supplier updatedSupplier = supplierRepository.save(supplier);
        return mapToDto(updatedSupplier);
    }

    @Override
    @Transactional(readOnly = true)
    public SupplierDto getSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(new SupplierId(id))
                .orElseThrow(() -> new SupplierNotFoundException("Supplier with ID " + id + " not found"));
        return mapToDto(supplier);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SupplierDto> getAllSuppliers() {
        List<Supplier> suppliers = supplierRepository.findAll();
        return suppliers.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(new SupplierId(id))
                .orElseThrow(() -> new SupplierNotFoundException("Supplier with ID " + id + " not found"));

        supplierRepository.delete(supplier);
    }

    private SupplierDto mapToDto(Supplier supplier) {
        return SupplierDto.builder()
                .id(supplier.getSupplierId() != null ? supplier.getSupplierId().getId() : null)
                .name(supplier.getName())
                .contactPerson(supplier.getContactPerson())
                .email(supplier.getContactInfo().getEmail())
                .phone(supplier.getContactInfo().getPhone())
                .address(supplier.getAddress())
                .status(supplier.getStatus())
                .createdAt(supplier.getCreatedAt())
                .updatedAt(supplier.getUpdatedAt())
                .build();
    }
}
