package com.piyush.ai.resume.analyzer.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.piyush.ai.resume.analyzer.dto.DashboardResponse;
import com.piyush.ai.resume.analyzer.entity.ResumeAnalysis;
import com.piyush.ai.resume.analyzer.repository.ResumeAnalysisRepository;
import com.piyush.ai.resume.analyzer.service.ResumeAnalysisService;

@Service
public class ResumeAnalysisServiceImpl implements ResumeAnalysisService {

    private final ResumeAnalysisRepository repository;

    public ResumeAnalysisServiceImpl(ResumeAnalysisRepository repository) {
        this.repository = repository;
    }

    @Override
    public ResumeAnalysis saveAnalysis(ResumeAnalysis analysis) {
        return repository.save(analysis);
    }

    @Override
    public List<ResumeAnalysis> getUserAnalysisHistory(String userEmail) {
        return repository.findByUserEmailOrderByCreatedAtDesc(userEmail);
    }

    @Override
    public ResumeAnalysis getAnalysisById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void deleteAnalysis(Long id) {
        repository.deleteById(id);
    }

    @Override
    public DashboardResponse getDashboard(String userEmail) {

        long totalAnalyses = repository.countByUserEmail(userEmail);

        List<ResumeAnalysis> analyses = repository.findAllByUserEmail(userEmail);

        double averageAtsScore = analyses.stream()
                .mapToInt(ResumeAnalysis::getAtsScore)
                .average()
                .orElse(0);

        int highestAtsScore = repository
                .findTopByUserEmailOrderByAtsScoreDesc(userEmail)
                .map(ResumeAnalysis::getAtsScore)
                .orElse(0);

        DashboardResponse response = new DashboardResponse();

        response.setTotalAnalyses(totalAnalyses);
        response.setAverageAtsScore(averageAtsScore);
        response.setHighestAtsScore(highestAtsScore);
        response.setTotalResumes(totalAnalyses);

        return response;
    }
}