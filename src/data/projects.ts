import { IProject } from '@/types';

/* ── All 6 projects — ordered by display priority ── */
export const projectsData: IProject[] = [
  {
    id: 'real-time-tracker',
    title: 'Real-Time Tracker',
    titleKanji: 'リアルタイム追跡',
    tagline: 'Watch assets move live across a map — no refresh, no lag.',
    description:
      'A real-time location tracking system built with a bidirectional Socket.IO pipeline. The client receives coordinate streams and plots them on Mapbox GL JS with smooth interpolated movement. Designed to handle multiple concurrent tracked objects without UI jank.',
    details: [
      'Socket.IO event bus for sub-100ms coordinate updates',
      'Mapbox GL JS flyTo animation for smooth marker movement',
    ],
    tech: ['Node.js', 'Express', 'Socket.IO', 'Mapbox GL JS'],
    role: 'Full-Stack Engineer',
    timeline: 'Q1 2024',
    links: {
      github: 'https://github.com/prashsainidev/realtime-tracker',
    },
    tags: ['Real-Time', 'WebSockets', 'Maps'],
    featured: true,
    order: 1,
  },
  {
    id: 'learniverse',
    title: 'Learniverse',
    titleKanji: '学習宇宙',
    tagline: 'An e-learning universe built for every kind of student.',
    description:
      'A full-stack e-learning platform focused on progressive learning paths. Built with React for a fast, SPA feel and a Node/MongoDB backend for flexible content storage.',
    details: [
      'React SPA with dynamic course rendering',
      'MongoDB schema for nested content modules',
    ],
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express'],
    role: 'Frontend Developer',
    timeline: 'Q3 2023',
    links: {
      live: 'https://learniverse-pied.vercel.app/',
      github: 'https://github.com/prashsainidev/learniverse-App',
    },
    tags: ['EdTech', 'Full-Stack'],
    featured: true,
    order: 2,
  },
  {
    id: 'mintlify-clone',
    title: 'Mintlify Docs',
    titleKanji: '文書化',
    tagline: 'Modern, high-performance documentation platform clone.',
    description:
      'A sleek, responsive documentation platform built to study advanced UI patterns and Next.js static site generation.',
    details: [
      'Next.js App Router for optimal page load speeds',
      'Tailwind CSS for a highly readable, developer-focused aesthetic',
    ],
    tech: ['Next.js', 'React.js', 'Tailwind CSS'],
    role: 'Frontend Developer',
    timeline: '2024',
    links: {
      live: 'https://mintlify-peach.vercel.app',
      github: 'https://github.com/prashsainidev/mintlify',
    },
    tags: ['Next.js', 'Documentation'],
    featured: false,
    order: 3,
  },
  {
    id: 'dev-tool-landing',
    title: 'DevTool Landing',
    titleKanji: '開発ツール',
    tagline: 'High-conversion landing page for modern developer tools.',
    description:
      'A cinematic, fast-loading landing page designed specifically for dev-tools, featuring micro-interactions and scroll animations.',
    details: [
      'Framer Motion for scroll-triggered micro-interactions',
      'Bento grid layout for modular feature showcasing',
    ],
    tech: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    role: 'Frontend Developer',
    timeline: '2024',
    links: {
      live: 'https://dev-tool-landing-page-cursor-iota.vercel.app',
      github: 'https://github.com/prashsainidev/dev-tool-landing-page-cursor',
    },
    tags: ['Next.js', 'Landing Page'],
    featured: false,
    order: 4,
  },
  {
    id: 'weatherwise',
    title: 'WeatherWise',
    titleKanji: '天気予報',
    tagline: 'Weather at a glance — real-time, readable, reliable.',
    description:
      'A weather forecasting app that consumes a third-party weather API and presents forecasts in a clean, readable UI.',
    details: [
      'Fetch API + async/await for secure weather data consumption',
      'Geolocation API for automatic local forecasting',
    ],
    tech: ['JavaScript', 'OpenWeather API', 'CSS3'],
    role: 'Full-Stack Engineer',
    timeline: 'Q2 2023',
    links: {
      live: 'https://weather-wise-ai.vercel.app/',
      github: 'https://github.com/prashsainidev/WeatherWise-AI',
    },
    tags: ['APIs', 'Vanilla JS'],
    featured: false,
    order: 5,
  },
  {
    id: 'mylibrary',
    title: 'MyLibrary',
    titleKanji: '図書管理',
    tagline: 'Books in, books out — a clean CRUD workflow for librarians.',
    description:
      'A library management system with full CRUD operations for books and authors. Uses EJS server-side templating with a Node.js/Express backend.',
    details: [
      'RESTful routes for books and authors (Create/Read/Update/Delete)',
      'EJS templates for server-side rendering — no client-side JS needed',
    ],
    tech: ['Node.js', 'Express', 'EJS', 'MongoDB'],
    role: 'Full-Stack Engineer',
    timeline: 'Q1 2023',
    links: {
      live: 'https://mylibrary-kappa.vercel.app/',
      github: 'https://github.com/prashsainidev/My-Library',
    },
    tags: ['CRUD', 'Server-Side', 'Node.js'],
    featured: false,
    order: 6,
  },
  {
    id: 'i-tech-world',
    title: 'I Tech World',
    titleKanji: '技術世界',
    tagline: 'Making engineering topics approachable for every level.',
    description:
      'An ongoing e-learning platform targeting high school to engineering students. The focus was on making dense technical subjects scannable and interactive.',
    details: [
      'React + Tailwind CSS component library built from scratch',
      'Subject-based routing with lazy loading for performance',
    ],
    tech: ['React.js', 'Tailwind CSS'],
    role: 'Full-Stack Engineer',
    timeline: 'Q4 2023',
    links: {
      live: 'https://i-tech-gamma.vercel.app/',
      github: 'https://github.com/prashsainidev/I-Tech-World',
    },
    tags: ['EdTech', 'Frontend'],
    featured: false,
    order: 7,
  },
  {
    id: 'heart-disease-prediction',
    title: 'Heart Disease Prediction',
    titleKanji: '心臓予測',
    tagline: 'Turning clinical data into an early warning signal.',
    description:
      'A machine learning project using scikit-learn classifiers trained on the Cleveland Heart Disease dataset.',
    details: [
      'Comparative analysis of Logistic Regression, Random Forest, and SVM',
      'Feature engineering on 13 clinical attributes for better accuracy',
    ],
    tech: ['Python', 'scikit-learn', 'Pandas'],
    role: 'ML Engineer',
    timeline: 'Q4 2022',
    links: {
      github: 'https://github.com/prashsainidev/Heart-Disease-Predicition',
    },
    tags: ['Machine Learning', 'Python'],
    featured: false,
    order: 8,
  },
];
