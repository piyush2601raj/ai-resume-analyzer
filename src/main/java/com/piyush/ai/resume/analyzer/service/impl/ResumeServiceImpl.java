package com.piyush.ai.resume.analyzer.service.impl;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.piyush.ai.resume.analyzer.entity.Resume;
import com.piyush.ai.resume.analyzer.entity.ResumeAnalysis;
import com.piyush.ai.resume.analyzer.entity.ResumeUser;
import com.piyush.ai.resume.analyzer.exception.ResourceNotFoundException;
import com.piyush.ai.resume.analyzer.repository.ResumeRepository;
import com.piyush.ai.resume.analyzer.repository.ResumeUserRepository;
import com.piyush.ai.resume.analyzer.service.AIResumeAnalyzerService;
import com.piyush.ai.resume.analyzer.service.ResumeAnalysisService;
import com.piyush.ai.resume.analyzer.service.ResumeParserService;
import com.piyush.ai.resume.analyzer.service.ResumeService;
import com.piyush.ai.resume.analyzer.util.AIResponseParser;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final ResumeUserRepository userRepository;
    private final ResumeParserService parserService;
    private final AIResumeAnalyzerService aiResumeAnalyzerService;
    private final ResumeAnalysisService resumeAnalysisService;

    public ResumeServiceImpl(
            ResumeRepository resumeRepository,
            ResumeUserRepository userRepository,
            ResumeParserService parserService,
            AIResumeAnalyzerService aiResumeAnalyzerService,
            ResumeAnalysisService resumeAnalysisService) {

        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.parserService = parserService;
        this.aiResumeAnalyzerService = aiResumeAnalyzerService;
        this.resumeAnalysisService = resumeAnalysisService;
    }

    @Override
    public String uploadResume(MultipartFile file, String email) throws Exception {

        ResumeUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String uploadDir = "uploads";

        File folder = new File(uploadDir);

        if (!folder.exists()) {
            folder.mkdirs();
        }

        String fileName = System.currentTimeMillis() + "_"
                + file.getOriginalFilename();

        Path path = Paths.get(uploadDir, fileName);

        Files.write(path, file.getBytes());

        // Extract Resume Text
        String resumeText = parserService.extractText(file);

        System.out.println("========== RESUME TEXT ==========");
        System.out.println(resumeText);
        System.out.println("=================================");

        // AI Resume Analysis
        String analysis = aiResumeAnalyzerService.analyzeResume(resumeText);

        System.out.println("========== AI ANALYSIS ==========");
        System.out.println(analysis);
        System.out.println("=================================");

        // Extract ATS Score from AI Response
        int atsScore = AIResponseParser.extractAtsScore(analysis);

        // Save Resume File Details
        Resume resume = new Resume();

        resume.setFileName(fileName);
        resume.setFileType(file.getContentType());
        resume.setFilePath(path.toString());
        resume.setExtractedText(resumeText);
        resume.setUser(user);

        resumeRepository.save(resume);

        // Save Resume Analysis History
        ResumeAnalysis resumeAnalysis = new ResumeAnalysis();

        resumeAnalysis.setUserEmail(user.getEmail());
        resumeAnalysis.setResumeName(file.getOriginalFilename());
        resumeAnalysis.setResumeText(resumeText);
        resumeAnalysis.setAnalysis(analysis);

        // Save Extracted ATS Score
        resumeAnalysis.setAtsScore(atsScore);

        // Job Match upload ke time available nahi hota
        resumeAnalysis.setJobMatch(0);

        resumeAnalysisService.saveAnalysis(resumeAnalysis);

        return analysis;
    }
}