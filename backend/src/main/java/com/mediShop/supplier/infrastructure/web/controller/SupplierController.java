package com.mediShop.supplier.infrastructure.web.controller;

import com.mediShop.supplier.application.dto.*;
import com.mediShop.supplier.application.usecase.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    @Autowired
    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping
    public SupplierDto create(@RequestBody CreateSupplierRequest request) {
        return supplierService.createSupplier(request);
    }

    @PutMapping("/{id}")
    public SupplierDto update(@PathVariable Long id, @RequestBody UpdateSupplierRequest request) {
        return supplierService.updateSupplier(id, request);
    }

    @GetMapping("/{id}")
    public SupplierDto getById(@PathVariable Long id) {
        return supplierService.getSupplier(id);
    }

    @GetMapping
    public List<SupplierDto> getAll() {
        return supplierService.getAllSuppliers();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        supplierService.deleteSupplier(id);
    }
}
