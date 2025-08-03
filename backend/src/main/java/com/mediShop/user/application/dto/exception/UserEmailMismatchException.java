package com.mediShop.user.application.dto.exception;

public class UserEmailMismatchException extends RuntimeException {
  public UserEmailMismatchException(String message) {
    super(message);
  }
}