package com.mediShop.user.application.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String to, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("mdrakibul11611@gmail.com");
            message.setTo(to);
            message.setSubject("Your OTP for MediShop");
            message.setText("Your OTP is: " + otp + ". It is valid for 10 minutes. Do not share it with anyone.");
            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Failed to send email: " + e.getMessage());
            System.out.println("OTP for " + to + ": " + otp);
        }
    }
}
