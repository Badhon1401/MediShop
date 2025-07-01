package com.medishop.medicine.domain.valueobject;

public enum MedicineType {
    TABLET("Tablet"),
    SYRUP("Syrup"),
    INJECTION("Injection"),
    CAPSULE("Capsule"),
    OINTMENT("Ointment");

    private final String displayName;

    MedicineType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}