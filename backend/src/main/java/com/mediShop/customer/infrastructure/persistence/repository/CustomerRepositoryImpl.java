package com.mediShop.customer.infrastructure.persistence.repository;

import com.mediShop.customer.domain.entity.Customer;
import com.mediShop.customer.domain.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public class CustomerRepositoryImpl implements CustomerRepository {
    
    @Autowired
    private CustomerJpaRepository customerJpaRepository;
    
    @Override
    public Customer save(Customer customer) {
        return customerJpaRepository.save(customer);
    }
    
    @Override
    public Optional<Customer> findById(Integer customerId) {
        return customerJpaRepository.findById(customerId);
    }
    
    @Override
    public List<Customer> findAll() {
        return customerJpaRepository.findAll();
    }
    
    @Override
    public Optional<Customer> findByContactNumber(String contactNumber) {
        return customerJpaRepository.findByContactNumber(contactNumber);
    }
    
    @Override
    public List<Customer> findByName(String name) {
        return customerJpaRepository.findByName(name);
    }
    
    @Override
    public List<Customer> findByNameContainingIgnoreCase(String name) {
        return customerJpaRepository.findByNameContainingIgnoreCase(name);
    }
    
    @Override
    public List<Customer> findByRegistrationDateBetween(LocalDate startDate, LocalDate endDate) {
        return customerJpaRepository.findByRegistrationDateBetween(startDate, endDate);
    }
    
    @Override
    public List<Customer> findByRegistrationDate(LocalDate registrationDate) {
        return customerJpaRepository.findByRegistrationDate(registrationDate);
    }
    
    @Override
    public boolean existsByContactNumber(String contactNumber) {
        return customerJpaRepository.existsByContactNumber(contactNumber);
    }
    
    @Override
    public boolean existsById(Integer customerId) {
        return customerJpaRepository.existsById(customerId);
    }
    
    @Override
    public void deleteById(Integer customerId) {
        customerJpaRepository.deleteById(customerId);
    }
    
    @Override
    public void delete(Customer customer) {
        customerJpaRepository.delete(customer);
    }
    
    @Override
    public long count() {
        return customerJpaRepository.count();
    }
    
    @Override
    public List<Customer> findCustomersRegisteredAfter(LocalDate date) {
        return customerJpaRepository.findCustomersRegisteredAfter(date);
    }
    
    @Override
    public List<Customer> findCustomersWithContactNumber() {
        return customerJpaRepository.findCustomersWithContactNumber();
    }
}