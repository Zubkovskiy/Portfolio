export type NavLink = {
  key: string;
  label: string;
  href: string;
};

export type HeroStat = {
  value: string;
  label: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type LanguageSkill = {
  name: string;
  level: string;
  proficiency: number;
};

export type ServiceItem = {
  title: string;
  description: string;
  linkLabel: string;
};

export type ProjectItem = {
  title: string;
  tags: string[];
  description: string;
  linkLabel: string;
  href?: string;
  image?: string;
  meta?: string;
};

export type EducationItem = {
  period: string;
  title: string;
  institution?: string;
  description?: string;
};

export type CertificatePart = {
  label: string;
  percent: number;
};

export type CertificateItem = {
  title: string;
  issuer: string;
  meta?: string;
  status: 'complete' | 'in-progress';
  percent: number;
  image?: string;
  imageCaption: string;
  verifyUrl?: string;
  verifyLabel?: string;
  parts?: CertificatePart[];
};

export type SectionCopy = {
  eyebrow: string;
  ghost: string;
  title: string;
  highlight: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogDescription: string;
    keywords: string[];
  };
  nav: {
    links: NavLink[];
    cta: string;
    menuLabel: string;
    closeMenuLabel: string;
  };
  hero: {
    eyebrow: string;
    greeting: string;
    name: string;
    roles: string[];
    bio: string;
    ctaPrimary: string;
    ctaDownload: string;
    ctaDownloadShort: string;
    stats: HeroStat[];
    codeCaption: string;
    floatingTags: string[];
  };
  boot: {
    lines: string[];
    ready: string;
    skip: string;
    caption: string;
  };
  marquee: string[];
  services: SectionCopy & {
    items: ServiceItem[];
    diagramLabels: {
      componentTree: string;
      componentTreeMeta: string;
      workflow: string;
      workflowMeta: string;
    };
  };
  about: SectionCopy & {
    bio: string;
    goalTitle: string;
    goal: string;
    profileCard: {
      fileName: string;
      location: string;
      focus: string;
      focusValue: string;
      learning: string;
      learningValue: string;
      status: string;
      pillars: string[];
    };
  };
  skills: SectionCopy & {
    groups: SkillGroup[];
  };
  languages: {
    title: string;
    items: LanguageSkill[];
  };
  certificates: SectionCopy & {
    note: string;
    completedLabel: string;
    inProgressLabel: string;
    items: CertificateItem[];
  };
  projects: SectionCopy & {
    note: string;
    items: ProjectItem[];
    imagePlaceholder: string;
  };
  education: SectionCopy & {
    items: EducationItem[];
  };
  contact: SectionCopy & {
    form: {
      nameLabel: string;
      namePh: string;
      emailLabel: string;
      emailPh: string;
      phoneLabel: string;
      phonePh: string;
      orLabel: string;
      contactHint: string;
      contactError: string;
      interestLabel: string;
      interestPh: string;
      interestOptions: string[];
      messageLabel: string;
      messagePh: string;
      submit: string;
      submitting: string;
      successMessage: string;
      errorMessage: string;
      mailtoFallback: string;
      mailtoFallbackAction: string;
      fieldErrors: {
        name: string;
        email: string;
        phone: string;
        message: string;
      };
      rateLimitError: string;
    };
    labels: {
      address: string;
      contact: string;
      statusShort: string;
    };
    info: {
      address: string;
      availability: string;
    };
  };
  footer: {
    tagline: string;
    navTitle: string;
    contactTitle: string;
    ctaTitle: string;
    builtWith: string;
    backToTop: string;
    copyright: string;
  };
  easterEgg: {
    title: string;
    subtitle: string;
    consoleHint: string;
  };
  cv: {
    documentLabel: string;
    subtitle: string;
    openness: string;
    backToSite: string;
    savePdf: string;
    sections: {
      profile: string;
      education: string;
      objective: string;
      skills: string;
      languages: string;
      certificates: string;
    };
    profile: string[];
    objective: string;
    statusLabels: Record<'complete' | 'in-progress', string>;
  };
  a11y: {
    skipToContent: string;
    scrollToTop: string;
    languageSwitch: string;
    readingProgress: string;
  };
};
