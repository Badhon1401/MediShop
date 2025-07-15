// File: src/main/java/com/mediShop/sales/application/usecase/GetSalesUseCase.java
package com.mediShop.sales.application.usecase;

import com.mediShop.sales.application.dto.SalesResponseDTO;
import com.mediShop.sales.domain.entity.Customer;
import com.mediShop.sales.domain.entity.Sales;
import com.mediShop.sales.domain.repository.CustomerRepository;
import com.mediShop.sales.domain.repository.SalesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetSalesUseCase {
    
    private final SalesRepository salesRepository;
    private final CustomerRepository customerRepository;
    
    public List<SalesResponseDTO> getAllSales() {
        List<Sales> allSales = salesRepository.findAll();
        return groupAndConvertToDTO(allSales);
    }
    
    public List<SalesResponseDTO> getSalesBySalesId(Integer salesId) {
        List<Sales> sales = salesRepository.findBySalesId(salesId);
        return groupAndConvertToDTO(sales);
    }
    
    public List<SalesResponseDTO> getSalesByCustomerPhone(String customerPhoneNumber) {
        List<Sales> sales = salesRepository.findByCustomerPhoneNumber(customerPhoneNumber);
        return groupAndConvertToDTO(sales);
    }
    
    public List<SalesResponseDTO> getSalesByDate(LocalDate date) {
        List<Sales> sales = salesRepository.findBySalesDate(date);
        return groupAndConvertToDTO(sales);
    }
    
    public List<SalesResponseDTO> getSalesByDateRange(LocalDate startDate, LocalDate endDate) {
        List<Sales> sales = salesRepository.findBySalesDateBetween(startDate, endDate);
        return groupAndConvertToDTO(sales);
    }
    
    private List<SalesResponseDTO> groupAndConvertToDTO(List<Sales> salesList) {
        Map<Integer, List<Sales>> groupedBySalesId = salesList.stream()
                .collect(Collectors.groupingBy(Sales::getSalesId));
        
        return groupedBySalesId.entrySet().stream()
                .map(entry -> {
                    Integer salesId = entry.getKey();
                    List<Sales> salesItems = entry.getValue();
                    
                    // Get customer info from first item (all items in a transaction have same customer)
                    Sales firstItem = salesItems.get(0);
                    Customer customer = customerRepository.findByContactNumber(firstItem.getCustomerPhoneNumber())
                            .orElse(new Customer(null, "Unknown", firstItem.getCustomerPhoneNumber(), LocalDate.now()));
                    
                    List<SalesResponseDTO.SalesItemResponseDTO> itemResponses = salesItems.stream()
                            .map(sales -> new SalesResponseDTO.SalesItemResponseDTO(
                                sales.getItemsId(),
                                sales.getMedicineName(),
                                sales.getMedicineUnitPrice(),
                                sales.getPerMedicineTotalQuantity(),
                                sales.getPerMedicineTotalAmount()
                            ))
                            .collect(Collectors.toList());
                    
                    return new SalesResponseDTO(
                        salesId,
                        customer.getName(),
                        customer.getContactNumber(),
                        firstItem.getSalesDate(),
                        itemResponses,
                        firstItem.getTotalPricePerCustomerTransaction()
                    );
                })
                .collect(Collectors.toList());
    }
}