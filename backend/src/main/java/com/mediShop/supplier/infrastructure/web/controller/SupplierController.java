// SupplierController.java
package com.mediShop.supplier.infrastructure.web.controller;

import com.mediShop.supplier.application.dto.*;
import com.mediShop.supplier.application.usecase.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/api/v1/suppliers")
@RequestMapping("/api/suppliers")
@Tag(name = "Supplier Management", description = "APIs for managing suppliers")
@CrossOrigin(origins = "*")
public class SupplierController {
    
    private final AddSupplierUseCase addSupplierUseCase;
    private final UpdateSupplierUseCase updateSupplierUseCase;
    private final GetSupplierUseCase getSupplierUseCase;
    private final SearchSupplierUseCase searchSupplierUseCase;
    private final DeleteSupplierUseCase deleteSupplierUseCase;
    
    @Autowired
    public SupplierController(
            AddSupplierUseCase addSupplierUseCase,
            UpdateSupplierUseCase updateSupplierUseCase,
            GetSupplierUseCase getSupplierUseCase,
            SearchSupplierUseCase searchSupplierUseCase,
            DeleteSupplierUseCase deleteSupplierUseCase) {
        this.addSupplierUseCase = addSupplierUseCase;
        this.updateSupplierUseCase = updateSupplierUseCase;
        this.getSupplierUseCase = getSupplierUseCase;
        this.searchSupplierUseCase = searchSupplierUseCase;
        this.deleteSupplierUseCase = deleteSupplierUseCase;
    }
    
    @PostMapping
    @Operation(summary = "Add a new supplier", description = "Creates a new supplier in the system")
    @ApiResponse(responseCode = "201", description = "Supplier created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input data")
    @ApiResponse(responseCode = "409", description = "Supplier already exists")
    public ResponseEntity<SupplierResponse> addSupplier(@Valid @RequestBody AddSupplierRequest request) {
        SupplierResponse response = addSupplierUseCase.execute(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update an existing supplier", description = "Updates supplier information")
    @ApiResponse(responseCode = "200", description = "Supplier updated successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input data")
    @ApiResponse(responseCode = "404", description = "Supplier not found")
    @ApiResponse(responseCode = "409", description = "Duplicate supplier data")
    public ResponseEntity<SupplierResponse> updateSupplier(
            @Parameter(description = "Supplier ID", required = true) @PathVariable("id") Integer supplierId,
            @Valid @RequestBody UpdateSupplierRequest request) {
        request.setSupplierId(supplierId);
        SupplierResponse response = updateSupplierUseCase.execute(request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get supplier by ID", description = "Retrieves a specific supplier by their ID")
    @ApiResponse(responseCode = "200", description = "Supplier found")
    @ApiResponse(responseCode = "404", description = "Supplier not found")
    public ResponseEntity<SupplierResponse> getSupplierById(
            @Parameter(description = "Supplier ID", required = true) @PathVariable("id") Integer supplierId) {
        SupplierResponse response = getSupplierUseCase.findById(supplierId);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/exists/{id}")
    @Operation(summary = "Check if supplier exists", description = "Checks if a supplier exists and is active - for microservice communication")
    @ApiResponse(responseCode = "200", description = "Supplier check completed")
    public ResponseEntity<Boolean> supplierExists(
            @Parameter(description = "Supplier ID", required = true) @PathVariable("id") Integer supplierId) {
        try {
            SupplierResponse supplier = getSupplierUseCase.findById(supplierId);
            return ResponseEntity.ok(supplier != null && supplier.getStatus());
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }
    
    @GetMapping
    @Operation(summary = "Get all suppliers", description = "Retrieves all suppliers in the system")
    @ApiResponse(responseCode = "200", description = "Suppliers retrieved successfully")
    public ResponseEntity<List<SupplierResponse>> getAllSuppliers() {
        List<SupplierResponse> response = getSupplierUseCase.findAll();
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/active")
    @Operation(summary = "Get all active suppliers", description = "Retrieves all active suppliers")
    @ApiResponse(responseCode = "200", description = "Active suppliers retrieved successfully")
    public ResponseEntity<List<SupplierResponse>> getActiveSuppliers() {
        List<SupplierResponse> response = getSupplierUseCase.findAllActive();
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/inactive")
    @Operation(summary = "Get all inactive suppliers", description = "Retrieves all inactive suppliers")
    @ApiResponse(responseCode = "200", description = "Inactive suppliers retrieved successfully")
    public ResponseEntity<List<SupplierResponse>> getInactiveSuppliers() {
        List<SupplierResponse> response = getSupplierUseCase.findAllInactive();
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/email/{email}")
    @Operation(summary = "Get supplier by email", description = "Retrieves a supplier by their email address")
    @ApiResponse(responseCode = "200", description = "Supplier found")
    @ApiResponse(responseCode = "404", description = "Supplier not found")
    public ResponseEntity<SupplierResponse> getSupplierByEmail(
            @Parameter(description = "Supplier email", required = true) @PathVariable("email") String email) {
        SupplierResponse response = getSupplierUseCase.findByEmail(email);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/company/{companyName}")
    @Operation(summary = "Get supplier by company name", description = "Retrieves a supplier by their company name")
    @ApiResponse(responseCode = "200", description = "Supplier found")
    @ApiResponse(responseCode = "404", description = "Supplier not found")
    public ResponseEntity<SupplierResponse> getSupplierByCompanyName(
            @Parameter(description = "Company name", required = true) @PathVariable("companyName") String companyName) {
        SupplierResponse response = getSupplierUseCase.findByCompanyName(companyName);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search suppliers", description = "Search suppliers by various criteria")
    @ApiResponse(responseCode = "200", description = "Search completed successfully")
    public ResponseEntity<List<SupplierResponse>> searchSuppliers(
            @Parameter(description = "Company name to search") @RequestParam(required = false) String companyName,
            @Parameter(description = "Email to search") @RequestParam(required = false) String email,
            @Parameter(description = "Phone number to search") @RequestParam(required = false) String phone,
            @Parameter(description = "Status filter") @RequestParam(required = false) Boolean status) {
        
        SearchSupplierRequest searchRequest = new SearchSupplierRequest(companyName, email, phone, status);
        List<SupplierResponse> response = searchSupplierUseCase.search(searchRequest);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a supplier", description = "Permanently deletes a supplier from the system")
    @ApiResponse(responseCode = "204", description = "Supplier deleted successfully")
    @ApiResponse(responseCode = "404", description = "Supplier not found")
    public ResponseEntity<Void> deleteSupplier(
            @Parameter(description = "Supplier ID", required = true) @PathVariable("id") Integer supplierId) {
        deleteSupplierUseCase.execute(supplierId);
        return ResponseEntity.noContent().build();
    }
    
    @PatchMapping("/{id}/activate")
    @Operation(summary = "Activate a supplier", description = "Sets supplier status to active")
    @ApiResponse(responseCode = "200", description = "Supplier activated successfully")
    @ApiResponse(responseCode = "404", description = "Supplier not found")
    public ResponseEntity<SupplierResponse> activateSupplier(
            @Parameter(description = "Supplier ID", required = true) @PathVariable("id") Integer supplierId) {
        SupplierResponse currentSupplier = getSupplierUseCase.findById(supplierId);
        
        UpdateSupplierRequest request = new UpdateSupplierRequest();
        request.setSupplierId(supplierId);
        request.setCompanyName(currentSupplier.getCompanyName());
        request.setEmail(currentSupplier.getEmail());
        request.setPhone(currentSupplier.getPhone());
        request.setStatus(true);
        
        SupplierResponse response = updateSupplierUseCase.execute(request);
        return ResponseEntity.ok(response);
    }
    
    @PatchMapping("/{id}/deactivate")
    @Operation(summary = "Deactivate a supplier", description = "Sets supplier status to inactive")
    @ApiResponse(responseCode = "200", description = "Supplier deactivated successfully")
    @ApiResponse(responseCode = "404", description = "Supplier not found")
    public ResponseEntity<SupplierResponse> deactivateSupplier(
            @Parameter(description = "Supplier ID", required = true) @PathVariable("id") Integer supplierId) {
        SupplierResponse currentSupplier = getSupplierUseCase.findById(supplierId);
        
        UpdateSupplierRequest request = new UpdateSupplierRequest();
        request.setSupplierId(supplierId);
        request.setCompanyName(currentSupplier.getCompanyName());
        request.setEmail(currentSupplier.getEmail());
        request.setPhone(currentSupplier.getPhone());
        request.setStatus(false);
        
        SupplierResponse response = updateSupplierUseCase.execute(request);
        return ResponseEntity.ok(response);
    }
}