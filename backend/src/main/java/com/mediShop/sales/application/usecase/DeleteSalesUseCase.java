
package com.mediShop.sales.application.usecase;


import com.mediShop.sales.application.exception.SalesNotFoundException;
import com.mediShop.sales.domain.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class DeleteSalesUseCase {
  
   private final SalesRepository salesRepository;
  
   @Autowired
   public DeleteSalesUseCase(SalesRepository salesRepository) {
       this.salesRepository = salesRepository;
   }
  
   public void execute(Integer itemsId) {
       if (!salesRepository.existsById(itemsId)) {
           throw new SalesNotFoundException("Sales record with ID " + itemsId + " not found");
       }
      
       salesRepository.deleteById(itemsId);
   }
}
