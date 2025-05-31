package com.sda.medishop.domain;

import java.util.List;
import java.util.UUID;

public class Shop {
    private final UUID id;
    private String name;
    private String location;
    private User owner;
    private List<ShopOperator> shopOperatorList;
    private List<Medicine> medicineList;

}
