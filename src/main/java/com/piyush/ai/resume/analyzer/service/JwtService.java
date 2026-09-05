package com.piyush.ai.resume.analyzer.service;

public interface JwtService {

    String generateToken(String email);

    String extractUsername(String token);

    boolean isTokenValid(String token);
}