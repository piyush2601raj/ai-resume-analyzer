import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="row align-items-center min-vh-100">

          {/* Left Content */}
          <div className="col-lg-6">

            <span className="badge bg-primary px-3 py-2 mb-3">
              🚀 AI Powered Resume Analyzer
            </span>

            <h1 className="display-3 fw-bold">
              Build a Resume That
              <span className="text-primary"> Gets You Hired</span>
            </h1>

            <p className="lead text-secondary mt-4">
              Analyze your resume with AI, check your ATS compatibility,
              discover missing skills, and get personalized suggestions
              to improve your chances of getting shortlisted.
            </p>

            {/* CTA Buttons */}
            <div className="mt-4 d-flex flex-wrap gap-3">

              <Link
                to="/upload"
                className="btn btn-primary btn-lg px-4"
              >
                Upload & Analyze Resume
              </Link>

              <Link
                to="/analysis"
                className="btn btn-outline-primary btn-lg px-4"
              >
                View Analysis
              </Link>

            </div>

            {/* Key Benefits */}
            <div className="row mt-5">

              <div className="col-4">
                <h5 className="fw-bold text-primary">
                  AI
                </h5>
                <small className="text-secondary">
                  Resume Analysis
                </small>
              </div>

              <div className="col-4">
                <h5 className="fw-bold text-primary">
                  ATS
                </h5>
                <small className="text-secondary">
                  Compatibility Score
                </small>
              </div>

              <div className="col-4">
                <h5 className="fw-bold text-primary">
                  AI
                </h5>
                <small className="text-secondary">
                  Smart Suggestions
                </small>
              </div>

            </div>

          </div>

          {/* Right Image */}
          <div className="col-lg-6 text-center mt-5 mt-lg-0">

            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=900"
              alt="AI Resume Analysis"
              className="img-fluid rounded-4 shadow-lg"
            />

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;