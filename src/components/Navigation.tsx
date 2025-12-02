import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    setIsOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled
          ? 'rgba(19, 52, 59, 0.98)'
          : 'rgba(19, 52, 59, 0.95)',
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-[70px]">
          <div className="text-lg font-bold text-[var(--color-primary)]">
            Kiran Muppana
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeSection === link.id
                    ? 'text-[var(--color-primary)] bg-[var(--color-secondary)] shadow-lg scale-105 border border-[var(--color-primary)]'
                    : 'text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:shadow-lg hover:scale-105'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-secondary)] hover:shadow-lg hover:scale-105 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-secondary)] hover:shadow-lg hover:scale-105 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[var(--color-text)] hover:bg-[var(--color-secondary)] hover:shadow-lg hover:scale-105 rounded-lg transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden fixed top-[70px] left-0 right-0 bg-[rgba(19,52,59,0.98)] backdrop-blur-lg border-t border-[var(--color-border)]">
            <div className="flex flex-col items-center py-8 gap-2">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full max-w-xs px-6 py-3 text-center rounded-lg font-medium transition-all duration-300 ${
                    activeSection === link.id
                      ? 'text-[var(--color-primary)] bg-[var(--color-secondary)] shadow-lg scale-105 border border-[var(--color-primary)]'
                      : 'text-[var(--color-text)] hover:bg-[var(--color-secondary)] hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
