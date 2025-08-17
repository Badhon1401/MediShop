//
//package com.mediShop.sales.application.usecase;
//
//
//import com.mediShop.sales.application.dto.SalesAnalyticsResponse;
//import com.mediShop.sales.domain.repository.SalesRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//
//import java.time.LocalDate;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//
//@Service
//public class GetSalesAnalyticsUseCase {
//  
//   private final SalesRepository salesRepository;
//  
//   @Autowired
//   public GetSalesAnalyticsUseCase(SalesRepository salesRepository) {
//       this.salesRepository = salesRepository;
//   }
//  
//   public SalesAnalyticsResponse execute(LocalDate startDate, LocalDate endDate) {
//       Double totalSalesAmount = salesRepository.getTotalSalesAmountBetweenDates(startDate, endDate);
//       List<Object[]> medicineWiseSales = salesRepository.getMedicineWiseSalesQuantity();
//      
//       Map<String, Integer> medicineQuantityMap = new HashMap<>();
//       for (Object[] result : medicineWiseSales) {
//           String medicineName = (String) result[0];
//           Long quantity = (Long) result[1];
//           medicineQuantityMap.put(medicineName, quantity.intValue());
//       }
//      
//       return new SalesAnalyticsResponse(totalSalesAmount, medicineQuantityMap);
//   }
//}
//
//
//
//
//### sales/application/dto/SalesAnalyticsResponse.java
//java
//package com.mediShop.sales.application.dto;
//
//
//import java.util.Map;
//
//
//public class SalesAnalyticsResponse {
//  
//   private Double totalSalesAmount;
//   private Map<String, Integer> medicineWiseQuantity;
//  
//   public SalesAnalyticsResponse() {}
//  
//   public SalesAnalyticsResponse(Double totalSalesAmount, Map<String, Integer> medicineWiseQuantity) {
//       this.totalSalesAmount = totalSalesAmount;
//       this.medicineWiseQuantity = medicineWiseQuantity;
//   }
//  
//   // Getters and Setters
//   public Double getTotalSalesAmount() {
//       return totalSalesAmount;
//   }
//  
//   public void setTotalSalesAmount(Double totalSalesAmount) {
//       this.totalSalesAmount = totalSalesAmount;
//   }
//  
//   public Map<String, Integer> getMedicineWiseQuantity() {
//       return medicineWiseQuantity;
//   }
//  
//   public void setMedicineWiseQuantity(Map<String, Integer> medicineWiseQuantity) {
//       this.medicineWiseQuantity = medicineWiseQuantity;
//   }
//}
//
//
//
//
//## 5. Additional Controller Endpoints
//
//
//Add these methods to the SalesController:
//
//
//java
//@GetMapping("/analytics")
//@Operation(summary = "Get sales analytics", description = "Get sales analytics for a date range")
//public ResponseEntity<SalesAnalyticsResponse> getSalesAnalytics(
//       @Parameter(description = "Start date for analytics")
//       @RequestParam LocalDate startDate,
//       @Parameter(description = "End date for analytics")
//       @RequestParam LocalDate endDate) {
//   GetSalesAnalyticsUseCase analyticsUseCase = new GetSalesAnalyticsUseCase(salesRepository);
//   SalesAnalyticsResponse response = analyticsUseCase.execute(startDate, endDate);
//   return ResponseEntity.ok(response);
//}
//
//
//@GetMapping("/daily-total/{date}")
//@Operation(summary = "Get daily sales total", description = "Get total sales amount for a specific date")
//public ResponseEntity<Double> getDailySalesTotal(
//       @Parameter(description = "Date to get sales total for")
//       @PathVariable LocalDate date) {
//   // You'll need to inject SalesRepository or create a use case for this
//   Double totalAmount = salesRepository.getTotalSalesAmountByDate(date);
//   return ResponseEntity.ok(totalAmount != null ? totalAmount : 0.0);
//}
//
//
//@GetMapping("/unique-sales-ids")
//@Operation(summary = "Get all unique sales IDs", description = "Retrieve all unique sales transaction IDs")
//public ResponseEntity<List<Integer>> getUniqueSalesIds() {
//   List<Integer> uniqueIds = salesRepository.findAllUniqueSalesIds();
//   return ResponseEntity.ok(uniqueIds);
//}
//
//
//
