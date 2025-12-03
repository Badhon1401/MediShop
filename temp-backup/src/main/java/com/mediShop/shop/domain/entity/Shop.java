package com.mediShop.shop.domain.entity;

import com.mediShop.medicine.domain.entity.Medicine;
import com.mediShop.user.domain.entity.User;

import java.util.*;

public class Shop {
    private UUID id;
    private String name;
    private String location;
    private User owner;
    private Set<ShopOperator> shopOperatorList = new HashSet<>();
    private Set<Medicine> medicineList = new HashSet<>();

    public Shop(UUID id) {
        this.id = id;
    }

    public Shop(UUID id, String name, String location, User owner, Set<ShopOperator> shopOperatorList, Set<Medicine> medicineList) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.owner = owner;
        this.shopOperatorList = shopOperatorList;
        this.medicineList = medicineList;
    }
    public Shop(String name, String location) {
        this.name = name;
        this.location = location;
    }

    public Shop(UUID id, String name, String location) {
        this.id=id;
        this.name=name;
        this.location=location;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Set<ShopOperator> getShopOperatorList() {
        return shopOperatorList;
    }

    public void setShopOperatorList(Set<ShopOperator> shopOperatorList) {
        this.shopOperatorList = shopOperatorList;
    }

    public Set<Medicine> getMedicineList() {
        return medicineList;
    }

    public void setMedicineList(Set<Medicine> medicineList) {
        this.medicineList = medicineList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Shop shop = (Shop) o;
        return Objects.equals(id, shop.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}

