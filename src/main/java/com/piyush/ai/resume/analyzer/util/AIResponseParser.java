package com.piyush.ai.resume.analyzer.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AIResponseParser {

    private AIResponseParser() {
    }

    public static int extractAtsScore(String response) {

        if (response == null || response.isBlank()) {
            return 0;
        }

        Pattern pattern = Pattern.compile(
                "(?i)ATS\\s*Score\\s*:?\\s*(\\d{1,3})");

        Matcher matcher = pattern.matcher(response);

        if (matcher.find()) {
            return Integer.parseInt(matcher.group(1));
        }

        return 0;
    }

    public static int extractJobMatch(String response) {

        if (response == null || response.isBlank()) {
            return 0;
        }

        Pattern pattern = Pattern.compile(
                "(?i)(Job\\s*Match|Job\\s*Match\\s*Percentage)\\s*:?\\s*(\\d{1,3})");

        Matcher matcher = pattern.matcher(response);

        if (matcher.find()) {
            return Integer.parseInt(matcher.group(2));
        }

        return 0;
    }

    public static String extractSection(String response, String section) {

        if (response == null || response.isBlank()) {
            return "";
        }

        Pattern pattern = Pattern.compile(
                "(?is)" + Pattern.quote(section) + "\\s*:?\\s*(.*?)(?=\\n\\s*[A-Z][A-Za-z ]+\\s*:|$)");

        Matcher matcher = pattern.matcher(response);

        if (matcher.find()) {
            return matcher.group(1).trim();
        }

        return "";
    }

}