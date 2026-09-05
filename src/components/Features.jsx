import { BsRobot, BsBarChartFill, BsLightbulbFill } from "react-icons/bs";

function Features() {
  const features = [
    {
      icon: <BsRobot size={45} />,
      title: "AI Resume Analysis",
      description:
        "Analyze your resume with AI and receive detailed insights to improve your chances of getting shortlisted.",
    },
    {
      icon: <BsBarChartFill size={45} />,
      title: "ATS Score",
      description:
        "Know how ATS systems evaluate your resume and optimize it for top companies.",
    },
    {
      icon: <BsLightbulbFill size={45} />,
      title: "Smart Suggestions",
      description:
        "Receive personalized recommendations for missing skills, keywords, formatting, and improvements.",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold display-5">Why Choose AI Resume Analyzer?</h2>
          <p className="text-muted">
            Everything you need to build a recruiter-friendly resume.
          </p>
        </div>

        <div className="row g-4">

          {features.map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="feature-card h-100 text-center p-4">

                <div className="feature-icon mb-4">
                  {feature.icon}
                </div>

                <h4 className="fw-bold mb-3">
                  {feature.title}
                </h4>

                <p className="text-muted">
                  {feature.description}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;