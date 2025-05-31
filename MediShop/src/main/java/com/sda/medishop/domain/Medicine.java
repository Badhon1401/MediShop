package com.sda.medishop.domain;

import java.util.Date;
import java.util.UUID;

public class Medicine {
    private final UUID id;
    private Shop shop;
    private String name;
    private String groupName;
    private int power;
    private String category;
    private double price;
    private String givenFor;
    private int availableQuantity;
    private Date manufacturedDate;
    private Date expiryDate;
    private int position;
    private double discountPercentage;


    public Medicine(UUID id, Shop shop, String name, String groupName, int power, String category,
                    double price, String givenFor, int availableQuantity,
                    Date manufacturedDate, Date expiryDate, int position, double discountPercentage) {
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


    public UUID getId() { return id; }
    public Shop getShop() { return shop; }
    public String getName() { return name; }
    public String getGroupName() { return groupName; }
    public int getPower() { return power; }
    public String getCategory() { return category; }
    public double getPrice() { return price; }
    public String getGivenFor() { return givenFor; }
    public int getAvailableQuantity() { return availableQuantity; }
    public Date getManufacturedDate() { return manufacturedDate; }
    public Date getExpiryDate() { return expiryDate; }
    public int getPosition() { return position; }
    public double getDiscountPercentage() { return discountPercentage; }


    public void setShop(Shop shop) { this.shop = shop; }
    public void setName(String name) { this.name = name; }
    public void setGroupName(String groupName) { this.groupName = groupName; }
    public void setPower(int power) { this.power = power; }
    public void setCategory(String category) { this.category = category; }
    public void setPrice(double price) { this.price = price; }
    public void setGivenFor(String givenFor) { this.givenFor = givenFor; }
    public void setAvailableQuantity(int availableQuantity) { this.availableQuantity = availableQuantity; }
    public void setManufacturedDate(Date manufacturedDate) { this.manufacturedDate = manufacturedDate; }
    public void setExpiryDate(Date expiryDate) { this.expiryDate = expiryDate; }
    public void setPosition(int position) { this.position = position; }
    public void setDiscountPercentage(double discountPercentage) { this.discountPercentage = discountPercentage; }
}
