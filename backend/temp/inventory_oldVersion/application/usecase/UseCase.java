// UseCase.java (Generic interface)
package com.mediShop.inventory.application.usecase;

public interface UseCase<T, R> {
    R execute(T request);
}