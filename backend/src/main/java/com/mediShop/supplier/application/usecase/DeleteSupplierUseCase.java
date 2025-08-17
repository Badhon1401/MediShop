// DeleteSupplierUseCase.java
package com.mediShop.supplier.application.usecase;

import com.mediShop.supplier.application.exception.SupplierNotFoundException;
import com.mediShop.supplier.domain.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DeleteSupplierUseCase {
    
    private final SupplierRepository supplierRepository;
    
    @Autowired
    public DeleteSupplierUseCase(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    
    public void execute(Integer supplierId) {
        if (!supplierRepository.findById(supplierId).isPresent()) {
            throw new SupplierNotFoundException(supplierId);
        }
        
        supplierRepository.deleteById(supplierId);
    }
}