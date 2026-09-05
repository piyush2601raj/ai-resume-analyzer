package com.piyush.ai.resume.analyzer.service;

import com.piyush.ai.resume.analyzer.dto.request.LoginRequest;
import com.piyush.ai.resume.analyzer.dto.request.RegisterRequest;
import com.piyush.ai.resume.analyzer.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}