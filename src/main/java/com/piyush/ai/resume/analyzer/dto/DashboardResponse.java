package com.piyush.ai.resume.analyzer.dto;

public class DashboardResponse {

    private long totalAnalyses;
    private double averageAtsScore;
    private int highestAtsScore;
    private long totalResumes;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalAnalyses, double averageAtsScore,
                             int highestAtsScore, long totalResumes) {
        this.totalAnalyses = totalAnalyses;
        this.averageAtsScore = averageAtsScore;
        this.highestAtsScore = highestAtsScore;
        this.totalResumes = totalResumes;
    }

    public long getTotalAnalyses() {
        return totalAnalyses;
    }

    public void setTotalAnalyses(long totalAnalyses) {
        this.totalAnalyses = totalAnalyses;
    }

    public double getAverageAtsScore() {
        return averageAtsScore;
    }

    public void setAverageAtsScore(double averageAtsScore) {
        this.averageAtsScore = averageAtsScore;
    }

    public int getHighestAtsScore() {
        return highestAtsScore;
    }

    public void setHighestAtsScore(int highestAtsScore) {
        this.highestAtsScore = highestAtsScore;
    }

    public long getTotalResumes() {
        return totalResumes;
    }

    public void setTotalResumes(long totalResumes) {
        this.totalResumes = totalResumes;
    }
}