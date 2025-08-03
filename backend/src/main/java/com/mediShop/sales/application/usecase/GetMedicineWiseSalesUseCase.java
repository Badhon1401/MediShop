
// GetMedicineWiseSalesUseCase.java
package com.mediShop.sales.application.usecase;

import com.mediShop.sales.domain.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetMedicineWiseSalesUseCase {

    private final SalesRepository salesRepository;

    @Autowired
    public GetMedicineWiseSalesUseCase(SalesRepository salesRepository) {
        this.salesRepository = salesRepository;
    }

    public List<Object[]> execute() {
        return salesRepository.getMedicineWiseSalesQuantity();
    }
}