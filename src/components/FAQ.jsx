function FAQ() {
  return (
    <section className="faq-section py-5">
      <div className="container">

        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="section-title">
            Frequently Asked Questions
          </h2>

          <p className="section-subtitle">
            Everything you need to know about AI Resume Analyzer.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="accordion" id="faqAccordion">

          {/* FAQ 1 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq1"
              >
                What is an AI Resume Analyzer?
              </button>
            </h2>

            <div
              id="faq1"
              className="accordion-collapse collapse show"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                An AI Resume Analyzer is a tool that analyzes a resume
                using AI and provides insights about ATS compatibility,
                skills, keywords, strengths, weaknesses, and areas for
                improvement.
              </div>
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq2"
              >
                What is an ATS score?
              </button>
            </h2>

            <div
              id="faq2"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                ATS stands for Applicant Tracking System. The ATS score
                indicates how compatible a resume is with common
                applicant-tracking and resume-screening requirements.
              </div>
            </div>
          </div>

          {/* FAQ 3 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq3"
              >
                What does the analyzer check?
              </button>
            </h2>

            <div
              id="faq3"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                The analyzer evaluates areas such as technical skills,
                keywords, professional summary, strengths, weaknesses,
                missing skills, and provides suggestions to improve the
                resume.
              </div>
            </div>
          </div>

          {/* FAQ 4 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq4"
              >
                Which resume format is supported?
              </button>
            </h2>

            <div
              id="faq4"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                The current version supports PDF resumes for analysis.
              </div>
            </div>
          </div>

          {/* FAQ 5 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq5"
              >
                What recommendations does the AI provide?
              </button>
            </h2>

            <div
              id="faq5"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                The AI provides personalized recommendations such as
                improving the professional summary, adding relevant skills
                and keywords, including quantifiable achievements, and
                tailoring the resume to the target role.
              </div>
            </div>
          </div>

          {/* FAQ 6 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq6"
              >
                Who can use the AI Resume Analyzer?
              </button>
            </h2>

            <div
              id="faq6"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Students, freshers, job seekers, and working professionals
                can use the analyzer to identify areas for improvement in
                their resumes before applying for jobs.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FAQ;