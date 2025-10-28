export function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2>Why Invest in This Talent</h2>
          <p>A proven track record of building scalable AI systems and delivering measurable business impact</p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3>Current Role Impact</h3>
            <p><strong>Software Engineer at Florida State University</strong></p>
            <ul>
              <li>Architected fault-tolerant microservices handling <strong>5M+ daily API calls</strong> at 99.99% uptime</li>
              <li>Built AI-powered chatbot reducing manual effort by <strong>90%</strong></li>
              <li>Deployed ML models cutting energy consumption by <strong>20% annually</strong></li>
              <li>Improved development cycles by <strong>75%</strong> through CI/CD optimization</li>
            </ul>
            <div className="resume-link">
              <a href="https://github.com/sairamkiran9/resume/blob/main/resume_muppana.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                Download Resume
              </a>
            </div>
          </div>

          <div className="about-card">
            <h3>Value Proposition for Startups</h3>
            <ul>
              <li><strong>Platform Engineering:</strong> Build scalable AI infrastructure from day one</li>
              <li><strong>Cost Optimization:</strong> Proven track record of reducing operational costs by 25%+</li>
              <li><strong>Rapid Scaling:</strong> Experience handling 10TB+ daily data processing</li>
              <li><strong>Full-Stack AI:</strong> From data ingestion to model deployment and monitoring</li>
              <li><strong>Cloud Native:</strong> Kubernetes, Docker, and hyperscaler expertise</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
