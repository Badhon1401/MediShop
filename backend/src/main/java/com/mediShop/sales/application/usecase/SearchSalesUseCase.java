
package com.mediShop.sales.application.usecase;


import com.mediShop.sales.application.dto.SearchSalesRequest;
import com.mediShop.sales.application.dto.SalesResponse;
import com.mediShop.sales.domain.entity.Sales;
import com.mediShop.sales.domain.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class SearchSalesUseCase {
  
   private final SalesRepository salesRepository;
  
   @Autowired
   public SearchSalesUseCase(SalesRepository salesRepository) {
       this.salesRepository = salesRepository;
   }
  
   public List<SalesResponse> execute(SearchSalesRequest request) {
       List<Sales> salesList = new ArrayList<>();
      
       if (request.getSalesId() != null) {
           salesList = salesRepository.findBySalesId(request.getSalesId());
       } else if (request.getCustomerPhoneNumber() != null && !request.getCustomerPhoneNumber().isEmpty()) {
           salesList = salesRepository.findByCustomerPhoneNumber(request.getCustomerPhoneNumber());
       } else if (request.getMedicineName() != null && !request.getMedicineName().isEmpty()) {
           salesList = salesRepository.findByMedicineName(request.getMedicineName());
       } else if (request.getSalesDate() != null) {
           salesList = salesRepository.findBySalesDate(request.getSalesDate());
       } else if (request.getStartDate() != null && request.getEndDate() != null) {
           salesList = salesRepository.findBySalesDateBetween(request.getStartDate(), request.getEndDate());
       } else {
           salesList = salesRepository.findAll();
       }
      
       return salesList.stream()
               .map(sales -> new SalesResponse(
                       sales.getItemsId(),
                       sales.getSalesId(),
                       sales.getCustomerPhoneNumber(),
                       sales.getSalesDate(),
                       sales.getMedicineName(),
                       sales.getMedicineUnitPrice(),
                       sales.getPerMedicineTotalQuantity(),
                       sales.getPerMedicineTotalAmount(),
                       sales.getTotalPricePerCustomerTransaction()
               ))
               .collect(Collectors.toList());
   }
}
