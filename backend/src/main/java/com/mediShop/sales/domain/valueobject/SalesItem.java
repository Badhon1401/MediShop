// File: src/main/java/com/mediShop/sales/domain/valueobject/SalesItem.java
package com.mediShop.sales.domain.valueobject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesItem {
    private String medicineName;
    private Double unitPrice;
    private Integer quantity;
    private Double totalAmount;
}