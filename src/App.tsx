import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  Download,
  Terminal,
  Code2,
  Server,
  Cloud,
  Zap,
  Menu,
  X,
  Database,
  Brain,
  ChevronRight,
  Sun,
  Moon,
  ExternalLink,
  Box,
  Lock,
  Search,
  Settings,
  Sparkles
} from 'lucide-react';

/** * UTILS 
 */
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * ANIMATION HELPER (Replaces motion/react for single-file portability)
 */
const simpleAnimate = (from: number, to: number, options: { duration: number, onUpdate: (val: number) => void }) => {
  const start = performance.now();
  const durationMs = options.duration * 1000;
  
  const frame = (time: number) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / durationMs, 1);
    // Ease Out Cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    
    const current = from + (to - from) * ease;
    options.onUpdate(current);
    
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  };
  requestAnimationFrame(frame);
};

/**
 * COMPONENT: GLOWING EFFECT
 */
interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
  themeColor?: string; // Added to support your Magma/Ocean themes
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = false,
    themeColor = "#f97316", // Default Orange
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          simpleAnimate(currentAngle, newAngle, {
            duration: movementDuration,
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, ${themeColor} 10%, transparent 20%),
                radial-gradient(circle at 40% 40%, ${themeColor} 5%, transparent 15%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  ${themeColor} 0%,
                  transparent calc(25% / var(--repeating-conic-gradient-times)),
                  ${themeColor} calc(50% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);
GlowingEffect.displayName = "GlowingEffect";

/**
 * DATA STORE
 */
const RESUME_DATA = {
  name: "Kiran Muppana",
  role: "Software Engineer",
  contact: {
    email: "kiranmuppana36@gmail.com",
    github: "#",
    linkedin: "#"
  },
  experience: [
    {
      company: "Florida State University",
      role: "Software Engineer 2",
      period: "Oct 2024 - Present",
      description: "Architecting LangGraph workflows and scalable energy management systems.",
      highlights: [
        "Architected LangGraph-orchestrated ML workflow for 150K+ documents, eliminating manual processes and saving 30+ hours weekly.",
        "Migrated services to Go with gRPC, sustaining 1.8M TPS per instance with zero scaling needs.",
        "Built multimodal LlamaIndex query engine integrating PDFs and dashboards for 5 departments.",
        "Led critical frontend performance optimization, reducing bundle size by 70% and initial route size by 94%."
      ]
    },
    {
      company: "Florida State University",
      role: "Software Engineer",
      period: "Dec 2022 - Oct 2024",
      description: "Developing recommendation algorithms and high-throughput data pipelines.",
      highlights: [
        "Developed recommendation algorithms increasing revenue potential by 15% through personalized product suggestions.",
        "Optimized SQL queries reducing p95 latency from 2.3s to <500ms for ML feature extraction.",
        "Designed Spark/AWS ETL workflows processing 500K+ events/sec with data quality checks.",
        "Deployed Redis for distributed caching, reducing recommendation latency by 45%."
      ]
    },
    {
      company: "Amdocs",
      role: "Software Engineer",
      period: "Jul 2021 - Jul 2022",
      description: "Building high-throughput data ingestion systems for telecom.",
      highlights: [
        "Designed ingestion system streaming 10TB/day into AWS Kinesis for real-time customer analytics.",
        "Built PySpark feature engineering pipelines processing 100M+ customer records.",
        "Reduced cloud infrastructure costs by 30% using AWS Lambda and Step Functions."
      ]
    }
  ],
  projects: [
    {
      id: 'whiteboard-ai',
      title: 'Whiteboard.ai',
      subtitle: 'AI-Powered System Design Copilot',
      category: 'ML/AI',
      status: 'active',
      statusLabel: 'Active Development',
      description: 'GitHub Copilot for System Architecture - An intelligent system design tool providing real-time AI suggestions for drawing system architecture diagrams.',
      metrics: [
        { value: 'Sub-2s', label: 'Response Time' },
        { value: 'Multi-LLM', label: 'Provider Support' },
        { value: 'Real-time', label: 'AI Suggestions' },
      ],
      features: [
        'Real-time AI suggestions',
        'Pattern recognition for components',
        'Multi-LLM support (OpenAI, Groq)',
        'Full TypeScript validation',
      ],
      technologies: ['FastAPI', 'Next.js', 'TypeScript', 'LangChain', 'OpenAI'],
      links: [
        { text: 'View on GitHub', url: 'https://github.com/sairamkiran9/whiteboard.ai', isPrimary: true },
      ],
      isFeatured: true,
    },
    {
      id: 'atomic-habits-agent',
      title: 'Atomic Habits Agent',
      subtitle: 'Full-Stack Habit Tracking with AI',
      category: 'Backend',
      status: 'production',
      statusLabel: 'Production Ready',
      description: 'Comprehensive habit tracking application inspired by James Clear\'s Atomic Habits, featuring intelligent recommendations.',
      metrics: [
        { value: 'Full-Stack', label: 'Architecture' },
        { value: 'JWT', label: 'Authentication' },
        { value: 'RAG', label: 'AI Integration' },
      ],
      features: [
        'Smart streak tracking',
        'Categorized habit management',
        'Responsive dark/light mode UI',
        'Secure JWT authentication',
      ],
      technologies: ['Next.js 14', 'FastAPI', 'SQLAlchemy', 'JWT', 'Tailwind CSS'],
      links: [
        { text: 'GitHub', url: 'https://github.com/sairamkiran9/atomic-habits-agent', isPrimary: false },
        { text: 'Live Demo', url: 'https://atomic-habits-agent.vercel.app', isPrimary: true },
      ],
    },
    {
      id: 'helpdesk-ai',
      title: 'Helpdesk AI System',
      subtitle: 'Intelligent IT Support Automation',
      category: 'ML/AI',
      status: 'production',
      statusLabel: 'Production Ready',
      description: 'AI-powered help desk system that classifies queries and generates contextual responses using LLMs with smart escalation.',
      metrics: [
        { value: '75%', label: 'Accuracy' },
        { value: '<3s', label: 'Response Time' },
        { value: '50+', label: 'Concurrent Users' },
      ],
      features: [
        'Intelligent query classification',
        'Vector search (ChromaDB)',
        'Multi-provider LLM integration',
        'Context-aware escalation',
      ],
      technologies: ['FastAPI', 'ChromaDB', 'Groq API', 'Docker'],
      links: [
        { text: 'GitHub', url: 'https://github.com/sairamkiran9/helpdesk_ai_system', isPrimary: true },
      ],
    },
    {
      id: 'attngan-trans',
      title: 'AttnGAN-trans',
      subtitle: 'Transformer-Enhanced Text-to-Image',
      category: 'ML/AI',
      status: 'research',
      statusLabel: 'Research Published',
      description: 'Research implementation of transformer models enhancing AttnGAN for text-to-image generation, published in Elsevier.',
      metrics: [
        { value: '3', label: 'Model Variants' },
        { value: '2', label: 'Datasets' },
        { value: 'Published', label: 'Paper' },
      ],
      features: [
        'AttnGANBERT/XL/GPT variants',
        'Pre-trained encoder models',
        'Attention map visualization',
        'Inception score evaluation',
      ],
      technologies: ['PyTorch', 'Python', 'BERT', 'GPT', 'CUDA'],
      links: [
        { text: 'GitHub', url: 'https://github.com/sairamkiran9/AttnGAN-trans', isPrimary: false },
        { text: 'Research Paper', url: 'https://www.sciencedirect.com/science/article/abs/pii/S026288562100189X', isPrimary: true },
      ],
    },
    {
      id: 'network-emulator',
      title: 'Network Emulator',
      subtitle: 'Scalable Network Protocol Simulator',
      category: 'Backend',
      status: 'academic',
      statusLabel: 'Academic Project',
      description: 'Comprehensive network simulator implementing OSI layer protocols, ARP resolution, and routing algorithms.',
      metrics: [
        { value: 'Full OSI', label: 'Stack' },
        { value: 'Multi-node', label: 'Topology' },
        { value: 'Real-time', label: 'Comms' },
      ],
      features: [
        'OSI protocol implementation',
        'Real-world ARP simulation',
        'Multi-homed host support',
        'Bridge self-learning table',
      ],
      technologies: ['Python', 'Socket Programming', 'Linux'],
      links: [
        { text: 'View on GitHub', url: 'https://github.com/sairamkiran9/network-emulator', isPrimary: true },
      ],
    },
  ]
};

// Skill Categories
const SKILL_CATEGORIES = [
  {
    title: "Languages & Core",
    icon: Code2,
    skills: ["Python", "Go (Golang)", "Java", "TypeScript", "SQL", "Shell Scripting"]
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: ["PyTorch", "LangChain", "LangGraph", "LlamaIndex", "AWS SageMaker", "RAG Systems", "Hugging Face"]
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    skills: ["AWS (ECS, Lambda, Kinesis)", "Kubernetes", "Terraform", "Docker", "Jenkins", "GitHub Actions"]
  },
  {
    title: "Data & Distributed Systems",
    icon: Database,
    skills: ["Apache Kafka", "Spark / PySpark", "PostgreSQL", "Redis", "MongoDB", "gRPC", "GraphQL"]
  }
];

/**
 * RADAR CHART COMPONENT
 */
const SkillRadarChart = ({ isDark }: { isDark: boolean }) => {
  const size = 300;
  const center = size / 2;
  const radius = 100;
  const skills = [
    { name: "Backend", value: 95 },
    { name: "AI / ML", value: 90 },
    { name: "Cloud Infra", value: 85 },
    { name: "DevOps", value: 80 },
    { name: "Data Eng", value: 85 },
    { name: "Frontend", value: 65 },
  ];
  
  const colors = {
    grid: isDark ? "#262626" : "#e2e8f0",
    label: isDark ? "fill-stone-400" : "fill-slate-500",
    bg: isDark ? "bg-neutral-900/30 border-neutral-800" : "bg-white/60 border-slate-200",
    stroke: isDark ? "#f97316" : "#0891b2",
    fill: isDark ? "rgba(249, 115, 22, 0.2)" : "rgba(8, 145, 178, 0.1)",
    dot: isDark ? "#fb923c" : "#06b6d4",
    liveText: isDark ? "text-orange-500" : "text-cyan-600"
  };

  const getPoint = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const x = center + (radius * (value / 100)) * Math.cos(angle);
    const y = center + (radius * (value / 100)) * Math.sin(angle);
    return { x, y };
  };

  const totalSkills = skills.length;
  const polyPoints = skills.map((s, i) => {
    const { x, y } = getPoint(s.value, i, totalSkills);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className={`relative flex flex-col items-center justify-center p-6 rounded-sm backdrop-blur-sm border transition-colors duration-500 w-full max-w-[300px] h-auto aspect-square mx-auto lg:mx-0 ${colors.bg}`}>
      <div className={`absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest animate-pulse ${colors.liveText}`}>
        Live Metrics
      </div>
      <svg viewBox={`0 0 ${size} ${size}`} className="overflow-visible w-full h-full">
        {[20, 40, 60, 80, 100].map((level, idx) => (
          <polygon
            key={idx}
            points={skills.map((_, i) => {
              const { x, y } = getPoint(level, i, totalSkills);
              return `${x},${y}`;
            }).join(" ")}
            fill="none"
            stroke={colors.grid}
            strokeWidth="1"
            className="transition-all duration-1000"
          />
        ))}
        {skills.map((_, i) => {
          const { x, y } = getPoint(100, i, totalSkills);
          return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke={colors.grid} strokeWidth="1" />;
        })}
        <polygon points={polyPoints} fill={colors.fill} stroke={colors.stroke} strokeWidth="2" className="drop-shadow-md transition-all duration-500" />
        {skills.map((s, i) => {
          const { x, y } = getPoint(s.value, i, totalSkills);
          return <circle key={i} cx={x} cy={y} r="3" fill={colors.dot} className="hover:r-4 transition-all duration-300" />;
        })}
        {skills.map((s, i) => {
          const { x, y } = getPoint(115, i, totalSkills);
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className={`text-[10px] font-mono uppercase tracking-wider transition-colors duration-500 ${colors.label}`}>
              {s.name}
            </text>
          );
        })}
      </svg>
      <div className={`mt-4 text-xs font-mono transition-colors ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>
        Skill Proficiency Distribution
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = activeTab === 'All' 
    ? RESUME_DATA.projects 
    : RESUME_DATA.projects.filter(p => p.category === activeTab);

  // --- THEME ENGINE ---
  const theme = {
    accentText: isDark ? 'text-orange-500' : 'text-cyan-600',
    accentTextHover: isDark ? 'hover:text-orange-400' : 'hover:text-cyan-500',
    accentBg: isDark ? 'bg-orange-500' : 'bg-cyan-600',
    accentBgHover: isDark ? 'hover:bg-orange-400' : 'hover:bg-cyan-500',
    accentBorder: isDark ? 'border-orange-500' : 'border-cyan-600',
    accentBorderHover: isDark ? 'hover:border-orange-500' : 'hover:border-cyan-600',
    bg: isDark ? 'bg-neutral-950' : 'bg-slate-50',
    navBg: isDark ? 'bg-neutral-950/90' : 'bg-slate-50/90',
    cardBg: isDark ? 'bg-neutral-950' : 'bg-white',
    text: isDark ? 'text-stone-300' : 'text-slate-600',
    heading: isDark ? 'text-stone-100' : 'text-slate-900',
    subHeading: isDark ? 'text-stone-200' : 'text-slate-800',
    muted: isDark ? 'text-neutral-500' : 'text-slate-500',
    border: isDark ? 'border-neutral-900' : 'border-slate-200',
    borderStrong: isDark ? 'border-neutral-800' : 'border-slate-300',
    cardHover: isDark ? 'hover:shadow-[0_0_25px_-10px_rgba(234,88,12,0.15)]' : 'hover:shadow-xl hover:shadow-cyan-900/5',
    badge: isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-slate-100 border-slate-200',
    selection: isDark ? 'selection:bg-orange-500/30 selection:text-orange-50' : 'selection:bg-cyan-200 selection:text-cyan-900',
    statusPing: isDark ? 'bg-orange-400' : 'bg-cyan-400',
    statusDot: isDark ? 'bg-orange-500' : 'bg-cyan-500',
    statusBg: isDark ? 'bg-orange-500/5 border-orange-500/20' : 'bg-cyan-500/5 border-cyan-600/20',
    statusText: isDark ? 'text-orange-500/90' : 'text-cyan-700',
    primaryBtn: isDark ? 'bg-stone-100 text-neutral-950 hover:bg-white' : 'bg-slate-800 text-white hover:bg-slate-700',
    themeColor: isDark ? '#f97316' : '#0891b2',
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${theme.bg} ${theme.text} ${theme.selection}`}>
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? `${theme.navBg} backdrop-blur-md ${theme.border} py-3` : 'bg-transparent border-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className={`text-sm font-bold tracking-tight flex items-center gap-2 group cursor-pointer ${theme.heading}`}>
              <div className={`w-2 h-2 rounded-sm transition-colors ${theme.accentBg}`}></div>
              <span className={`transition-colors uppercase ${theme.accentTextHover}`}>Kiran Muppana</span>
            </div>
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`flex items-center gap-2 px-2 py-1 rounded-full border transition-all duration-300 ${isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-orange-400' : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-cyan-600'}`}
              aria-label="Toggle Theme"
            >
              <div className="relative w-4 h-4">
                <Sun size={16} className={`absolute top-0 left-0 transition-transform duration-500 ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
                <Moon size={16} className={`absolute top-0 left-0 transition-transform duration-500 ${isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
              </div>
            </button>
          </div>
          <div className={`hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest ${theme.muted}`}>
            <a href="#about" className={`transition-colors ${theme.accentTextHover}`}>About</a>
            <a href="#skills" className={`transition-colors ${theme.accentTextHover}`}>Skills</a>
            <a href="#work" className={`transition-colors ${theme.accentTextHover}`}>Work</a>
            <a href="#experience" className={`transition-colors ${theme.accentTextHover}`}>Experience</a>
            <a href="#contact" className={`transition-colors ${theme.accentTextHover}`}>Contact</a>
            <a href="#" className={`flex items-center gap-2 border px-4 py-1.5 rounded-sm transition-colors ${theme.accentBorderHover} ${isDark ? 'bg-neutral-900/50 border-neutral-800 text-stone-300' : 'bg-white border-slate-200 text-slate-600'}`}>
              Resume <Download size={12} />
            </a>
          </div>
          <button className={`md:hidden ${theme.heading}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 w-full border-b py-4 px-6 flex flex-col gap-4 text-sm font-medium ${isDark ? 'bg-neutral-950 border-neutral-900 text-stone-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
            <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a href="#" className={theme.accentText}>Download Resume</a>
          </div>
        )}
      </nav>

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-32 pb-24 space-y-24 md:space-y-32">

        {/* HERO SECTION */}
        <section id="about" className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8 md:space-y-10 pt-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-sm ${theme.statusBg}`}>
              <span className="relative flex h-1.5 w-1.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.statusPing}`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${theme.statusDot}`}></span>
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${theme.statusText}`}>Open to Work</span>
            </div>
            <div className="space-y-6 md:space-y-8">
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1] md:leading-[0.95] ${theme.heading}`}>
                Software Engineer. <br />
                <span className={`${isDark ? 'text-neutral-600' : 'text-slate-400'}`}>System Architect.</span>
              </h1>
              <div className={`relative border-l-2 pl-6 md:pl-8 py-2 ${theme.accentBorder}`}>
                <p className={`text-xl md:text-2xl font-medium italic mb-4 ${theme.subHeading}`}>
                  "Not from a top-tier university. Not from FAANG."
                </p>
                <p className={`text-base md:text-lg leading-relaxed max-w-xl ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  I trust in <span className={`${theme.accentText} font-bold`}>skills</span>, <span className={`${theme.accentText} font-bold`}>consistency</span>, and the relentless pursuit of mastery. 
                  Like water, I adapt and flow through complex engineering challenges.
                </p>
              </div>
            </div>
            <p className={`text-sm md:text-base max-w-lg leading-relaxed ${isDark ? 'text-stone-400/80' : 'text-slate-500'}`}>
              Specialized in building high-throughput backend services (Go/Java) and integrating practical Machine Learning workflows (AWS/Python).
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#work" className={`group flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-sm transition-all shadow-lg ${theme.primaryBtn}`}>
                See Selected Work <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
              </a>
              <a href="mailto:kiranmuppana36@gmail.com" className={`text-sm font-bold border px-6 py-3 rounded-sm transition-colors ${theme.subHeading} ${theme.borderStrong} ${theme.accentBorderHover} ${theme.accentTextHover}`}>
                Let's Talk
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <SkillRadarChart isDark={isDark} />
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className={`border-t pt-24 ${theme.border}`}>
          <div className="mb-12">
            <h2 className={`text-2xl font-medium mb-2 flex items-center gap-2 ${theme.heading}`}>
              Technical Arsenal <span className={`${theme.muted} text-sm font-mono align-middle`}>01</span>
            </h2>
            <p className={`${theme.muted} text-sm max-w-md leading-relaxed`}>
              A robust stack built for scalability, performance, and intelligent automation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className={`relative h-full rounded-2xl border p-2 ${theme.borderStrong}`}>
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  themeColor={theme.themeColor}
                />
                <div className={`relative h-full rounded-xl p-6 transition-colors ${isDark ? 'bg-neutral-900/50' : 'bg-white/80'}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <cat.icon size={20} className={isDark ? 'text-orange-500' : 'text-cyan-600'} />
                    <h3 className={`text-xs font-bold uppercase tracking-widest ${theme.subHeading}`}>{cat.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {cat.skills.map((skill, i) => (
                      <li key={i} className={`flex items-center gap-2 text-sm ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                        <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-neutral-600' : 'bg-slate-300'}`}></div>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="work" className={`border-t pt-24 ${theme.border}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
               <h2 className={`text-2xl font-medium mb-2 flex items-center gap-2 ${theme.heading}`}>
                 Selected Works <span className={`${theme.muted} text-sm font-mono align-middle`}>02</span>
               </h2>
               <p className={`${theme.muted} text-sm max-w-md leading-relaxed`}>
                 High-impact systems, from ML recommendation engines to distributed backend services.
               </p>
            </div>
            <div className={`flex flex-wrap gap-1 p-1 rounded-sm border ${isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-slate-100 border-slate-200'}`}>
              {['All', 'ML/AI', 'Backend', 'DevOps'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all ${
                    activeTab === cat 
                      ? `${isDark ? 'bg-neutral-800' : 'bg-white shadow-sm'} ${theme.accentText}` 
                      : `${theme.muted} ${theme.accentTextHover}`
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className={`relative rounded-2xl border p-2 ${theme.borderStrong}`}>
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  themeColor={theme.themeColor}
                />
                <div className={`relative h-full rounded-xl p-6 md:p-8 transition-colors ${isDark ? 'bg-neutral-900/50' : 'bg-white/80'}`}>
                  {/* Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className={`text-xl md:text-2xl font-bold tracking-tight transition-colors ${theme.heading} group-hover:${theme.accentText}`}>
                          {project.title}
                        </h3>
                        <div className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm border ${theme.badge} ${theme.muted}`}>
                          {project.statusLabel}
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${theme.accentText}`}>{project.subtitle}</div>
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed mb-8 max-w-3xl ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className={`grid grid-cols-3 gap-4 py-6 mb-8 border-y ${theme.borderStrong}`}>
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className={`text-lg md:text-xl font-bold ${theme.heading}`}>{metric.value}</div>
                        <div className={`text-[10px] font-bold uppercase tracking-wider ${theme.muted}`}>{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${theme.subHeading}`}>Key Features</h4>
                    <ul className={`grid md:grid-cols-2 gap-3 text-sm ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className={`mt-2 w-1 h-1 rounded-full flex-shrink-0 ${theme.accentBg}`}></span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags & Links */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(t => (
                        <span key={t} className={`text-[10px] font-mono px-2.5 py-1.5 rounded-sm border ${isDark ? 'text-neutral-400 bg-neutral-900 border-neutral-800' : 'text-slate-500 bg-slate-50 border-slate-200'}`}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {project.links.map((link, idx) => (
                        <a 
                          key={idx}
                          href={link.url}
                          className={`flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-sm transition-all ${
                            link.isPrimary 
                              ? theme.primaryBtn 
                              : `border ${theme.borderStrong} ${theme.subHeading} hover:${theme.accentBorder} hover:${theme.accentText}`
                          }`}
                        >
                          {link.text}
                          {link.isPrimary ? <ArrowUpRight size={14} /> : <ExternalLink size={14} />}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className={`border-t pt-24 ${theme.border}`}>
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className={`text-2xl font-medium mb-4 flex items-center gap-2 ${theme.heading}`}>
                 Experience <span className={`${theme.muted} text-sm font-mono align-middle`}>03</span>
              </h2>
              <p className={`${theme.muted} text-sm leading-relaxed mb-8`}>
                Solving scalability problems and optimizing critical paths in production environments.
              </p>
              <a href="#" className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border px-4 py-3 rounded-sm transition-colors w-fit ${theme.subHeading} ${theme.borderStrong} ${theme.accentBorderHover} ${theme.accentTextHover}`}>
                Download Full Resume <Download size={14} />
              </a>
            </div>
            <div className="md:col-span-8 space-y-12">
              {RESUME_DATA.experience.map((exp, idx) => (
                <div key={idx} className={`relative pl-8 border-l group ${theme.accentBorderHover} transition-colors ${theme.borderStrong}`}>
                  <div className={`absolute -left-[5px] top-2 w-[9px] h-[9px] border rounded-full transition-colors ${isDark ? 'bg-neutral-950 border-neutral-600 group-hover:bg-orange-500 group-hover:border-orange-500' : 'bg-slate-50 border-slate-400 group-hover:bg-cyan-500 group-hover:border-cyan-500'}`}></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h3 className={`text-xl font-bold ${theme.subHeading}`}>{exp.role}</h3>
                    <span className={`text-xs font-mono px-2 py-1 rounded-sm border mt-2 sm:mt-0 ${theme.badge} ${theme.muted}`}>{exp.period}</span>
                  </div>
                  <div className={`text-sm font-bold mb-4 ${theme.accentText}`}>{exp.company}</div>
                  <p className={`text-sm mb-5 italic max-w-2xl ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>{exp.description}</p>
                  <ul className="space-y-3">
                    {exp.highlights.map((item, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                        <span className={`mt-2 text-[6px] ${theme.accentText}`}>●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <section id="contact" className={`border-t pt-16 ${theme.border}`}>
          <div className={`border p-8 md:p-12 rounded-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 ${isDark ? 'bg-neutral-900/20 border-neutral-800/50' : 'bg-cyan-50/50 border-cyan-100'}`}>
            <div>
               <h2 className={`text-3xl font-bold mb-2 ${theme.heading}`}>Ready to Collaborate?</h2>
               <p className={`${theme.muted} text-sm max-w-md`}>
                 Open for opportunities in Backend Engineering and ML Infrastructure. Let's build something scalable.
               </p>
            </div>
             <div className="flex items-center gap-4">
               <a href={`mailto:${RESUME_DATA.contact.email}`} className={`flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded-sm transition-colors shadow-lg ${theme.accentBg} ${theme.accentBgHover}`}>
                 <Mail size={16} /> Send Email
               </a>
               <a href={RESUME_DATA.contact.github} className={`p-3 border rounded-sm transition-colors ${theme.accentBorderHover} ${theme.accentTextHover} ${isDark ? 'bg-neutral-900 text-neutral-400 border-neutral-800' : 'bg-white text-slate-500 border-slate-200'}`}>
                 <Github size={20} />
               </a>
               <a href={RESUME_DATA.contact.linkedin} className={`p-3 border rounded-sm transition-colors ${theme.accentBorderHover} ${theme.accentTextHover} ${isDark ? 'bg-neutral-900 text-neutral-400 border-neutral-800' : 'bg-white text-slate-500 border-slate-200'}`}>
                 <Linkedin size={20} />
               </a>
             </div>
          </div>
          <div className={`mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest ${theme.border} ${theme.muted}`}>
            <span>© {new Date().getFullYear()} Kiran Muppana</span>
            <span className="flex items-center gap-2">
              <Code2 size={12}/> Built with React & Tailwind
            </span>
          </div>
        </section>

      </main>
    </div>
  );
}