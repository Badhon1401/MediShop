// UpdateSupplierUseCase.java
package com.mediShop.supplier.application.usecase;

import com.mediShop.supplier.application.dto.UpdateSupplierRequest;
import com.mediShop.supplier.application.dto.SupplierResponse;
import com.mediShop.supplier.application.exception.DuplicateSupplierException;
import com.mediShop.supplier.application.exception.SupplierNotFoundException;
import com.mediShop.supplier.domain.entity.Supplier;
import com.mediShop.supplier.domain.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UpdateSupplierUseCase {
    
    private final SupplierRepository supplierRepository;
    
    @Autowired
    public UpdateSupplierUseCase(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    
    public SupplierResponse execute(UpdateSupplierRequest request) {
        // Find existing supplier
        Supplier existingSupplier = supplierRepository.findById(request.getSupplierId())
            .orElseThrow(() -> new SupplierNotFoundException(request.getSupplierId()));
        
        // Check for duplicates (excluding current supplier)
        if (!existingSupplier.getEmail().equals(request.getEmail()) && 
            supplierRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateSupplierException("email", request.getEmail());
        }
        
        if (!existingSupplier.getCompanyName().equals(request.getCompanyName()) && 
            supplierRepository.existsByCompanyName(request.getCompanyName())) {
            throw new DuplicateSupplierException("company name", request.getCompanyName());
        }
        
        if (!existingSupplier.getPhone().equals(request.getPhone()) && 
            supplierRepository.existsByPhone(request.getPhone())) {
            throw new DuplicateSupplierException("phone", request.getPhone());
        }
        
        // Update supplier
        existingSupplier.setCompanyName(request.getCompanyName());
        existingSupplier.setEmail(request.getEmail());
        existingSupplier.setPhone(request.getPhone());
        
        if (request.getStatus() != null) {
            existingSupplier.setStatus(request.getStatus());
        }
        
        // Save and return response
        Supplier updatedSupplier = supplierRepository.save(existingSupplier);
        return SupplierResponse.from(updatedSupplier);
    }
}