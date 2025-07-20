package com.mediShop.sales.application.usecase;


import com.mediShop.sales.application.dto.SalesRequest;
import com.mediShop.sales.application.dto.SalesResponse;
import com.mediShop.sales.domain.entity.Sales;
import com.mediShop.sales.domain.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AddSalesUseCase {
  
   private final SalesRepository salesRepository;
  
   @Autowired
   public AddSalesUseCase(SalesRepository salesRepository) {
       this.salesRepository = salesRepository;
   }
  
   public SalesResponse execute(SalesRequest request) {
       Sales sales = new Sales(
               request.getSalesId(),
               request.getCustomerPhoneNumber(),
               request.getSalesDate(),
               request.getMedicineName(),
               request.getMedicineUnitPrice(),
               request.getPerMedicineTotalQuantity(),
               request.getPerMedicineTotalAmount(),
               request.getTotalPricePerCustomerTransaction()
       );
      
       Sales savedSales = salesRepository.save(sales);
      
       return new SalesResponse(
               savedSales.getItemsId(),
               savedSales.getSalesId(),
               savedSales.getCustomerPhoneNumber(),
               savedSales.getSalesDate(),
               savedSales.getMedicineName(),
               savedSales.getMedicineUnitPrice(),
               savedSales.getPerMedicineTotalQuantity(),
               savedSales.getPerMedicineTotalAmount(),
               savedSales.getTotalPricePerCustomerTransaction()
       );
   }
}
