package com.piyush.ai.resume.analyzer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);

        System.out.println("=========================================");
        System.out.println(" AI Resume Analyzer Started Successfully ");
        System.out.println(" Server Running at: http://localhost:8080");
        System.out.println("=========================================");
    }
}

