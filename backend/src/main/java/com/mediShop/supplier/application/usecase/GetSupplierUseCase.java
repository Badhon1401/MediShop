// GetSupplierUseCase.java
package com.mediShop.supplier.application.usecase;

import com.mediShop.supplier.application.dto.SupplierResponse;
import com.mediShop.supplier.application.exception.SupplierNotFoundException;
import com.mediShop.supplier.domain.entity.Supplier;
import com.mediShop.supplier.domain.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class GetSupplierUseCase {
    
    private final SupplierRepository supplierRepository;
    
    @Autowired
    public GetSupplierUseCase(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    
    public SupplierResponse findById(Integer supplierId) {
        Supplier supplier = supplierRepository.findById(supplierId)
            .orElseThrow(() -> new SupplierNotFoundException(supplierId));
        return SupplierResponse.from(supplier);
    }
    
    public List<SupplierResponse> findAll() {
        return supplierRepository.findAll().stream()
            .map(SupplierResponse::from)
            .collect(Collectors.toList());
    }
    
    public List<SupplierResponse> findAllActive() {
        return supplierRepository.findAllActive().stream()
            .map(SupplierResponse::from)
            .collect(Collectors.toList());
    }
    
    public List<SupplierResponse> findAllInactive() {
        return supplierRepository.findAllInactive().stream()
            .map(SupplierResponse::from)
            .collect(Collectors.toList());
    }
    
    public SupplierResponse findByEmail(String email) {
        Supplier supplier = supplierRepository.findByEmail(email)
            .orElseThrow(() -> new SupplierNotFoundException("email", email));
        return SupplierResponse.from(supplier);
    }
    
    public SupplierResponse findByCompanyName(String companyName) {
        Supplier supplier = supplierRepository.findByCompanyName(companyName)
            .orElseThrow(() -> new SupplierNotFoundException("company name", companyName));
        return SupplierResponse.from(supplier);
    }
}