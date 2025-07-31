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
public class UpdateCustomerUseCase {

    @Autowired
    private CustomerRepository customerRepository;
    
    public CustomerResponse execute(Integer customerId, UpdateCustomerRequest request) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new IllegalArgumentException("Customer not found with ID: " + customerId));
        
        // Check if contact number already exists for another customer
        if (request.getContactNumber() != null && 
            !request.getContactNumber().equals(customer.getContactNumber()) &&
            customerRepository.existsByContactNumber(request.getContactNumber())) {
            throw new IllegalArgumentException("Another customer with this contact number already exists");
        }
        
        customer.setName(request.getName());
        customer.setContactNumber(request.getContactNumber());
        customer.setRegistrationDate(request.getRegistrationDate());
        
        Customer updatedCustomer = customerRepository.save(customer);
        
        return new CustomerResponse(
            updatedCustomer.getCustomerId(),
            updatedCustomer.getName(),
            updatedCustomer.getContactNumber(),
            updatedCustomer.getRegistrationDate()
        );
    }
}