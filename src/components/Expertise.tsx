import { Bot, Cloud, Zap, Database, Settings, Target } from 'lucide-react';

const expertiseAreas = [
  {
    icon: Bot,
    title: 'AI/ML Platform',
    description: 'LangChain, LangGraph, PyTorch, TensorFlow, SageMaker, MLOps pipelines',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    description: 'AWS, Kubernetes, Docker, Terraform, Auto-scaling, Multi-cloud deployment',
  },
  {
    icon: Zap,
    title: 'Distributed Systems',
    description: 'Apache Kafka, Microservices, gRPC, High-throughput data processing',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'PostgreSQL, Redis, Snowflake, Real-time streaming, ETL pipelines',
  },
  {
    icon: Settings,
    title: 'DevOps & Monitoring',
    description: 'Jenkins, GitHub Actions, Prometheus, Grafana, CI/CD optimization',
  },
  {
    icon: Target,
    title: 'Business Impact',
    description: 'Performance optimization, Cost reduction, Scalability, System reliability',
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="expertise">
      <div className="container">
        <div className="section-header">
          <h2>Technical Expertise</h2>
          <p>Core competencies in AI/ML platform engineering and distributed systems</p>
        </div>

        <div className="expertise-grid">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div key={index} className="expertise-card">
                <div className="expertise-icon">
                  <Icon size={48} strokeWidth={1.5} />
                </div>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
