// File: src/main/java/com/mediShop/sales/application/usecase/GetCustomerUseCase.java
package com.mediShop.sales.application.usecase;

import com.mediShop.sales.application.dto.CustomerDTO;
import com.mediShop.sales.application.exception.CustomerNotFoundException;
import com.mediShop.sales.domain.entity.Customer;
import com.mediShop.sales.domain.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetCustomerUseCase {
    
    private final CustomerRepository customerRepository;
    
    public List<CustomerDTO> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return customers.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public CustomerDTO getCustomerById(Integer customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with ID: " + customerId));
        return convertToDTO(customer);
    }
    
    public CustomerDTO getCustomerByPhoneNumber(String phoneNumber) {
        Customer customer = customerRepository.findByContactNumber(phoneNumber)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with phone number: " + phoneNumber));
        return convertToDTO(customer);
    }
    
    private CustomerDTO convertToDTO(Customer customer) {
        return new CustomerDTO(
            customer.getCustomerId(),
            customer.getName(),
            customer.getContactNumber(),
            customer.getRegistrationDate()
        );
    }
}