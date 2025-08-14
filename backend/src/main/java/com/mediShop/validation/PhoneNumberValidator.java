package com.mediShop.validation;


import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class PhoneNumberValidator {

    // Regex for Bangladeshi phone numbers (e.g., +8801XXXXXXXXX, 01XXXXXXXXX)
    private static final String PHONE_NUMBER_REGEX = "^(?:\\+88|88)?(01[3-9]\\d{8})$";
    private static final Pattern PHONE_NUMBER_PATTERN = Pattern.compile(PHONE_NUMBER_REGEX);

    public boolean isValidPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
            return false;
        }

        String normalizedPhone = phoneNumber.replaceAll("\\s+", "");
        Matcher matcher = PHONE_NUMBER_PATTERN.matcher(normalizedPhone);
        return matcher.matches();
    }

    public void validatePhoneNumber(String phoneNumber) {
        if (!isValidPhoneNumber(phoneNumber)) {
            throw new IllegalArgumentException("Invalid phone number format: " + phoneNumber);
        }
    }

    public String normalizePhoneNumber(String phoneNumber) {
        if (phoneNumber == null) {
            return null;
        }

        String normalized = phoneNumber.replaceAll("\\s+", "");

        if (normalized.startsWith("01")) {
            normalized = "+880" + normalized.substring(1);
        } else if (normalized.startsWith("880")) {
            normalized = "+" + normalized;
        } else if (normalized.startsWith("88")) {
            normalized = "+" + normalized;
        }

        return normalized;
    }
}

