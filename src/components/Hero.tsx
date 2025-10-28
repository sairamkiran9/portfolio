import { useEffect, useState } from 'react';
import type { Stat } from '../types';

const stats: Stat[] = [
  { value: 5, unit: 'M+', label: 'Daily API Calls', shouldAnimate: true },
  { value: 99.99, unit: '%', label: 'System Uptime', shouldAnimate: false },
  { value: 90, unit: '%', label: 'Efficiency Gain', shouldAnimate: true },
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
        <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-center">
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
              AI Platform Engineer & Distributed Systems Architect
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-8 leading-normal">
              Building & Scaling AI Systems on Cloud Infrastructure | Expert in Distributed Systems & MLOps
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => scrollToSection('contact')}
                className="btn btn--primary btn--lg"
              >
                Get In Touch
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="btn btn--outline btn--lg"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-card-border)] shadow-lg">
            <div>
              <p className="mb-2">
                <strong className="text-[var(--color-primary)]">Kiran Muppana</strong>
              </p>
              <p className="text-[var(--color-text)] mb-2">Tallahassee, FL</p>
              <p className="text-[var(--color-text)] mb-2">(850) 943-4453</p>
              <p className="text-[var(--color-text)]">kiranmuppana36@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
