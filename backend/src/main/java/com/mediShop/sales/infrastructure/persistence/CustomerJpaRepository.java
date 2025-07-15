// File: src/main/java/com/mediShop/sales/infrastructure/persistence/CustomerJpaRepository.java
package com.mediShop.sales.infrastructure.persistence;

import com.mediShop.sales.domain.entity.Customer;
import com.mediShop.sales.domain.repository.CustomerRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CustomerJpaRepository extends JpaRepository<Customer, Integer>, CustomerRepository {
    
    @Override
    @Query("SELECT c FROM Customer c WHERE c.contactNumber = :contactNumber")
    Optional<Customer> findByContactNumber(@Param("contactNumber") String contactNumber);
    
    @Override
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM Customer c WHERE c.contactNumber = :contactNumber")
    boolean existsByContactNumber(@Param("contactNumber") String contactNumber);
}
