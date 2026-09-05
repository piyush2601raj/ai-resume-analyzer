package com.piyush.ai.resume.analyzer.service;

import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {

    String uploadResume(MultipartFile file, String email) throws Exception;

}