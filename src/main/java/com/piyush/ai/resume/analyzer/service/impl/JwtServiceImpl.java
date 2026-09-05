package com.piyush.ai.resume.analyzer.service.impl;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.piyush.ai.resume.analyzer.service.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtServiceImpl implements JwtService {

    private static final String SECRET =
            "mysecretkeymysecretkeymysecretkey123456";

    private Key getKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    @Override
    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(getKey())
                .compact();
    }

    @Override
    public String extractUsername(String token) {

        Claims claims = Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

    @Override
    public boolean isTokenValid(String token) {

        try {
            extractUsername(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}