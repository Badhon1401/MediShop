package com.mediShop.customer.domain.repository;

import com.mediShop.customer.domain.entity.Customer;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CustomerRepository {
    
    Customer save(Customer customer);
    
    Optional<Customer> findById(Integer customerId);
    
    List<Customer> findAll();
    
    Optional<Customer> findByContactNumber(String contactNumber);
    
    List<Customer> findByName(String name);
    
    List<Customer> findByNameContainingIgnoreCase(String name);
    
    List<Customer> findByRegistrationDateBetween(LocalDate startDate, LocalDate endDate);
    
    List<Customer> findByRegistrationDate(LocalDate registrationDate);
    
    boolean existsByContactNumber(String contactNumber);
    
    boolean existsById(Integer customerId);
    
    void deleteById(Integer customerId);
    
    void delete(Customer customer);
    
    long count();
    
    List<Customer> findCustomersRegisteredAfter(LocalDate date);
    
    List<Customer> findCustomersWithContactNumber();
}