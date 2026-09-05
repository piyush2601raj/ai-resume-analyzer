package com.piyush.ai.resume.analyzer.service.impl;

import java.io.IOException;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.piyush.ai.resume.analyzer.service.ResumeParserService;

@Service
public class ResumeParserServiceImpl implements ResumeParserService {

    @Override
    public String extractText(MultipartFile file) throws IOException {

        try (PDDocument document = Loader.loadPDF(file.getBytes())) {

            PDFTextStripper stripper = new PDFTextStripper();

            return stripper.getText(document);

        }

    }

}