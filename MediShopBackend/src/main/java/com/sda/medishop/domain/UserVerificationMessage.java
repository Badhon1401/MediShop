package com.sda.medishop.domain;

import java.util.Date;
import java.util.UUID;

public class UserVerificationMessage {

    private UUID verificationCodeId;
    private String code;
    private String userEmail;
    private Date expiry;

    public UserVerificationMessage(String code,  String userEmail, Date expiry) {
        this.code = code;
        this.userEmail = userEmail;
        this.expiry = expiry;
    }

    public UUID getVerificationCodeId() {
        return verificationCodeId;
    }

    public String getCode() {
        return code;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public Date getExpiry() {
        return expiry;
    }
}

