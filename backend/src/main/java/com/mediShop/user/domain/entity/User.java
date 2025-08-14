package com.mediShop.user.domain.entity;

import com.mediShop.user.domain.valueobject.Role;
import com.mediShop.user.domain.exception.UserException;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Random;
import java.util.function.BiPredicate;

public class User {
    private final Integer id;
    private String name;
    private String email;
    private String phone;
    private String password;
    private Role role;
    private String otp;
    private LocalDateTime otpExpiresAt;
    private boolean verified;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public User(Integer id,
                String name,
                String email,
                String phone,
                String password,
                Role role,
                String otp,
                LocalDateTime otpExpiresAt,
                boolean verified,
                LocalDateTime createdAt,
                LocalDateTime updatedAt) {
        this.id            = id;
        setName(name);
        setContact(email, phone);
        setPassword(password);
        this.role          = Objects.requireNonNull(role, "Role cannot be null");
        this.otp           = otp;
        this.otpExpiresAt  = otpExpiresAt;
        this.verified      = verified;
        this.createdAt     = createdAt != null ? createdAt : LocalDateTime.now();
        this.updatedAt     = updatedAt != null ? updatedAt : this.createdAt;
    }

    /** factory for new registrations **/
    public static User create(String name,
                              String email,
                              String phone,
                              String password,
                              Role role) {
        return new User(
                null,
                name,
                email,
                phone,
                password,
                role,
                null,
                null,
                false,
                LocalDateTime.now(),
                null
        );
    }

    // ─── Accessors ─────────────────────────────────────────────��───────────────

    public Integer       getId()           { return id; }
    public String        getName()         { return name; }
    public String        getEmail()        { return email; }
    public String        getPhone()        { return phone; }
    public String        getPassword()     { return password; }
    public Role          getRole()         { return role; }
    public boolean       isVerified()      { return verified; }
    public String        getOtp()          { return otp; }
    public LocalDateTime getOtpExpiresAt() { return otpExpiresAt; }
    public LocalDateTime getCreatedAt()    { return createdAt; }
    public LocalDateTime getUpdatedAt()    { return updatedAt; }

    // ─── Behaviors / Business Rules ────────────────────────────────────────────

    public void setName(String name) {
        if (name == null || name.isBlank())
            throw new UserException("Name cannot be blank");
        this.name = name.trim();
        touch();
    }

    public void setContact(String email, String phone) {
        if ((email == null || email.isBlank()) &&
                (phone == null || phone.isBlank()))
            throw new UserException("Either email or phone is required");
        this.email = email != null ? email.trim() : null;
        this.phone = phone != null ? phone.trim() : null;
        touch();
    }

    public void setEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new UserException("Email cannot be empty");
        }
        this.email = email.trim();
        touch();
    }

    public void setPhone(String phone) {
        if (phone == null || phone.isBlank()) {
            throw new UserException("Phone cannot be empty");
        }
        this.phone = phone.trim();
        touch();
    }

    public void setPassword(String password) {
        if (password == null || password.isBlank()) {
            throw new UserException("Password cannot be empty");
        }
        this.password = password;
        touch();
    }

    public void assignRole(Role role) {
        this.role = Objects.requireNonNull(role, "Role cannot be null");
        touch();
    }

    public void markVerified() {
        this.verified = true;
        touch();
    }

    public void generateOtp(int minutesValid) {
        String code = String.format("%06d", new Random().nextInt(1_000_000));
        this.otp = code;
        this.otpExpiresAt = LocalDateTime.now().plusMinutes(minutesValid);
        touch();
    }

    public void verifyOtp(String submitted) {
        if (otp == null || otpExpiresAt == null)
            throw new UserException("No OTP has been generated");
        if (LocalDateTime.now().isAfter(otpExpiresAt))
            throw new UserException("OTP has expired");
        if (!otp.equals(submitted.trim()))
            throw new UserException("OTP does not match");
        this.verified = true;
        this.otp = null;
        this.otpExpiresAt = null;
        touch();
    }

    public void ensureNewPasswordIsDifferent(String newRawPassword, BiPredicate<String,String> passwordMatches) {
        if (passwordMatches.test(newRawPassword, this.password)) {
            throw new UserException("New password must be different from the old password");
        }
    }

    public void updateProfile(String name, String email, String phone) {
        setName(name);
        setContact(email, phone);
    }

    private void touch() {
        this.updatedAt = LocalDateTime.now();
    }
}
