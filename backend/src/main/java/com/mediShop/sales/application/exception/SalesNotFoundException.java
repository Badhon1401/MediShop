package com.mediShop.sales.application.exception;


public class SalesNotFoundException extends RuntimeException {
   public SalesNotFoundException(String message) {
       super(message);
   }
}
