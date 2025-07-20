
package com.mediShop.sales.application.usecase;


import com.mediShop.sales.application.dto.SalesResponse;
import com.mediShop.sales.application.dto.UpdateSalesRequest;
import com.mediShop.sales.application.exception.SalesNotFoundException;
import com.mediShop.sales.domain.entity.Sales;
import com.mediShop.sales.domain.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UpdateSalesUseCase {
  
   private final SalesRepository salesRepository;
  
   @Autowired
   public UpdateSalesUseCase(SalesRepository salesRepository) {
       this.salesRepository = salesRepository;
   }
  
   public SalesResponse execute(UpdateSalesRequest request) {
       Sales existingSales = salesRepository.findById(request.getItemsId())
               .orElseThrow(() -> new SalesNotFoundException("Sales record with ID " + request.getItemsId() + " not found"));
      
       // Update fields if they are provided
       if (request.getSalesId() != null) {
           existingSales.setSalesId(request.getSalesId());
       }
       if (request.getCustomerPhoneNumber() != null) {
           existingSales.setCustomerPhoneNumber(request.getCustomerPhoneNumber());
       }
       if (request.getSalesDate() != null) {
           existingSales.setSalesDate(request.getSalesDate());
       }
       if (request.getMedicineName() != null) {
           existingSales.setMedicineName(request.getMedicineName());
       }
       if (request.getMedicineUnitPrice() != null) {
           existingSales.setMedicineUnitPrice(request.getMedicineUnitPrice());
       }
       if (request.getPerMedicineTotalQuantity() != null) {
           existingSales.setPerMedicineTotalQuantity(request.getPerMedicineTotalQuantity());
       }
       if (request.getPerMedicineTotalAmount() != null) {
           existingSales.setPerMedicineTotalAmount(request.getPerMedicineTotalAmount());
       }
       if (request.getTotalPricePerCustomerTransaction() != null) {
           existingSales.setTotalPricePerCustomerTransaction(request.getTotalPricePerCustomerTransaction());
       }
      
       Sales updatedSales = salesRepository.save(existingSales);
      
       return new SalesResponse(
               updatedSales.getItemsId(),
               updatedSales.getSalesId(),
               updatedSales.getCustomerPhoneNumber(),
               updatedSales.getSalesDate(),
               updatedSales.getMedicineName(),
               updatedSales.getMedicineUnitPrice(),
               updatedSales.getPerMedicineTotalQuantity(),
               updatedSales.getPerMedicineTotalAmount(),
               updatedSales.getTotalPricePerCustomerTransaction()
       );
   }
}

