// SearchSupplierUseCase.java
package com.mediShop.supplier.application.usecase;

import com.mediShop.supplier.application.dto.SearchSupplierRequest;
import com.mediShop.supplier.application.dto.SupplierResponse;
import com.mediShop.supplier.domain.entity.Supplier;
import com.mediShop.supplier.domain.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class SearchSupplierUseCase {
    
    private final SupplierRepository supplierRepository;
    
    @Autowired
    public SearchSupplierUseCase(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    
    public List<SupplierResponse> searchByCompanyName(String companyName) {
        return supplierRepository.findByCompanyNameContainingIgnoreCase(companyName).stream()
            .map(SupplierResponse::from)
            .collect(Collectors.toList());
    }
    
    public List<SupplierResponse> searchByEmail(String email) {
        return supplierRepository.findByEmailContainingIgnoreCase(email).stream()
            .map(SupplierResponse::from)
            .collect(Collectors.toList());
    }
    
    public List<SupplierResponse> searchByPhone(String phone) {
        return supplierRepository.findByPhoneContaining(phone).stream()
            .map(SupplierResponse::from)
            .collect(Collectors.toList());
    }
    
    public List<SupplierResponse> search(SearchSupplierRequest request) {
        List<Supplier> suppliers;
        
        if (request.getCompanyName() != null && !request.getCompanyName().trim().isEmpty()) {
            suppliers = supplierRepository.findByCompanyNameContainingIgnoreCase(request.getCompanyName());
        } else if (request.getEmail() != null && !request.getEmail().trim().isEmpty()) {
            suppliers = supplierRepository.findByEmailContainingIgnoreCase(request.getEmail());
        } else if (request.getPhone() != null && !request.getPhone().trim().isEmpty()) {
            suppliers = supplierRepository.findByPhoneContaining(request.getPhone());
        } else if (request.getStatus() != null) {
            suppliers = request.getStatus() ? supplierRepository.findAllActive() : supplierRepository.findAllInactive();
        } else {
            suppliers = supplierRepository.findAll();
        }
        
        return suppliers.stream()
            .map(SupplierResponse::from)
            .collect(Collectors.toList());
    }
}