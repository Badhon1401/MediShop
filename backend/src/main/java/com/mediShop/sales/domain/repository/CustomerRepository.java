// File: src/main/java/com/mediShop/sales/domain/repository/CustomerRepository.java
package com.mediShop.sales.domain.repository;

import com.mediShop.sales.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    
    Optional<Customer> findByContactNumber(String contactNumber);
    
    boolean existsByContactNumber(String contactNumber);
}