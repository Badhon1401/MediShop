package com.mediShop.inventory.domain.valueobject;

public enum MedicineType {
    TABLET("Tablet"),
    SYRUP("Syrup"),
    INJECTION("Injection"),
    CAPSULE("Capsule"),
    CREAM("Cream"),
    OINTMENT("Ointment"),
    DROPS("Drops"),
    INHALER("Inhaler"),
    POWDER("Powder"),
    SUSPENSION("Suspension");

    private final String displayName;

    MedicineType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}