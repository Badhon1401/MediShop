// GetTotalSalesAmountBetweenDatesUseCase.java
package com.mediShop.sales.application.usecase;

import com.mediShop.sales.application.dto.TotalSalesAmountBetweenDatesRequest;
import com.mediShop.sales.domain.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class GetTotalSalesAmountBetweenDatesUseCase {

    private final SalesRepository salesRepository;

    @Autowired
    public GetTotalSalesAmountBetweenDatesUseCase(SalesRepository salesRepository) {
        this.salesRepository = salesRepository;
    }

    public Double execute(TotalSalesAmountBetweenDatesRequest request) {
        LocalDate startDate = LocalDate.parse(request.getStartDate(), DateTimeFormatter.ISO_LOCAL_DATE);
        LocalDate endDate = LocalDate.parse(request.getEndDate(), DateTimeFormatter.ISO_LOCAL_DATE);
        Double totalAmount = salesRepository.getTotalSalesAmountBetweenDates(startDate, endDate);
        return totalAmount != null ? totalAmount : 0.0;
    }
}