import { BsCloudUpload, BsCpu, BsFileEarmarkBarGraph } from "react-icons/bs";

function HowItWorks() {
  const steps = [
    {
      icon: <BsCloudUpload size={45} />,
      title: "Upload Resume",
      description:
        "Upload your PDF resume securely in just one click.",
    },
    {
      icon: <BsCpu size={45} />,
      title: "AI Analysis",
      description:
        "Our AI analyzes your resume for ATS compatibility, skills, and improvements.",
    },
    {
      icon: <BsFileEarmarkBarGraph size={45} />,
      title: "Get Report",
      description:
        "Receive ATS score, missing skills, suggestions, and download your report.",
    },
  ];

  return (
    <section className="py-5">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold display-5">How It Works</h2>
          <p className="text-muted">
            Three simple steps to improve your resume.
          </p>
        </div>

        <div className="row g-4">

          {steps.map((step, index) => (
            <div className="col-lg-4" key={index}>
              <div className="work-card text-center p-4 h-100">

                <div className="work-icon mb-4">
                  {step.icon}
                </div>

                <h4 className="fw-bold">{step.title}</h4>

                <p className="text-muted mt-3">
                  {step.description}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;