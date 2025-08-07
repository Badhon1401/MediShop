package com.mediShop.user.application.exception;

public class UserEmailMismatchException extends RuntimeException {
  public UserEmailMismatchException(String message) {
    super(message);
  }
}