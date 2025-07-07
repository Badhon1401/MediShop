package com.mediShop.supplier.application.usecase;

import com.mediShop.supplier.application.dto.*;

import java.util.List;

public interface SupplierService {
    SupplierDto createSupplier(CreateSupplierRequest request);
    SupplierDto updateSupplier(Long id, UpdateSupplierRequest request);
    SupplierDto getSupplier(Long id);
    List<SupplierDto> getAllSuppliers();
    void deleteSupplier(Long id);
}
