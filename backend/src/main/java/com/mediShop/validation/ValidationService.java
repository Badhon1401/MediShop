package com.mediShop.validation;


import com.mediShop.user.domain.exception.UserException;
import org.springframework.stereotype.Service;

@Service
public class ValidationService {

    private final EmailValidator emailValidator;
    private final PhoneNumberValidator phoneNumberValidator;

    public ValidationService(EmailValidator emailValidator, PhoneNumberValidator phoneNumberValidator) {
        this.emailValidator = emailValidator;
        this.phoneNumberValidator = phoneNumberValidator;
    }

    public boolean isValidEmail(String email) {
        return emailValidator.isValidEmail(email);
    }

    public void validateEmail(String email) {
        emailValidator.validateEmail(email);
    }

    public boolean isValidPhoneNumber(String phoneNumber) {
        return phoneNumberValidator.isValidPhoneNumber(phoneNumber);
    }

    public void validatePhoneNumber(String phoneNumber) {
        phoneNumberValidator.validatePhoneNumber(phoneNumber);
    }

    public String normalizePhoneNumber(String phoneNumber) {
        return phoneNumberValidator.normalizePhoneNumber(phoneNumber);
    }

    public void validateEmailOrPhone(String emailOrPhone) {
        if (emailOrPhone == null || emailOrPhone.trim().isEmpty()) {
            throw new UserException("Email or phone number is required");
        }

        emailOrPhone = emailOrPhone.trim();

        if (isValidEmail(emailOrPhone)) {
            validateEmail(emailOrPhone);
        } else if (isValidPhoneNumber(emailOrPhone)) {
            validatePhoneNumber(emailOrPhone);
        } else {
            throw new UserException("Invalid email or phone number format");
        }
    }

    public String getContactType(String emailOrPhone) {
        if (isValidEmail(emailOrPhone)) {
            return "email";
        } else if (isValidPhoneNumber(emailOrPhone)) {
            return "phone";
        }
        return "unknown";
    }


    public void validatePassword(String password) {
        if (password == null || password.trim().isEmpty()) {
            throw new UserException("Password is required");
        }
        if (password.length() < 8) {
            throw new UserException("Password must be at least 8 characters long...!!");
        }
//        if (!password.matches(".*[A-Z].*")) {
//            throw new UserException("Password must contain at least one uppercase letter");
//        }
//        if (!password.matches(".*[a-z].*")) {
//            throw new UserException("Password must contain at least one lowercase letter");
//        }
//        if (!password.matches(".*[0-9].*")) {
//            throw new UserException("Password must contain at least one number");
//        }
    }
}

