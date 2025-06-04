package com.sda.medishop.infrastructure.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

public class SystemService {

    @Autowired
    private JavaMailSender mailSenderInstance;

    private static String mediShopEmail;

    private static JavaMailSender mailSender;

    @Value("${medishop.email}")
    private String mediShopEmailInstance;



    @PostConstruct
    private void initStaticDependencies() {
        mediShopEmail = mediShopEmailInstance;
        mailSender=mailSenderInstance;
    }
    public static void sendMessageThroughMail(String subject, String text, String receiverEmail){
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mediShopEmail);
            message.setTo(receiverEmail);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);

    }

}
