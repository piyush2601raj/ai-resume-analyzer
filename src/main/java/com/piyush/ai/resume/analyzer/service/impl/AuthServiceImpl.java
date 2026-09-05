package com.piyush.ai.resume.analyzer.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.piyush.ai.resume.analyzer.dto.request.LoginRequest;
import com.piyush.ai.resume.analyzer.dto.request.RegisterRequest;
import com.piyush.ai.resume.analyzer.dto.response.AuthResponse;
import com.piyush.ai.resume.analyzer.entity.ResumeUser;
import com.piyush.ai.resume.analyzer.entity.Role;
import com.piyush.ai.resume.analyzer.exception.ResourceNotFoundException;
import com.piyush.ai.resume.analyzer.repository.ResumeUserRepository;
import com.piyush.ai.resume.analyzer.service.AuthService;
import com.piyush.ai.resume.analyzer.service.JwtService;

@Service
public class AuthServiceImpl implements AuthService {

    private final ResumeUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthServiceImpl(
            ResumeUserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        ResumeUser user = new ResumeUser();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.CANDIDATE);
        user.setEnabled(true);

        userRepository.save(user);

        AuthResponse response = new AuthResponse();
        response.setMessage("User Registered Successfully");
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());

        return response;
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        ResumeUser user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new IllegalArgumentException("Invalid password");
        }

        String token = jwtService.generateToken(user.getEmail());

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setMessage("Login Successful");
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());

        return response;
    }
}