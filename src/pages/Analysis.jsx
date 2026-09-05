import { useLocation, useNavigate } from "react-router-dom";

function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();

  // Backend se ResumeUpload.jsx ke through aaya hua analysis
  const analysis = location.state?.analysis;

  // =========================================================
  // NO ANALYSIS
  // =========================================================

  if (!analysis) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center shadow-sm">
          <h4 className="fw-bold">No Analysis Found</h4>

          <p className="mb-3">
            Please upload your resume first.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/upload")}
          >
            Upload Resume
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // CONVERT RESPONSE TO STRING
  // =========================================================

  const text = String(analysis);

  console.log("========== ANALYSIS PAGE ==========");
  console.log("Complete Analysis:", text);

  // =========================================================
  // ATS SCORE
  // =========================================================

  const extractScore = () => {
    const patterns = [
      /ATS\s+Score[\s\S]{0,150}?\b(\d{1,3})\s*\/\s*100\b/i,

      /ATS\s+Score\s*[:\-]?\s*\**\s*(\d{1,3})\s*\/\s*100/i,

      /Score\s*[:\-]?\s*\**\s*(\d{1,3})\s*\/\s*100/i,

      /\b(\d{1,3})\s*\/\s*100\b/,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);

      if (match) {
        const value = Number(match[1]);

        if (value >= 0 && value <= 100) {
          return value;
        }
      }
    }

    return "N/A";
  };

  const score = extractScore();

  // =========================================================
  // NORMALIZE HEADING
  // =========================================================

  const normalizeHeading = (heading) => {
    return heading
      .replace(/\*\*/g, "")
      .replace(/[:：]+$/, "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  };

  // =========================================================
  // SECTION EXTRACTOR
  //
  // Supports:
  // ## Heading
  // ### Heading
  // #### Heading
  //
  // Also supports multiple names for the same section.
  // =========================================================

  const extractSection = (sectionNames) => {
    const lines = text.split(/\r?\n/);

    // Allow both string and array
    const names = Array.isArray(sectionNames)
      ? sectionNames
      : [sectionNames];

    const normalizedTargets = names.map((name) =>
      normalizeHeading(name)
    );

    let collecting = false;
    const result = [];

    for (const line of lines) {
      const trimmed = line.trim();

      // Check for Markdown heading
      const headingMatch = trimmed.match(
        /^#{2,6}\s+(.+?)\s*$/
      );

      if (headingMatch) {
        const heading = normalizeHeading(
          headingMatch[1]
        );

        // If already inside a section,
        // this heading means the current section is finished.
        if (collecting) {
          break;
        }

        // Check all possible heading names
        const matched = normalizedTargets.some(
          (target) =>
            heading === target ||
            heading.startsWith(target + " ")
        );

        if (matched) {
          collecting = true;
          continue;
        }
      }

      if (collecting) {
        result.push(line);
      }
    }

    return result.join("\n").trim();
  };

  // =========================================================
  // EXTRACT ALL SECTIONS
  // =========================================================

  const professionalSummary =
    extractSection("Professional Summary");

  const technicalSkills =
    extractSection("Technical Skills");

  // IMPORTANT:
  // AI can return either:
  //
  // Missing Skills
  //
  // OR
  //
  // Missing Skills (Opportunities to Strengthen the Profile)
  //
  // OR
  //
  // Missing / Under-represented Skills
  //
  const missingSkills = extractSection([
    "Missing Skills",
    "Missing / Under-represented Skills",
    "Missing Under-represented Skills",
    "Missing Skills Opportunities",
  ]);

  const strengths =
    extractSection("Strengths");

  const weaknesses =
    extractSection([
      "Weaknesses",
      "Weaknesses / Gaps",
    ]);

  const suggestions =
    extractSection("Improvement Suggestions");

  const jobRoles =
    extractSection("Recommended Job Roles");

  // =========================================================
  // DEBUG SECTION DATA
  // =========================================================

  console.log(
    "Professional Summary:",
    professionalSummary
  );

  console.log(
    "Technical Skills:",
    technicalSkills
  );

  console.log(
    "Missing Skills:",
    missingSkills
  );

  console.log(
    "Strengths:",
    strengths
  );

  console.log(
    "Weaknesses:",
    weaknesses
  );

  console.log(
    "Improvement Suggestions:",
    suggestions
  );

  console.log(
    "Recommended Job Roles:",
    jobRoles
  );

  // =========================================================
  // CLEAN MARKDOWN
  // =========================================================

  const cleanText = (value) => {
    if (!value) {
      return "";
    }

    return value
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/^\s*[-*•]\s*/gm, "")
      .replace(/^\s*\d+\.\s*/gm, "")
      .replace(/^#{1,6}\s*/gm, "")
      .trim();
  };

  // =========================================================
  // INLINE MARKDOWN
  // =========================================================

  const renderInlineMarkdown = (value) => {
    if (!value) {
      return null;
    }

    const parts = value.split(
      /(\*\*.*?\*\*)/g
    );

    return parts.map((part, index) => {
      if (
        part.startsWith("**") &&
        part.endsWith("**")
      ) {
        return (
          <strong key={index}>
            {part.slice(2, -2)}
          </strong>
        );
      }

      return (
        <span key={index}>
          {part}
        </span>
      );
    });
  };

  // =========================================================
  // CHECK WHETHER CONTENT IS TABLE
  // =========================================================

  const isTable = (content) => {
    if (!content) {
      return false;
    }

    const lines = content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length < 2) {
      return false;
    }

    return (
      lines[0].includes("|") &&
      lines[1].includes("|")
    );
  };

  // =========================================================
  // RENDER MARKDOWN TABLE
  // =========================================================

  const renderTable = (content) => {
    const lines = content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(
        (line) =>
          line &&
          line.includes("|")
      );

    if (lines.length < 2) {
      return null;
    }

    const parseRow = (line) => {
      return line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) =>
          cell
            .trim()
            .replace(
              /\*\*(.*?)\*\*/g,
              "$1"
            )
            .replace(
              /`(.*?)`/g,
              "$1"
            )
        );
    };

    const header = parseRow(lines[0]);

    // Remove Markdown separator row
    const dataRows = lines
      .slice(1)
      .filter(
        (line) =>
          !/^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(
            line
          )
      )
      .map(parseRow);

    return (
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              {header.map((cell, index) => (
                <th key={index}>
                  {renderInlineMarkdown(cell)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {header.map((_, cellIndex) => (
                  <td key={cellIndex}>
                    {renderInlineMarkdown(
                      row[cellIndex] || ""
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // =========================================================
  // RENDER BULLET / NUMBERED LIST
  // =========================================================

  const renderList = (content) => {
    if (!content) {
      return (
        <p className="text-muted mb-0">
          No information available.
        </p>
      );
    }

    const lines = content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(
        (line) => line.length > 0
      );

    const listItems = lines.filter(
      (line) =>
        /^[-*•]\s+/.test(line) ||
        /^\d+\.\s+/.test(line)
    );

    // Numbered / bullet list
    if (listItems.length > 0) {
      return (
        <ul className="mb-0 ps-4">
          {listItems.map(
            (line, index) => {
              const cleaned = line
                .replace(
                  /^[-*•]\s+/,
                  ""
                )
                .replace(
                  /^\d+\.\s+/,
                  ""
                )
                .trim();

              return (
                <li
                  key={index}
                  className="mb-2"
                >
                  {renderInlineMarkdown(
                    cleaned
                  )}
                </li>
              );
            }
          )}
        </ul>
      );
    }

    // Normal paragraph content
    return (
      <div>
        {lines.map(
          (line, index) => (
            <p
              key={index}
              className="mb-2"
            >
              {renderInlineMarkdown(
                cleanText(line)
              )}
            </p>
          )
        )}
      </div>
    );
  };

  // =========================================================
  // GENERIC CONTENT RENDERER
  // =========================================================

  const renderContent = (content) => {
    if (
      !content ||
      !content.trim()
    ) {
      return (
        <p className="text-muted mb-0">
          No information available.
        </p>
      );
    }

    if (isTable(content)) {
      const table = renderTable(content);

      if (table) {
        return table;
      }
    }

    return renderList(content);
  };

  // =========================================================
  // SCORE COLOR
  // =========================================================

  const numericScore = Number(score);

  let scoreClass = "text-primary";

  if (!isNaN(numericScore)) {
    if (numericScore >= 80) {
      scoreClass = "text-success";
    } else if (numericScore >= 60) {
      scoreClass = "text-warning";
    } else {
      scoreClass = "text-danger";
    }
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="container py-5">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="text-center mb-5">

        <h1 className="fw-bold">
          Resume Analysis Report
        </h1>

        <p className="text-muted">
          AI-powered analysis of your resume
        </p>

      </div>

      {/* =====================================================
          ATS SCORE
      ====================================================== */}

      <div className="row justify-content-center mb-5">

        <div className="col-md-6 col-lg-5">

          <div className="card shadow border-0 rounded-4 text-center">

            <div className="card-body p-5">

              <h4 className="fw-bold mb-4">
                ATS Score
              </h4>

              <div
                className={`display-1 fw-bold ${scoreClass}`}
              >
                {score}

                <span className="fs-3 text-muted">
                  /100
                </span>
              </div>

              <p className="text-muted mt-3 mb-0">
                Resume compatibility score
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          PROFESSIONAL SUMMARY
      ====================================================== */}

      <div className="card shadow-sm border-0 rounded-4 mb-4">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-3">
            📋 Professional Summary
          </h3>

          {professionalSummary ? (
            <div className="fs-6 lh-lg">
              {renderContent(
                professionalSummary
              )}
            </div>
          ) : (
            <p className="text-muted mb-0">
              No professional summary available.
            </p>
          )}

        </div>

      </div>

      {/* =====================================================
          TECHNICAL SKILLS
      ====================================================== */}

      <div className="card shadow-sm border-0 rounded-4 mb-4">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-3">
            💻 Technical Skills
          </h3>

          {renderContent(
            technicalSkills
          )}

        </div>

      </div>

      {/* =====================================================
          MISSING SKILLS
      ====================================================== */}

      <div className="card shadow-sm border-0 rounded-4 mb-4">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-3">
            ⚠️ Missing Skills
          </h3>

          {renderContent(
            missingSkills
          )}

        </div>

      </div>

      {/* =====================================================
          STRENGTHS
      ====================================================== */}

      <div className="card shadow-sm border-0 rounded-4 mb-4">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-3">
            💪 Strengths
          </h3>

          {renderContent(
            strengths
          )}

        </div>

      </div>

      {/* =====================================================
          WEAKNESSES
      ====================================================== */}

      <div className="card shadow-sm border-0 rounded-4 mb-4">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-3">
            🔍 Weaknesses
          </h3>

          {renderContent(
            weaknesses
          )}

        </div>

      </div>

      {/* =====================================================
          IMPROVEMENT SUGGESTIONS
      ====================================================== */}

      <div className="card shadow-sm border-0 rounded-4 mb-4">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-3">
            🚀 Improvement Suggestions
          </h3>

          {renderContent(
            suggestions
          )}

        </div>

      </div>

      {/* =====================================================
          RECOMMENDED JOB ROLES
      ====================================================== */}

      <div className="card shadow-sm border-0 rounded-4 mb-4">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-3">
            🎯 Recommended Job Roles
          </h3>

          {renderContent(
            jobRoles
          )}

        </div>

      </div>

      {/* =====================================================
          DEBUG INFORMATION
      ====================================================== */}

      <div className="alert alert-light border mt-4">

        <small className="text-muted">
          Analysis generated successfully by AI Resume Analyzer.
        </small>

      </div>

      {/* =====================================================
          ACTION BUTTONS
      ====================================================== */}

      <div className="text-center mt-5">

        <button
          className="btn btn-primary btn-lg me-2 mb-2"
          onClick={() => navigate("/upload")}
        >
          Upload Another Resume
        </button>

        <button
          className="btn btn-outline-secondary btn-lg mb-2"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

      </div>

    </div>
  );
}

export default Analysis;