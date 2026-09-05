package com.piyush.ai.resume.analyzer.service.impl;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import com.piyush.ai.resume.analyzer.service.AIResumeAnalyzerService;

@Service
public class AIResumeAnalyzerServiceImpl implements AIResumeAnalyzerService {

    private final ChatClient chatClient;

    public AIResumeAnalyzerServiceImpl(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @Override
    public String analyzeResume(String resumeText) {

        try {

            if (resumeText != null && resumeText.length() > 6000) {
                resumeText = resumeText.substring(0, 6000);
            }

            String prompt = """
                    You are an Expert ATS Resume Analyzer.

                    Analyze the following resume professionally.

                    Provide the result in clean Markdown format.

                    Include:

                    ## ATS Score
                    Give an ATS score out of 100 and briefly explain the score.

                    ## Professional Summary
                    Write a concise professional summary based on the resume.

                    ## Technical Skills
                    List all technical skills detected from the resume.

                    ## Missing Skills
                    Identify important skills that appear to be missing or could improve the candidate's profile.

                    ## Strengths
                    List the strongest aspects of the resume.

                    ## Weaknesses
                    Identify weaknesses, gaps, or areas that should be improved.

                    ## Improvement Suggestions
                    Give practical suggestions to improve the resume and ATS compatibility.

                    ## Recommended Job Roles
                    Suggest suitable job roles based on the candidate's skills and experience.

                    Resume:
                    """ + resumeText;

            System.out.println("========== GROQ AI ANALYSIS ==========");

            return chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();

        } catch (Exception e) {

            e.printStackTrace();

            return "AI Analysis Failed : " + e.getMessage();
        }
    }

    @Override
    public String matchResumeWithJob(String resumeText, String jobDescription) {

        try {

            if (resumeText != null && resumeText.length() > 6000) {
                resumeText = resumeText.substring(0, 6000);
            }

            if (jobDescription != null && jobDescription.length() > 6000) {
                jobDescription = jobDescription.substring(0, 6000);
            }

            String prompt = """
                    You are an Expert ATS Resume Matcher.

                    Compare the Resume with the Job Description.

                    Return the result in clean Markdown format.

                    ## Job Match Percentage
                    Give an estimated match percentage out of 100.

                    ## Matching Skills
                    List the skills that match the job description.

                    ## Missing Skills
                    List important skills required by the job description
                    that are missing from the resume.

                    ## Resume Improvements
                    Explain how the resume should be improved for this particular job.

                    ## Interview Preparation Topics
                    List important technical and interview topics the candidate should prepare.

                    Resume:
                    """ + resumeText + """

                    Job Description:
                    """ + jobDescription;

            System.out.println("========== GROQ JOB MATCH ANALYSIS ==========");

            return chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();

        } catch (Exception e) {

            e.printStackTrace();

            return "Job Match Failed : " + e.getMessage();
        }
    }
}