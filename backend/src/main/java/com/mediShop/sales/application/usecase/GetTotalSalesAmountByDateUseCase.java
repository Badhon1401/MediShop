// GetTotalSalesAmountByDateUseCase.java
package com.mediShop.sales.application.usecase;

import com.mediShop.sales.domain.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class GetTotalSalesAmountByDateUseCase {

    private final SalesRepository salesRepository;

    @Autowired
    public GetTotalSalesAmountByDateUseCase(SalesRepository salesRepository) {
        this.salesRepository = salesRepository;
    }

    public Double execute(String dateString) {
        LocalDate date = LocalDate.parse(dateString, DateTimeFormatter.ISO_LOCAL_DATE);
        Double totalAmount = salesRepository.getTotalSalesAmountByDate(date);
        return totalAmount != null ? totalAmount : 0.0;
    }
}


