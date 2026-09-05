package com.piyush.ai.resume.analyzer.service;

public interface AIResumeAnalyzerService {

    String analyzeResume(String resumeText);
    String matchResumeWithJob(String resumeText, String jobDescription);

}