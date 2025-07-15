// File: src/main/java/com/mediShop/sales/application/dto/CustomerDTO.java
package com.mediShop.sales.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    
    private Integer customerId;
    private String name;
    private String contactNumber;
    private LocalDate registrationDate;
}
