import type { SkillCategory } from '../types';

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'Java', 'TypeScript', 'SQL', 'JavaScript'],
  },
  {
    title: 'AI/ML Frameworks',
    skills: ['LangChain', 'LangGraph', 'PyTorch', 'TensorFlow', 'SageMaker', 'RAG', 'LLMs'],
  },
  {
    title: 'Cloud & Infrastructure',
    skills: ['AWS (ECS, Fargate, Kinesis)', 'Kubernetes', 'Docker', 'Terraform'],
  },
  {
    title: 'Data Technologies',
    skills: ['Apache Kafka', 'PostgreSQL', 'Redis', 'Snowflake', 'ChromaDB'],
  },
  {
    title: 'DevOps & Monitoring',
    skills: ['Jenkins', 'GitHub Actions', 'Prometheus', 'Grafana', 'CI/CD'],
  },
];

const certifications = [
  'Oracle Certified Generative AI Professional (LLMs, Vector Store, RAG, LangChain)',
  'Amdocs ICE FAIR #3 Winner - Led 5-member team for CRM prototype',
  'Published: Transformer models for enhancing AttnGAN based text to image generation (Elsevier)',
];

export function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <h2>Skills Matrix</h2>
          <p>Comprehensive technical competencies organized by domain</p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.title}</h3>
              <div className="skill-items">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-item">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="certifications">
          <h3>Certifications & Achievements</h3>
          <ul>
            {certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
