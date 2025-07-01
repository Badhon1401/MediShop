package com.sda.medishop;

import org.springframework.beans.factory.annotation.Value;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PharmacyManagerApplication {

	@Value("${spring.application.name:NOT FOUND}")
	private String appName;

	@PostConstruct
	public void testProperties() {
		System.out.println(">>> SPRING APPLICATION NAME: " + appName);
	}

	public static void main(String[] args) {
		SpringApplication.run(PharmacyManagerApplication.class, args);
	}
}
