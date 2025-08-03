package com.mediShop.customer.application.usecase;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mediShop.customer.application.dto.AddCustomerRequest;
import com.mediShop.customer.application.dto.CustomerResponse;
import com.mediShop.customer.domain.entity.Customer;
import com.mediShop.customer.domain.repository.CustomerRepository;

@Service
public class AddCustomerUseCase {
    
    @Autowired
    private CustomerRepository customerRepository;
    
    public CustomerResponse execute(AddCustomerRequest request) {
        // Check if contact number already exists
        if (request.getContactNumber() != null && 
            customerRepository.existsByContactNumber(request.getContactNumber())) {
            throw new IllegalArgumentException("Customer with this contact number already exists");
        }
        
        // Set registration date to today if not provided
        LocalDate registrationDate = request.getRegistrationDate() != null ? 
            request.getRegistrationDate() : LocalDate.now();
        
        Customer customer = new Customer(
            request.getName(),
            request.getContactNumber(),
            registrationDate
        );
        
        Customer savedCustomer = customerRepository.save(customer);
        
        return new CustomerResponse(
            savedCustomer.getCustomerId(),
            savedCustomer.getName(),
            savedCustomer.getContactNumber(),
            savedCustomer.getRegistrationDate()
        );
    }
}




