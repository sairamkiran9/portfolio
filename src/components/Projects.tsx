import { projects } from '../data/projects';
import type { Project } from '../types';

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={`project-card ${project.isFeatured ? 'featured' : ''}`}>
      <div className="project-header">
        <h3>{project.title}</h3>
        <span className="project-subtitle">{project.subtitle}</span>
        <div className={`project-status ${project.status}`}>{project.statusLabel}</div>
      </div>

      <p className="project-description">{project.description}</p>

      <div className="project-metrics">
        {project.metrics.map((metric, index) => (
          <div key={index} className="metric-item">
            <span className="metric-value">{metric.value}</span>
            <span className="metric-label">{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="project-features">
        <h4>Key Features:</h4>
        <ul>
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="project-tech">
        {project.technologies.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>

      <div className="project-links">
        {project.links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn ${link.isPrimary ? 'btn--primary' : 'btn--outline'}`}
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>Showcasing technical depth and innovation in AI systems and distributed architecture</p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
