package com.piyush.ai.resume.analyzer.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.piyush.ai.resume.analyzer.entity.ResumeUser;

public interface ResumeUserRepository extends JpaRepository<ResumeUser, Long> {

    Optional<ResumeUser> findByEmail(String email);

    boolean existsByEmail(String email);

}