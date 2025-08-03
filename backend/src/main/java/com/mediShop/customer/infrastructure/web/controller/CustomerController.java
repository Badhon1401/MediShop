package com.mediShop.customer.infrastructure.web.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mediShop.customer.application.dto.AddCustomerRequest;
import com.mediShop.customer.application.dto.CustomerResponse;
import com.mediShop.customer.application.dto.SearchCustomerRequest;
import com.mediShop.customer.application.dto.UpdateCustomerRequest;
import com.mediShop.customer.application.usecase.AddCustomerUseCase;
import com.mediShop.customer.application.usecase.DeleteCustomerUseCase;
import com.mediShop.customer.application.usecase.GetCustomerUseCase;
import com.mediShop.customer.application.usecase.SearchCustomerUseCase;
import com.mediShop.customer.application.usecase.UpdateCustomerUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customers")
@Tag(name = "Customer Management", description = "APIs for managing customers")
@CrossOrigin(origins = "*")
public class CustomerController {
    
    @Autowired
    private AddCustomerUseCase addCustomerUseCase;
    
    @Autowired
    private UpdateCustomerUseCase updateCustomerUseCase;
    
    @Autowired
    private DeleteCustomerUseCase deleteCustomerUseCase;
    
    @Autowired
    private GetCustomerUseCase getCustomerUseCase;
    
    @Autowired
    private SearchCustomerUseCase searchCustomerUseCase;
    
    @PostMapping
    @Operation(summary = "Add new customer", description = "Creates a new customer record")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Customer created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "409", description = "Customer with contact number already exists")
    })
    public ResponseEntity<CustomerResponse> addCustomer(
            @Valid @RequestBody AddCustomerRequest request) {
        try {
            CustomerResponse response = addCustomerUseCase.execute(request);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    
    @PutMapping("/{customerId}")
    @Operation(summary = "Update customer", description = "Updates an existing customer")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Customer updated successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "404", description = "Customer not found"),
        @ApiResponse(responseCode = "409", description = "Contact number already exists for another customer")
    })
    public ResponseEntity<CustomerResponse> updateCustomer(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable Integer customerId,
            @Valid @RequestBody UpdateCustomerRequest request) {
        try {
            CustomerResponse response = updateCustomerUseCase.execute(customerId, request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            if (e.getMessage().contains("not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    
    @DeleteMapping("/{customerId}")
    @Operation(summary = "Delete customer", description = "Deletes a customer by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Customer deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Customer not found")
    })
    public ResponseEntity<Void> deleteCustomer(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable Integer customerId) {
        try {
            deleteCustomerUseCase.execute(customerId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/{customerId}")
    @Operation(summary = "Get customer by ID", description = "Retrieves a customer by their ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Customer found"),
        @ApiResponse(responseCode = "404", description = "Customer not found")
    })
    public ResponseEntity<CustomerResponse> getCustomer(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable Integer customerId) {
        try {
            CustomerResponse response = getCustomerUseCase.execute(customerId);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping
    @Operation(summary = "Get all customers", description = "Retrieves all customers")
    @ApiResponse(responseCode = "200", description = "Customers retrieved successfully")
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {
        List<CustomerResponse> response = getCustomerUseCase.executeGetAll();
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/search")
    @Operation(summary = "Search customers", description = "Search customers by various criteria")
    @ApiResponse(responseCode = "200", description = "Search completed successfully")
    public ResponseEntity<List<CustomerResponse>> searchCustomers(
            @RequestBody SearchCustomerRequest request) {
        List<CustomerResponse> response = searchCustomerUseCase.execute(request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search customers with query parameters", 
               description = "Search customers using query parameters")
    @ApiResponse(responseCode = "200", description = "Search completed successfully")
    public ResponseEntity<List<CustomerResponse>> searchCustomersWithParams(
            @Parameter(description = "Customer name (partial match)")
            @RequestParam(required = false) String name,
            @Parameter(description = "Contact number (exact match)")
            @RequestParam(required = false) String contactNumber,
            @Parameter(description = "Registration date from")
            @RequestParam(required = false) LocalDate registrationDateFrom,
            @Parameter(description = "Registration date to")
            @RequestParam(required = false) LocalDate registrationDateTo) {
        
        SearchCustomerRequest request = new SearchCustomerRequest(
            name, contactNumber, registrationDateFrom, registrationDateTo);
        
        List<CustomerResponse> response = searchCustomerUseCase.execute(request);
        return ResponseEntity.ok(response);
    }
}