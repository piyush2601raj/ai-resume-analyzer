package com.piyush.ai.resume.analyzer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.piyush.ai.resume.analyzer.entity.ResumeAnalysis;

@Repository
public interface ResumeAnalysisRepository extends JpaRepository<ResumeAnalysis, Long> {

    List<ResumeAnalysis> findByUserEmailOrderByCreatedAtDesc(String userEmail);

    long countByUserEmail(String userEmail);

    List<ResumeAnalysis> findAllByUserEmail(String userEmail);

    Optional<ResumeAnalysis> findTopByUserEmailOrderByAtsScoreDesc(String userEmail);
}