package com.mediShop.shop.domain.entity;

import com.mediShop.user.domain.entity.User;

import java.util.*;


public class ShopOperator {
    private UUID id;
    private User user;
    private Set<Shop> shopList=new HashSet<>();
    private Role role;

    public ShopOperator(UUID id,User user, Set<Shop> shopList, Role role) {
        this.id=id;
        this.user = user;
        this.shopList = shopList;
        this.role = role;
    }
    public ShopOperator(){

    }

    public ShopOperator(UUID id) {
        this.id=id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Shop> getShopList() {
        return shopList;
    }

    public void setShopList(Set<Shop> shopList) {
        this.shopList = shopList;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShopOperator operator = (ShopOperator) o;
        return Objects.equals(id, operator.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
