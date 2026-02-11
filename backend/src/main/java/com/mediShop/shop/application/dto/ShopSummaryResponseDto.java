package com.mediShop.shop.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.UUID;

@Data
@AllArgsConstructor
public class ShopSummaryResponseDto {
    private UUID id;
    private String name;
    private String location;
    private String role; // e.g., "OWNER", "ADMIN", or "SALESMAN"
}