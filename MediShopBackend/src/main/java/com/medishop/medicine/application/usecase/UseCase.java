package com.medishop.medicine.application.usecase;

public interface UseCase<T, R> {
    R execute(T request);
}