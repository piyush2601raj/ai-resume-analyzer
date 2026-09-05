package com.piyush.ai.resume.analyzer.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.piyush.ai.resume.analyzer.dto.ApiResponse;
import com.piyush.ai.resume.analyzer.dto.request.JobMatchRequest;
import com.piyush.ai.resume.analyzer.service.AIResumeAnalyzerService;
import com.piyush.ai.resume.analyzer.service.ResumeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;
    private final AIResumeAnalyzerService aiResumeAnalyzerService;

    public ResumeController(
            ResumeService resumeService,
            AIResumeAnalyzerService aiResumeAnalyzerService) {

        this.resumeService = resumeService;
        this.aiResumeAnalyzerService = aiResumeAnalyzerService;
    }

    // =========================================================
    // TEST AUTHENTICATION
    // =========================================================

    @GetMapping("/test")
    public ResponseEntity<ApiResponse<String>> test(
            Authentication authentication) {

        if (authentication == null
                || !authentication.isAuthenticated()) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(
                            false,
                            "User is not authenticated",
                            null));
        }

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Authentication Successful",
                        "Authenticated User : "
                                + authentication.getName()));
    }

    // =========================================================
    // UPLOAD RESUME
    // =========================================================

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ApiResponse<String>> uploadResume(
            @RequestParam("file") MultipartFile file,
            Authentication authentication)  throws Exception{

        System.out.println(
                "========== UPLOAD CONTROLLER HIT ==========");

        try {

            System.out.println(
                    "Authentication: " + authentication);

            // -------------------------------------------------
            // CHECK AUTHENTICATION
            // -------------------------------------------------

            if (authentication == null
                    || !authentication.isAuthenticated()) {

                System.out.println(
                        "Authentication failed");

                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse<>(
                                false,
                                "User is not authenticated",
                                null));
            }

            String email = authentication.getName();

            System.out.println(
                    "Authenticated User: " + email);

            // -------------------------------------------------
            // CHECK FILE
            // -------------------------------------------------

            if (file == null) {

                System.out.println(
                        "FILE IS NULL");

                return ResponseEntity
                        .badRequest()
                        .body(new ApiResponse<>(
                                false,
                                "File is null",
                                null));
            }

            System.out.println(
                    "File Name: "
                            + file.getOriginalFilename());

            System.out.println(
                    "Content Type: "
                            + file.getContentType());

            System.out.println(
                    "File Size: "
                            + file.getSize());

            if (file.isEmpty()) {

                System.out.println(
                        "FILE IS EMPTY");

                return ResponseEntity
                        .badRequest()
                        .body(new ApiResponse<>(
                                false,
                                "Please select a resume file.",
                                null));
            }

            // -------------------------------------------------
            // CALL RESUME SERVICE
            // -------------------------------------------------

            System.out.println(
                    "Calling ResumeService...");

            String analysis =
                    resumeService.uploadResume(
                            file,
                            email);

            System.out.println(
                    "ResumeService completed successfully.");

            // -------------------------------------------------
            // SUCCESS RESPONSE
            // -------------------------------------------------

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Resume analyzed successfully.",
                            analysis));

        } catch (Exception e) {

            // -------------------------------------------------
            // ERROR
            // -------------------------------------------------

            System.out.println(
                    "========== RESUME UPLOAD ERROR ==========");

            e.printStackTrace();

            System.out.println(
                    "==========================================");

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(
                            false,
                            "Resume upload failed: "
                                    + e.getMessage(),
                            null));
        }
    }

    // =========================================================
   
    // =========================================================
    // JOB MATCH
    // =========================================================

    @PostMapping("/job-match")
    public ResponseEntity<ApiResponse<String>> jobMatch(
            @Valid @RequestBody JobMatchRequest request) {

        String result =
                aiResumeAnalyzerService.matchResumeWithJob(
                        request.getResumeText(),
                        request.getJobDescription());

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Job Match completed successfully.",
                        result));
    }
}