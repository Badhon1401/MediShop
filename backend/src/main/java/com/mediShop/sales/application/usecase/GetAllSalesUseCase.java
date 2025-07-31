

package com.mediShop.sales.application.usecase;


import com.mediShop.sales.application.dto.SalesResponse;
import com.mediShop.sales.domain.entity.Sales;
import com.mediShop.sales.domain.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;


@Service
public class GetAllSalesUseCase {
  
   private final SalesRepository salesRepository;
  
   @Autowired
   public GetAllSalesUseCase(SalesRepository salesRepository) {
       this.salesRepository = salesRepository;
   }
  
   public List<SalesResponse> execute() {
       List<Sales> salesList = salesRepository.findAll();
      
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
