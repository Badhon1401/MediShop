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
public class DeleteCustomerUseCase {
    
    @Autowired
    private CustomerRepository customerRepository;
    
    public void execute(Integer customerId) {
        if (!customerRepository.existsById(customerId)) {
            throw new IllegalArgumentException("Customer not found with ID: " + customerId);
        }
        
        customerRepository.deleteById(customerId);
    }
}