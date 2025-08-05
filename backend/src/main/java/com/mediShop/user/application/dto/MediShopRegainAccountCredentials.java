package com.mediShop.user.application.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MediShopRegainAccountCredentials {
    private String code;
    private String userEmail;
    private String userName;
    private String updatedPassword;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUpdatedPassword() {
        return updatedPassword;
    }

    public void setUpdatedPassword(String updatedPassword) {
        this.updatedPassword = updatedPassword;
    }
}

