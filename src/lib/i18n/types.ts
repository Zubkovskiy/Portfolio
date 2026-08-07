/**
 * The content contract. Both dictionaries are typed as `Dictionary`, so a
 * string that exists in EN but not in UA is a compile error, not a blank
 * spot on the page.
 */

export type NavLink = {
  /** Stable id — used as a React key and by the scroll-spy. */
  key: string;
  label: string;
  /** In-page anchor, e.g. '#skills'. */
  href: string;
};

export type HeroStat = {
  /** Numeric-leading string, e.g. '1.5' or '12+'. The leading number counts up. */
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
  /** 0–100 proficiency bar. Explicit, so it is never inferred from a regex. */
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
  /** Live demo. Omit while a project is still a placeholder. */
  href?: string;
  /** Screenshot path under /public. */
  image?: string;
  /** Short factual role line, e.g. "Solo build · 2025". */
  meta?: string;
};

export type EducationItem = {
  period: string;
  title: string;
  /**
   * Optional: some entries have no name worth printing. Better to leave it
   * out than to ship a "add later" placeholder that never gets filled.
   */
  institution?: string;
  description?: string;
};

/** One track inside a multi-part course, e.g. frontend vs backend. */
export type CertificatePart = {
  label: string;
  /** 0–100 completion of this track. */
  percent: number;
};

export type CertificateItem = {
  title: string;
  issuer: string;
  /** Short factual line: hours, date, credential id. */
  meta?: string;
  status: 'complete' | 'in-progress';
  /** 0–100 overall completion. */
  percent: number;
  /** Path under /public. Omit to render the labelled empty slot. */
  image?: string;
  /** Caption for the image slot — also the alt text fallback. */
  imageCaption: string;
  /** Public verification link, when the issuer provides one. */
  verifyUrl?: string;
  verifyLabel?: string;
  /** Per-track breakdown, shown instead of a single bar when present. */
  parts?: CertificatePart[];
};

export type SectionCopy = {
  eyebrow: string;
  /** Oversized faint word rendered behind the heading. */
  ghost: string;
  title: string;
  highlight: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    /** Short description for og/twitter cards. */
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
      /** Inline messages shown under the field that failed validation. */
      fieldErrors: {
        name: string;
        email: string;
        phone: string;
        message: string;
      };
      /** Shown after too many submissions from one address. */
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
    /** Status wording for the CV's certificate list, keyed by item status. */
    statusLabels: Record<'complete' | 'in-progress', string>;
  };
  a11y: {
    skipToContent: string;
    scrollToTop: string;
    languageSwitch: string;
    readingProgress: string;
  };
};
