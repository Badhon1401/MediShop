package com.mediShop.medicine.application.exception;

public class MedicineAlreadyExistsException extends RuntimeException {
    public MedicineAlreadyExistsException(String message) {
        super(message);
    }
}