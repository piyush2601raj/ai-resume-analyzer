package com.piyush.ai.resume.analyzer.dto;

import java.util.List;

public class AIAnalysisResponse {

    private int atsScore;

    private int jobMatch;

    private String professionalSummary;

    private List<String> technicalSkills;

    private List<String> missingSkills;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> improvementSuggestions;

    private List<String> recommendedJobRoles;

    public AIAnalysisResponse() {
    }

    public int getAtsScore() {
        return atsScore;
    }

    public void setAtsScore(int atsScore) {
        this.atsScore = atsScore;
    }

    public int getJobMatch() {
        return jobMatch;
    }

    public void setJobMatch(int jobMatch) {
        this.jobMatch = jobMatch;
    }

    public String getProfessionalSummary() {
        return professionalSummary;
    }

    public void setProfessionalSummary(String professionalSummary) {
        this.professionalSummary = professionalSummary;
    }

    public List<String> getTechnicalSkills() {
        return technicalSkills;
    }

    public void setTechnicalSkills(List<String> technicalSkills) {
        this.technicalSkills = technicalSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public void setStrengths(List<String> strengths) {
        this.strengths = strengths;
    }

    public List<String> getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(List<String> weaknesses) {
        this.weaknesses = weaknesses;
    }

    public List<String> getImprovementSuggestions() {
        return improvementSuggestions;
    }

    public void setImprovementSuggestions(List<String> improvementSuggestions) {
        this.improvementSuggestions = improvementSuggestions;
    }

    public List<String> getRecommendedJobRoles() {
        return recommendedJobRoles;
    }

    public void setRecommendedJobRoles(List<String> recommendedJobRoles) {
        this.recommendedJobRoles = recommendedJobRoles;
    }
}