package com.piyush.ai.resume.analyzer.service;

import org.springframework.web.multipart.MultipartFile;

public interface ResumeParserService {

    String extractText(MultipartFile file) throws Exception;

}