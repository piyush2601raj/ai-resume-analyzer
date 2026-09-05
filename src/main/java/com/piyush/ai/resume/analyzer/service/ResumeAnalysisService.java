package com.piyush.ai.resume.analyzer.service;

import java.util.List;

import com.piyush.ai.resume.analyzer.entity.ResumeAnalysis;
import com.piyush.ai.resume.analyzer.dto.DashboardResponse;

public interface ResumeAnalysisService {

    ResumeAnalysis saveAnalysis(ResumeAnalysis analysis);

    List<ResumeAnalysis> getUserAnalysisHistory(String userEmail);

    ResumeAnalysis getAnalysisById(Long id);

    void deleteAnalysis(Long id);
    
    DashboardResponse getDashboard(String userEmail);

}