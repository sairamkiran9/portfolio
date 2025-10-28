export interface Stat {
  value: number;
  unit: string;
  label: string;
  shouldAnimate?: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  status: 'active' | 'production' | 'research' | 'academic';
  statusLabel: string;
  description: string;
  metrics: {
    value: string;
    label: string;
  }[];
  features: string[];
  technologies: string[];
  links: {
    text: string;
    url: string;
    isPrimary: boolean;
  }[];
  isFeatured?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
