import { useEffect, useState } from 'react';
import { Globe, Server, Smartphone, Brain } from 'lucide-react';
import type { Stat } from '../types';
import ProfileCard from './Profilecard';

const stats: Stat[] = [
  { value: 5, unit: 'M+', label: 'Daily API Calls', shouldAnimate: true },
  { value: 99.99, unit: '%', label: 'System Uptime', shouldAnimate: false },
  { value: 4, unit: '', label: 'Certifications/Publications', shouldAnimate: true },
];

export function Hero() {
  const [animatedValues, setAnimatedValues] = useState<Record<number, number>>({});

  useEffect(() => {
    const animateCounter = (index: number, target: number) => {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const updateCounter = () => {
        start += increment;
        if (start < target) {
          setAnimatedValues(prev => ({ ...prev, [index]: Math.floor(start) }));
          requestAnimationFrame(updateCounter);
        } else {
          setAnimatedValues(prev => ({ ...prev, [index]: target }));
        }
      };

      updateCounter();
    };

    stats.forEach((stat, index) => {
      if (stat.shouldAnimate) {
        setTimeout(() => animateCounter(index, stat.value), 500);
      } else {
        setAnimatedValues(prev => ({ ...prev, [index]: stat.value }));
      }
    });
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--color-slate-900) 0%, var(--color-charcoal-800) 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{ background: 'var(--color-bg-1)' }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10 py-20">
        <div className="grid md:grid-cols-[1fr_3fr] gap-8 items-center">
          {/* <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-card-border)] shadow-lg">
            <div>
              <p className="mb-2">
                <strong className="text-[var(--color-primary)]">Kiran Muppana</strong>
              </p>
              <p className="text-[var(--color-text)] mb-2">Tallahassee, FL</p>
              <p className="text-[var(--color-text)] mb-2">(850) 943-4453</p>
              <p className="text-[var(--color-text)]">kiranmuppana36@gmail.com</p>
            </div>
          </div> */}

          <ProfileCard />

          <div className="text-center md:text-left">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-teal-300) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.2',
              }}
            >
              About Me
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-8 leading-normal">
              {/* Building & Scaling AI Systems on Cloud Infrastructure | Expert in Distributed Systems & MLOps */}
              I’m a software engineer who is passionate about writing clean code and building highly scalable applications. I am driven to keep up with industry practices and to pick up new skills. I’m currently working in backend development and have a strong interest in both the backend engineering and AI.
            </p>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 rounded-xl border"
              style={{
                background: 'rgba(50, 184, 198, 0.1)',
                borderColor: 'rgba(50, 184, 198, 0.2)',
              }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-[var(--color-primary)]">
                    {animatedValues[index] || 0}
                    <span className="text-2xl">{stat.unit}</span>
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)] mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


              <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-card-border)] shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Server className="text-[var(--color-primary)]" size={32} strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[var(--color-text)]">API Development</h3>
                </div>
                <p className="text-[var(--color-text-secondary)]">Scalable and efficient Services built at a professional level.</p>
              </div>

              <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-card-border)] shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="text-[var(--color-primary)]" size={32} strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[var(--color-text)]">Distributed Systems</h3>
                </div>
                <p className="text-[var(--color-text-secondary)]">Handling high concurrency and processing billions of streamed events.</p>
              </div>

              <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-card-border)] shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="text-[var(--color-primary)]" size={32} strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[var(--color-text)]">Machine Learning</h3>
                </div>
                <p className="text-[var(--color-text-secondary)]">Focusing on data ingestion, pattern analysis, and predictive forecasting.</p>
              </div>

              <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-card-border)] shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="text-[var(--color-primary)]" size={32} strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[var(--color-text)]">Ops</h3>
                </div>
                <p className="text-[var(--color-text-secondary)]">Analyze and build CI/CD pieplines with telemetry traces.</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
