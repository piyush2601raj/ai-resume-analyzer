package com.piyush.ai.resume.analyzer.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.piyush.ai.resume.analyzer.dto.DashboardResponse;
import com.piyush.ai.resume.analyzer.entity.ResumeAnalysis;
import com.piyush.ai.resume.analyzer.service.ResumeAnalysisService;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "*")
public class ResumeAnalysisController {

    private final ResumeAnalysisService resumeAnalysisService;

    public ResumeAnalysisController(ResumeAnalysisService resumeAnalysisService) {
        this.resumeAnalysisService = resumeAnalysisService;
    }

    @GetMapping
    public ResponseEntity<List<ResumeAnalysis>> getHistory(Authentication authentication) {

        String email = authentication.getName();

        List<ResumeAnalysis> history =
                resumeAnalysisService.getUserAnalysisHistory(email);

        return ResponseEntity.ok(history);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAnalysis(@PathVariable Long id) {

        ResumeAnalysis analysis =
                resumeAnalysisService.getAnalysisById(id);

        if (analysis == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(analysis);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAnalysis(@PathVariable Long id) {

        resumeAnalysisService.deleteAnalysis(id);

        return ResponseEntity.ok("Analysis deleted successfully.");
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getDashboard(Authentication authentication) {

        String email = authentication.getName();

        DashboardResponse response =
                resumeAnalysisService.getDashboard(email);

        return ResponseEntity.ok(response);
    }
}