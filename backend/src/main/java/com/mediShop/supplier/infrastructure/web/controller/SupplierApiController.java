package com.mediShop.supplier.infrastructure.web.controller;

import com.mediShop.supplier.application.dto.SupplierResponse;
import com.mediShop.supplier.application.usecase.GetSupplierUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
public class SupplierApiController {

    private final GetSupplierUseCase getSupplierUseCase;

    @GetMapping("/{supplierId}")
    public ResponseEntity<SupplierResponse> getSupplierById(@PathVariable Integer supplierId) {
        return ResponseEntity.ok(getSupplierUseCase.findById(supplierId));
    }

    @GetMapping("/exists/{supplierId}")
    public ResponseEntity<Boolean> supplierExists(@PathVariable Integer supplierId) {
        try {
            getSupplierUseCase.findById(supplierId);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }
}