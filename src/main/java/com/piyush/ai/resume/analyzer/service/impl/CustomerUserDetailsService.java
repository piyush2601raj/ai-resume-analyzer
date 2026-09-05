package com.piyush.ai.resume.analyzer.service.impl;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.piyush.ai.resume.analyzer.entity.ResumeUser;
import com.piyush.ai.resume.analyzer.repository.ResumeUserRepository;

@Service
public class CustomerUserDetailsService implements UserDetailsService {

    private final ResumeUserRepository userRepository;

    public CustomerUserDetailsService(ResumeUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        ResumeUser user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User Not Found"));

        return User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }
}