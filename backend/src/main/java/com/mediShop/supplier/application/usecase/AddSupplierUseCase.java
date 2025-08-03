// AddSupplierUseCase.java
package com.mediShop.supplier.application.usecase;

import com.mediShop.supplier.application.dto.AddSupplierRequest;
import com.mediShop.supplier.application.dto.SupplierResponse;
import com.mediShop.supplier.application.exception.DuplicateSupplierException;
import com.mediShop.supplier.domain.entity.Supplier;
import com.mediShop.supplier.domain.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AddSupplierUseCase {
    
    private final SupplierRepository supplierRepository;
    
    @Autowired
    public AddSupplierUseCase(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    
    public SupplierResponse execute(AddSupplierRequest request) {
        // Check for duplicates
        if (supplierRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateSupplierException("email", request.getEmail());
        }
        
        if (supplierRepository.existsByCompanyName(request.getCompanyName())) {
            throw new DuplicateSupplierException("company name", request.getCompanyName());
        }
        
        if (supplierRepository.existsByPhone(request.getPhone())) {
            throw new DuplicateSupplierException("phone", request.getPhone());
        }
        
        // Create new supplier
        Supplier supplier = new Supplier(
            request.getCompanyName(),
            request.getEmail(),
            request.getPhone()
        );
        
        // Save and return response
        Supplier savedSupplier = supplierRepository.save(supplier);
        return SupplierResponse.from(savedSupplier);
    }
}







