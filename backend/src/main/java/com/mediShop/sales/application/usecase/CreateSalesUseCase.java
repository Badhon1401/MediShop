// File: src/main/java/com/mediShop/sales/application/usecase/CreateSalesUseCase.java
package com.mediShop.sales.application.usecase;

import com.mediShop.sales.application.dto.SalesRequestDTO;
import com.mediShop.sales.application.dto.SalesResponseDTO;
import com.mediShop.sales.application.exception.InsufficientStockException;
import com.mediShop.sales.domain.entity.Customer;
import com.mediShop.sales.domain.entity.Sales;
import com.mediShop.sales.domain.repository.CustomerRepository;
import com.mediShop.sales.domain.repository.SalesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreateSalesUseCase {
    
    private final SalesRepository salesRepository;
    private final CustomerRepository customerRepository;
    
    @Transactional
    public SalesResponseDTO execute(SalesRequestDTO request) {
        // Generate new sales ID
        Integer salesId = generateNewSalesId();
        
        // Handle customer registration/retrieval
        Customer customer = handleCustomer(request.getCustomerName(), request.getCustomerPhoneNumber());
        
        // Calculate total transaction amount
        Double totalTransactionAmount = calculateTotalAmount(request.getItems());
        
        // Create sales records
        List<Sales> salesRecords = new ArrayList<>();
        List<SalesResponseDTO.SalesItemResponseDTO> itemResponses = new ArrayList<>();
        
        for (SalesRequestDTO.SalesItemDTO item : request.getItems()) {
            // Validate stock availability (this would typically call inventory service)
            validateStockAvailability(item.getMedicineName(), item.getQuantity());
            
            Double itemTotalAmount = item.getQuantity() * item.getUnitPrice();
            
            Sales sales = new Sales();
            sales.setSalesId(salesId);
            sales.setCustomerPhoneNumber(request.getCustomerPhoneNumber());
            sales.setSalesDate(LocalDate.now());
            sales.setMedicineName(item.getMedicineName());
            sales.setMedicineUnitPrice(item.getUnitPrice());
            sales.setPerMedicineTotalQuantity(item.getQuantity());
            sales.setPerMedicineTotalAmount(itemTotalAmount);
            sales.setTotalPricePerCustomerTransaction(totalTransactionAmount);
            
            Sales savedSales = salesRepository.save(sales);
            salesRecords.add(savedSales);
            
            // Update inventory (this would typically call inventory service)
            updateInventoryStock(item.getMedicineName(), item.getQuantity());
            
            itemResponses.add(new SalesResponseDTO.SalesItemResponseDTO(
                savedSales.getItemsId(),
                item.getMedicineName(),
                item.getUnitPrice(),
                item.getQuantity(),
                itemTotalAmount
            ));
        }
        
        return new SalesResponseDTO(
            salesId,
            customer.getName(),
            customer.getContactNumber(),
            LocalDate.now(),
            itemResponses,
            totalTransactionAmount
        );
    }
    
    private Integer generateNewSalesId() {
        Optional<Integer> maxSalesId = salesRepository.findMaxSalesId();
        return maxSalesId.orElse(0) + 1;
    }
    
    private Customer handleCustomer(String customerName, String customerPhoneNumber) {
        Optional<Customer> existingCustomer = customerRepository.findByContactNumber(customerPhoneNumber);
        
        if (existingCustomer.isPresent()) {
            return existingCustomer.get();
        } else {
            Customer newCustomer = new Customer();
            newCustomer.setName(customerName);
            newCustomer.setContactNumber(customerPhoneNumber);
            newCustomer.setRegistrationDate(LocalDate.now());
            return customerRepository.save(newCustomer);
        }
    }
    
    private Double calculateTotalAmount(List<SalesRequestDTO.SalesItemDTO> items) {
        return items.stream()
                .mapToDouble(item -> item.getQuantity() * item.getUnitPrice())
                .sum();
    }
    
    private void validateStockAvailability(String medicineName, Integer requestedQuantity) {
        // This would typically call the inventory service to check availability
        // For now, we'll assume stock is available
        // In a real implementation, this would throw InsufficientStockException if stock is insufficient
    }
    
    private void updateInventoryStock(String medicineName, Integer soldQuantity) {
        // This would typically call the inventory service to update stock
        // For now, we'll assume the update is successful
    }
}
