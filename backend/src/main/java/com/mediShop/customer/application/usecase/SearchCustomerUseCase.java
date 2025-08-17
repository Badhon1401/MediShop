package com.mediShop.customer.application.usecase;

// import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mediShop.customer.application.dto.SearchCustomerRequest;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
// import com.mediShop.customer.application.dto.*;
import com.mediShop.customer.application.dto.CustomerResponse;
import com.mediShop.customer.domain.entity.Customer;
import com.mediShop.customer.domain.repository.CustomerRepository;

@Service
public class SearchCustomerUseCase {

    @Autowired
    private CustomerRepository customerRepository;
    
    public List<CustomerResponse> execute(SearchCustomerRequest request) {
        List<Customer> customers;
        
        // If all search criteria are empty, return all customers
        if (isEmptySearchRequest(request)) {
            customers = customerRepository.findAll();
        } else {
            // Search by contact number first (most specific)
            if (request.getContactNumber() != null && !request.getContactNumber().trim().isEmpty()) {
                Optional<Customer> customer = customerRepository.findByContactNumber(request.getContactNumber());
                customers = customer.map(List::of).orElse(List.of());
            }
            // Search by name (partial match)
            else if (request.getName() != null && !request.getName().trim().isEmpty()) {
                customers = customerRepository.findByNameContainingIgnoreCase(request.getName().trim());
            }
            // Search by date range
            else if (request.getRegistrationDateFrom() != null && request.getRegistrationDateTo() != null) {
                customers = customerRepository.findByRegistrationDateBetween(
                    request.getRegistrationDateFrom(), request.getRegistrationDateTo());
            }
            // Search by single date
            else if (request.getRegistrationDateFrom() != null) {
                customers = customerRepository.findByRegistrationDate(request.getRegistrationDateFrom());
            }
            else {
                customers = customerRepository.findAll();
            }
        }
        
        return customers.stream()
            .map(customer -> new CustomerResponse(
                customer.getCustomerId(),
                customer.getName(),
                customer.getContactNumber(),
                customer.getRegistrationDate()
            ))
            .collect(Collectors.toList());
    }
    
    private boolean isEmptySearchRequest(SearchCustomerRequest request) {
        return (request.getName() == null || request.getName().trim().isEmpty()) &&
               (request.getContactNumber() == null || request.getContactNumber().trim().isEmpty()) &&
               request.getRegistrationDateFrom() == null &&
               request.getRegistrationDateTo() == null;
    }
}