import { BsFileEarmarkText, BsPeopleFill, BsAwardFill, BsGraphUpArrow } from "react-icons/bs";

function Stats() {
  const stats = [
    {
      icon: <BsFileEarmarkText size={40} />,
      number: "10K+",
      title: "Resumes Analyzed",
    },
    {
      icon: <BsPeopleFill size={40} />,
      number: "5K+",
      title: "Happy Users",
    },
    {
      icon: <BsAwardFill size={40} />,
      number: "95%",
      title: "ATS Accuracy",
    },
    {
      icon: <BsGraphUpArrow size={40} />,
      number: "250+",
      title: "Companies Supported",
    },
  ];

  return (
    <section className="stats-section py-5">
      <div className="container">
        <div className="row g-4">

          {stats.map((item, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="stats-card text-center">

                <div className="stats-icon mb-3">
                  {item.icon}
                </div>

                <h2 className="fw-bold">{item.number}</h2>

                <p className="text-muted mb-0">
                  {item.title}
                </p>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Stats;