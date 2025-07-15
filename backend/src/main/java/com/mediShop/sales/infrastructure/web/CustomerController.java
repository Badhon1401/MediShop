// File: src/main/java/com/mediShop/sales/infrastructure/web/CustomerController.java
package com.mediShop.sales.infrastructure.web;

import com.mediShop.sales.application.dto.CustomerDTO;
import com.mediShop.sales.application.usecase.GetCustomerUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CustomerController {
    
    private final GetCustomerUseCase getCustomerUseCase;
    
    @GetMapping
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        List<CustomerDTO> customers = getCustomerUseCase.getAllCustomers();
        return ResponseEntity.ok(customers);
    }
    
    @GetMapping("/{customerId}")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable Integer customerId) {
        CustomerDTO customer = getCustomerUseCase.getCustomerById(customerId);
        return ResponseEntity.ok(customer);
    }
    
    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<CustomerDTO> getCustomerByPhoneNumber(@PathVariable String phoneNumber) {
        CustomerDTO customer = getCustomerUseCase.getCustomerByPhoneNumber(phoneNumber);
        return ResponseEntity.ok(customer);
    }
}
