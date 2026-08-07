import type { Dictionary } from '../types';

export const en: Dictionary = {
  meta: {
    title: 'Bohdan Zubkivskiy — Frontend Developer & AI Automation Specialist',
    description:
      'Frontend developer and AI automation specialist based in Chernihiv, Ukraine. I build fast, clean interfaces with React, Next.js and TypeScript, and practical AI-driven automations.',
    ogDescription:
      'Frontend developer & AI automation specialist based in Chernihiv, Ukraine. React · Next.js · TypeScript · AI automation.',
    keywords: [
      'frontend developer',
      'React developer',
      'Next.js',
      'TypeScript',
      'AI automation',
      'Chernihiv',
      'Ukraine',
      'Bohdan Zubkivskiy',
    ],
  },

  nav: {
    links: [
      { key: 'home', label: 'Home', href: '#top' },
      { key: 'services', label: 'Services', href: '#services' },
      { key: 'skills', label: 'Skills', href: '#skills' },
      { key: 'certificates', label: 'Certificates', href: '#certificates' },
      { key: 'projects', label: 'Projects', href: '#projects' },
      { key: 'education', label: 'Education', href: '#education' },
      { key: 'contact', label: 'Contact', href: '#contact' },
    ],
    cta: "Let's Talk",
    menuLabel: 'Open menu',
    closeMenuLabel: 'Close menu',
  },

  hero: {
    eyebrow: 'Open to Freelance & Full-Time Work',
    greeting: "Hi, I'm",
    name: 'Bohdan Zubkivskiy',
    roles: ['Frontend Developer', 'AI & Automation Specialist', 'Aspiring Full-Stack Developer'],
    bio: 'I build fast, accessible interfaces with React, TypeScript and Next.js, and practical AI-driven automations. Five public projects shipped — currently writing frontend at Liha Yunaited and growing into full-stack.',
    ctaPrimary: 'View Projects',
    ctaDownload: 'Download CV',
    ctaDownloadShort: 'CV',
    stats: [
      { value: '5', label: 'Live Projects' },
      { value: '1.5', label: 'Certificates' },
      { value: '2', label: 'Languages' },
    ],
    codeCaption: 'portfolio.tsx',
    floatingTags: [
      'React',
      'Next.js',
      'TypeScript',
      'Figma',
      'AI',
      'n8n',
      'Tailwind CSS',
      'Zustand',
      'REST API',
      'Automation',
    ],
  },

  boot: {
    lines: [
      'initializing zubkivskiy.dev …',
      'mounting frontend toolkit … OK',
      'loading AI automation modules … OK',
      'establishing secure connection … OK',
      'compiling portfolio … OK',
    ],
    ready: 'ACCESS GRANTED',
    skip: 'press any key to skip',
    caption: 'boot.sh — zubkivskiy.dev',
  },

  marquee: [
    'Frontend Development',
    'React & Next.js',
    'TypeScript',
    'AI Automation',
    'Tailwind & Sass',
    'Full-Stack Development',
  ],

  services: {
    eyebrow: 'What I Offer',
    ghost: 'SERVICES',
    title: 'Services I',
    highlight: 'Provide',
    items: [
      {
        title: 'Frontend Web Development',
        description:
          'Responsive, pixel-precise interfaces — from landing pages to full product UI — built in React and TypeScript with semantic markup, component-driven structure and code that stays readable after handover.',
        linkLabel: 'Learn more',
      },
      {
        title: 'AI & Automation Solutions',
        description:
          'Practical automations that remove repetitive manual work: n8n workflows, LLM-backed content pipelines and internal tooling, wired into the APIs and webhooks you already use.',
        linkLabel: 'Learn more',
      },
    ],
    diagramLabels: {
      componentTree: 'component tree',
      componentTreeMeta: 'react · ts',
      workflow: 'workflow',
      workflowMeta: 'live',
    },
  },

  about: {
    eyebrow: 'Profile',
    ghost: 'PROFILE',
    title: 'Who is',
    highlight: 'Bohdan',
    bio: "I'm a frontend developer building interactive, production-ready interfaces. My path started with hand-written HTML and CSS, grew through JavaScript and React, and now runs on TypeScript, Next.js and AI-assisted workflows. I've shipped five public projects — from pixel-accurate landing pages to a full e-commerce storefront with client-side routing, global state and a persisted cart — and I currently write frontend at Liha Yunaited. I care about the craft as much as the code: semantic markup, predictable state, and interfaces that feel as good as they work.",
    goalTitle: 'Career Objective',
    goal: "I do my best work on a team that shares what it knows and gives honest feedback. Right now I'm deepening my backend — Node.js, APIs, working with data — so I can see a feature through to the end instead of stopping where the frontend does. I'm looking for a frontend or full-stack role where I take a feature from idea to release, learn from stronger engineers, and grow into wider ownership.",
    profileCard: {
      fileName: 'profile.json',
      location: 'location',
      focus: 'focus',
      focusValue: 'Frontend · AI · Full-Stack',
      learning: 'learning',
      learningValue: 'Node.js / APIs',
      status: 'status',
      pillars: ['Frontend', 'AI', 'Automation', 'Full-Stack'],
    },
  },

  skills: {
    eyebrow: 'My Toolkit',
    ghost: 'SKILLS',
    title: 'Skills &',
    highlight: 'Expertise',
    groups: [
      { label: 'Core Stack', items: ['HTML5', 'JavaScript', 'TypeScript', 'React', 'Next.js'] },
      {
        label: 'Markup & Styling',
        items: [
          'CSS3',
          'Sass / SCSS',
          'Less',
          'CSS Modules',
          'Tailwind CSS',
          'BEM',
          'Flexbox & Grid',
          'Responsive Layout',
          'Figma',
        ],
      },
      {
        label: 'AI & Automation',
        items: [
          'n8n',
          'AI-Assisted Development',
          'Prompt Engineering',
          'Workflow Automation',
          'LLM APIs',
          'Webhooks & Integrations',
        ],
      },
      {
        label: 'Tools & Integrations',
        items: ['Zustand', 'REST API', 'Git', 'GitHub', 'npm', 'Vite'],
      },
      { label: 'Currently Learning', items: ['Backend Development', 'Node.js', 'Full-Stack Architecture'] },
    ],
  },

  languages: {
    title: 'Languages',
    items: [
      { name: 'Ukrainian', level: 'Native', proficiency: 100 },
      { name: 'English', level: 'Technical', proficiency: 65 },
    ],
  },

  certificates: {
    eyebrow: 'Credentials',
    ghost: 'CERTIFICATES',
    title: 'My',
    highlight: 'Certificates',
    note: 'One completed course and one still in progress.',
    completedLabel: 'Completed',
    inProgressLabel: 'In Progress',
    items: [
      {
        title: 'Web Developer 2022',
        issuer: 'Udemy · Ivan Petrychenko',
        meta: '33.5 hours · issued 9 Aug 2022',
        status: 'complete',
        percent: 100,
        image: '/certificates/udemy-web-developer-2022.jpg',
        imageCaption: 'Udemy Web Developer 2022 certificate',
        verifyUrl: 'https://ude.my/UC-bad52f7f-3a46-43ea-ad7e-1d30a8791c41',
        verifyLabel: 'Verify certificate',
      },
      {
        title: 'Full-Stack Developer',
        issuer: 'In progress',
        meta: 'Frontend track finished, backend under way',
        status: 'in-progress',
        percent: 60,
        imageCaption: 'Certificate scan goes here once finished',
        parts: [
          { label: 'Frontend', percent: 100 },
          { label: 'Backend', percent: 20 },
        ],
      },
    ],
  },

  projects: {
    eyebrow: 'Selected Work',
    ghost: 'PROJECTS',
    title: 'Featured',
    highlight: 'Projects',
    note: 'Every project below is live — open any of them and click around.',
    items: [
      {
        title: 'Nice Gadgets',
        tags: ['React', 'TypeScript', 'SCSS', 'Zustand'],
        description:
          'A full e-commerce storefront for phones, tablets and accessories: catalogue with filtering, sorting and pagination, product pages with image galleries and colour/capacity switching, plus cart and favourites persisted in global state.',
        linkLabel: 'Open live demo',
        href: 'https://zubkovskiy.github.io/react_phone-catalog/',
        image: '/projects/Nice-Gadgets.jpg',
        meta: 'Solo build · client-side routing & state',
      },
      {
        title: 'MyBike',
        tags: ['HTML', 'SCSS', 'Responsive'],
        description:
          'Pixel-accurate landing page built from a design mockup. Fluid grid from 320px to desktop, a burger-menu navigation layer and a validated contact form — hand-written semantic markup, no framework.',
        linkLabel: 'Open live demo',
        href: 'https://zubkovskiy.github.io/layout_landing-page/',
        image: '/projects/MyBike.jpg',
        meta: 'Solo build · layout from mockup',
      },
      {
        title: 'Hoobank',
        tags: ['HTML', 'CSS', 'Landing'],
        description:
          'Fintech marketing site with a dark, gradient-heavy visual system: hero with statistics band, feature and testimonial sections, and a partner logo grid that reflows cleanly down to mobile.',
        linkLabel: 'Open live demo',
        href: 'https://zubkovskiy.github.io/Portfolio/projects/Hoobank/build/index.html',
        image: '/projects/hoobank.jpg',
        meta: 'Solo build · dark UI system',
      },
      {
        title: 'Auto Express',
        tags: ['HTML', 'CSS', 'jQuery'],
        description:
          'Commercial landing page for a car import service: a service-step walkthrough, an image carousel and a lightbox gallery, wired up with jQuery plugins and a lead-capture form.',
        linkLabel: 'Open live demo',
        href: 'https://zubkovskiy.github.io/Portfolio/projects/AutoExpress/index.html',
        image: '/projects/autoExpress.jpg',
        meta: 'Solo build · carousel & gallery',
      },
      {
        title: 'Xiaomi Himo',
        tags: ['HTML', 'CSS', 'Landing'],
        description:
          'Product landing page for an electric bike: detailed specification blocks, a feature breakdown and an image slider, laid out on a strict grid and tuned for readability on small screens.',
        linkLabel: 'Open live demo',
        href: 'https://zubkovskiy.github.io/Portfolio/projects/Xiaomi-Himo/index.html',
        image: '/projects/Xiaomi-Himo-C26.jpg',
        meta: 'Solo build · product page',
      },
    ],
    imagePlaceholder: 'Project screenshot',
  },

  education: {
    eyebrow: 'Academic Path',
    ghost: 'EDUCATION',
    title: 'Education &',
    highlight: 'Growth',
    items: [
      {
        period: '2026 — Present',
        title: 'Junior Frontend Developer',
        institution: 'Liha Yunaited LLC',
        description: 'Current position.',
      },
      {
        period: '2023',
        title: 'Internship on a development team',
        description: 'Six months working in a real team under a team lead.',
      },
      {
        period: '2019–2022',
        title: "Bachelor's — Cybersecurity",
        institution: 'Chernihiv National University of Technology',
        description: "Bachelor's diploma issued 30.06.2022.",
      },
      {
        period: '2015–2019',
        title: 'Junior Specialist — Computer Systems & Networks',
        institution: 'College of Transport & Computer Technologies (CTCT, ChNTU)',
        description: 'Junior specialist diploma issued 30.06.2019.',
      },
      {
        period: 'Until 2015',
        title: 'General Secondary Education',
        institution: 'School No. 19, Chernihiv',
      },
    ],
  },

  contact: {
    eyebrow: 'Get in Touch',
    ghost: 'CONTACT',
    title: "Let's Talk About Your",
    highlight: 'Next Project',
    form: {
      nameLabel: 'Your Name',
      namePh: 'Ex. John Doe',
      emailLabel: 'Email',
      emailPh: 'you@example.com',
      phoneLabel: 'Phone',
      phonePh: '+380 63 000 00 00',
      orLabel: 'or',
      contactHint: 'Leave at least one — email or phone.',
      contactError: 'Please add an email or a phone number so I can reply.',
      interestLabel: "I'm Interested In",
      interestPh: 'Select an option',
      interestOptions: ['Frontend project', 'AI automation', 'Full-stack project', 'Something else'],
      messageLabel: 'Your Message',
      messagePh: 'Tell me a bit about your project…',
      submit: 'Send',
      submitting: 'Sending…',
      successMessage: "Thanks — your message is on its way. I'll follow up soon.",
      errorMessage: "Something went wrong sending that. You can email me directly instead.",
      mailtoFallback: 'Direct delivery is not configured yet — open the message in your email app instead.',
      mailtoFallbackAction: 'Open in email app',
      fieldErrors: {
        name: 'Please enter your name — at least 2 characters.',
        email: 'That email address does not look right.',
        phone: 'That phone number is too long.',
        message: 'Please write at least 10 characters so I know what it is about.',
      },
      rateLimitError: 'Too many attempts. Please wait a few minutes and try again.',
    },
    labels: {
      address: 'Based in',
      contact: 'Direct Contact',
      statusShort: 'Open to work',
    },
    info: {
      address: 'Chernihiv, Ukraine',
      availability: 'Available for freelance & remote work',
    },
  },

  footer: {
    tagline: 'Frontend developer & AI automation specialist based in Chernihiv, Ukraine.',
    navTitle: 'Navigation',
    contactTitle: 'Contact',
    ctaTitle: "Have a project in mind? Let's talk about it",
    builtWith: 'Built with Next.js · Designed & coded by Bohdan',
    backToTop: 'Back to top',
    copyright: 'All rights reserved.',
  },

  easterEgg: {
    title: 'ROOT ACCESS GRANTED',
    subtitle: 'You found the Konami code. Welcome to the mainframe, hacker.',
    consoleHint: 'Looking for something? Try the Konami code.',
  },

  cv: {
    documentLabel: 'Curriculum Vitae',
    subtitle: 'Frontend Developer · AI & Automation Specialist · learning backend to work full-stack.',
    openness: 'Open to freelance, remote & full-time',
    backToSite: 'Back to site',
    savePdf: 'Save as PDF',
    sections: {
      profile: 'Profile',
      education: 'Education & Experience',
      objective: 'Career Objective',
      skills: 'Skills',
      languages: 'Languages',
      certificates: 'Certificates',
    },
    profile: [
      'Frontend developer building interactive, production-ready interfaces with React, TypeScript and Next.js. Currently writing frontend at Liha Yunaited. Five public projects shipped, from pixel-accurate landing pages to a full e-commerce storefront with client-side routing, global state and a persisted cart.',
      'Alongside frontend work I build practical AI automations — n8n workflows and LLM-backed pipelines — that remove repetitive manual work. Formal background in cybersecurity and computer systems; currently deepening backend skills to work full-stack.',
    ],
    objective:
      'I do my best work on a team that shares what it knows and gives honest feedback. I am looking for a frontend or full-stack role where I take a feature from idea to release, learn from stronger engineers and grow into wider ownership — full-time, remote or freelance.',
    statusLabels: {
      complete: 'completed',
      'in-progress': 'in progress',
    },
  },

  a11y: {
    skipToContent: 'Skip to content',
    scrollToTop: 'Scroll back to top',
    languageSwitch: 'Change language',
    readingProgress: 'Reading progress',
  },
};
