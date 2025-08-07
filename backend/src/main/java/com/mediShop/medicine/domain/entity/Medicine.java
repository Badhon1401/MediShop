package com.mediShop.medicine.domain.entity;


import com.mediShop.shop.domain.entity.Shop;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

public class Medicine {

    private UUID id;
    private Shop shop;
    private String name;
    private String groupName;
    private Integer power;
    private String category;
    private BigDecimal price;
    private String givenFor;
    private Integer availableQuantity;
    private Date manufacturedDate;
    private Date expiryDate;
    private Integer position;
    private BigDecimal discountPercentage;


    public Medicine() {
    }


    public Medicine(UUID id, Shop shop, String name, String groupName, Integer power,
                    String category, BigDecimal price, String givenFor, Integer availableQuantity,
                    Date manufacturedDate, Date expiryDate, Integer position, BigDecimal discountPercentage) {
        this.id = id;
        this.shop = shop;
        this.name = name;
        this.groupName = groupName;
        this.power = power;
        this.category = category;
        this.price = price;
        this.givenFor = givenFor;
        this.availableQuantity = availableQuantity;
        this.manufacturedDate = manufacturedDate;
        this.expiryDate = expiryDate;
        this.position = position;
        this.discountPercentage = discountPercentage;
    }

    public Medicine(UUID id) {
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Shop getShop() { return shop; }
    public void setShop(Shop shop) { this.shop = shop; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGroupName() { return groupName; }
    public void setGroupName(String groupName) { this.groupName = groupName; }

    public Integer getPower() { return power; }
    public void setPower(Integer power) { this.power = power; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getGivenFor() { return givenFor; }
    public void setGivenFor(String givenFor) { this.givenFor = givenFor; }

    public Integer getAvailableQuantity() { return availableQuantity; }
    public void setAvailableQuantity(Integer availableQuantity) { this.availableQuantity = availableQuantity; }

    public Date getManufacturedDate() { return manufacturedDate; }
    public void setManufacturedDate(Date manufacturedDate) { this.manufacturedDate = manufacturedDate; }

    public Date getExpiryDate() { return expiryDate; }
    public void setExpiryDate(Date expiryDate) { this.expiryDate = expiryDate; }

    public Integer getPosition() { return position; }
    public void setPosition(Integer position) { this.position = position; }

    public BigDecimal getDiscountPercentage() { return discountPercentage; }
    public void setDiscountPercentage(BigDecimal discountPercentage) { this.discountPercentage = discountPercentage; }
}