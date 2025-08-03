// package com.mediShop.customer.infrastructure.persistence.mapper;

// import com.mediShop.customer.application.dto.CustomerResponse;
// import com.mediShop.customer.application.dto.AddCustomerRequest;
// import com.mediShop.customer.application.dto.UpdateCustomerRequest;
// import com.mediShop.customer.domain.entity.Customer;
// import org.springframework.stereotype.Component;
// import java.time.LocalDate;
// import java.util.List;
// import java.util.stream.Collectors;

// @Component
// public class CustomerMapper {
    
//     public Customer toEntity(AddCustomerRequest request) {
//         if (request == null) {
//             return null;
//         }
        
//         LocalDate registrationDate = request.getRegistrationDate() != null ? 
//             request.getRegistrationDate() : LocalDate.now();
        
//         return new Customer(
//             request.getName(),
//             request.getContactNumber(),
//             registrationDate
//         );
//     }
    
//     public Customer toEntity(UpdateCustomerRequest request) {
//         if (request == null) {
//             return null;
//         }
        
//         return new Customer(
//             request.getName(),
//             request.getContactNumber(),
//             request.getRegistrationDate()
//         );
//     }
    
//     public CustomerResponse toResponse(Customer customer) {
//         if (customer == null) {
//             return null;
//         }
        
//         return new CustomerResponse(
//             customer.getCustomerId(),
//             customer.getName(),
//             customer.getContactNumber(),
//             customer.getRegistrationDate()
//         );
//     }
    
//     public List<CustomerResponse> toResponseList(List<Customer> customers) {
//         if (customers == null) {
//             return null;
//         }
        
//         return customers.stream()
//             .map(this::toResponse)
//             .collect(Collectors.toList());
//     }
    
//     public void updateEntityFromRequest(Customer customer, UpdateCustomerRequest request) {
//         if (customer == null || request == null) {
//             return;
//         }
        
//         customer.setName(request.getName());
//         customer.setContactNumber(request.getContactNumber());
//         customer.setRegistrationDate(request.getRegistrationDate());
//     }
// }