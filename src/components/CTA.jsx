import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="cta-section">
      <div className="container">

        <div className="cta-card text-center">

          <span className="badge bg-light text-primary mb-3 px-3 py-2">
            🚀 Start Today
          </span>

          <h2 className="fw-bold display-5">
            Ready to Build Your Dream Resume?
          </h2>

          <p className="lead mt-3 mb-4">
            Upload your resume and get an AI-powered ATS analysis,
            personalized suggestions, missing skills, and improvement tips.
          </p>

          <Link to="/upload" className="btn btn-light btn-lg px-5 py-3">
            Upload Resume
          </Link>

        </div>

      </div>
    </section>
  );
}

export default CTA;