package com.piyush.ai.resume.analyzer.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI resumeAnalyzerOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("AI Resume Analyzer API")
                        .version("1.0")
                        .description("Enterprise AI Resume Analyzer and Job Match Platform")
                        .contact(new Contact()
                                .name("Piyush Mishra")
                                .email("your-email@example.com"))
                        .license(new License()
                                .name("MIT License")))
                .externalDocs(new ExternalDocumentation()
                        .description("Project Documentation"));
    }
}