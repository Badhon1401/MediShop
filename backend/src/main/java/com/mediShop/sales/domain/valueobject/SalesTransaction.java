// File: src/main/java/com/mediShop/sales/domain/valueobject/SalesTransaction.java
package com.mediShop.sales.domain.valueobject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesTransaction {
    private String customerName;
    private String customerPhoneNumber;
    private List<SalesItem> items;
    private Double totalTransactionAmount;
}