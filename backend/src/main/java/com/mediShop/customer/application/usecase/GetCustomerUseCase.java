package com.mediShop.customer.application.usecase;

import com.mediShop.customer.application.dto.*;
import com.mediShop.customer.domain.entity.Customer;
import com.mediShop.customer.domain.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GetCustomerUseCase {
    
    @Autowired
    private CustomerRepository customerRepository;
    
    public CustomerResponse execute(Integer customerId) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new IllegalArgumentException("Customer not found with ID: " + customerId));
        
        return new CustomerResponse(
            customer.getCustomerId(),
            customer.getName(),
            customer.getContactNumber(),
            customer.getRegistrationDate()
        );
    }
    
    public List<CustomerResponse> executeGetAll() {
        List<Customer> customers = customerRepository.findAll();
        
        return customers.stream()
            .map(customer -> new CustomerResponse(
                customer.getCustomerId(),
                customer.getName(),
                customer.getContactNumber(),
                customer.getRegistrationDate()
            ))
            .collect(Collectors.toList());
    }
}