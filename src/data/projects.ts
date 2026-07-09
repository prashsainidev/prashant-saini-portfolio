import { IProject } from '@/types';

/* ── All 6 projects — ordered by display priority ── */
export const projectsData: IProject[] = [
  {
    id: 'real-time-tracker',
    title: 'Real-Time Tracker',
    titleKanji: 'リアルタイム追跡',
    tagline: 'Live delivery tracking experience inspired by Swiggy & Zomato.',
    description:
      'A high-performance location tracking system built with a bidirectional Socket.IO pipeline. Designed to mimic the smooth, real-time tracking experience of modern food delivery apps.',
    details: [
      'Leaflet.js integration with dynamic camera auto-fitting (fitBounds) for multiple active tracking sessions',
      'Custom SVG Lottie animations used for premium, jank-free map markers',
    ],
    tech: ['Node.js', 'Socket.IO', 'Leaflet.js', 'Lottie'],
    role: 'Full-Stack Engineer',
    timeline: 'Mar 2025',
    image: '/projects/RealTime Tracker.png',
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
      'A modern e-learning platform focused on interactive user experiences. Built with Next.js and styled using Tailwind CSS and DaisyUI.',
    details: [
      'Next.js App Router for optimal performance and routing',
      'DaisyUI component library for accessible, rapid UI development',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'DaisyUI'],
    role: 'Full-Stack Developer',
    timeline: 'May 2026',
    image: '/projects/Learniverse.png',
    links: {
      live: 'https://learniverse-pied.vercel.app/',
      github: 'https://github.com/prashsainidev/learniverse-App',
    },
    tags: ['EdTech', 'Next.js'],
    featured: true,
    order: 2,
  },
  {
    id: 'mintlify-clone',
    title: 'Mintlify Clone',
    titleKanji: '文書化',
    tagline: 'A pixel-perfect UI clone of the Mintlify documentation platform.',
    description:
      'A frontend web development assignment from the Chai aur Code cohort. The goal was to recreate the complex, clean layout of Mintlify using pure foundational web technologies.',
    details: [
      'Semantic HTML5 structure for accessible documentation layout',
      'Advanced CSS Flexbox and Grid for responsive sidebar and content areas',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    role: 'Frontend Developer',
    timeline: 'Jan 2026',
    image: '/projects/mintlify.png',
    links: {
      live: 'https://mintlify-peach.vercel.app',
      github: 'https://github.com/prashsainidev/mintlify',
    },
    tags: ['UI Clone', 'Vanilla JS'],
    featured: false,
    order: 3,
  },
  {
    id: 'dev-tool-landing',
    title: 'Cursor Landing Clone',
    titleKanji: '開発ツール',
    tagline: 'Recreating the premium Cursor dev-tool landing page.',
    description:
      'A frontend web development assignment from the Chai aur Code cohort. Focused on matching the sleek dark-mode aesthetic and layout of the Cursor editor website using vanilla technologies.',
    details: [
      'Vanilla CSS styling for premium look without heavy frameworks',
      'Responsive design ensuring perfect layout across all device widths',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    role: 'Frontend Developer',
    timeline: 'Jan 2026',
    image: '/projects/cursor.png',
    links: {
      live: 'https://dev-tool-landing-page-cursor-iota.vercel.app',
      github: 'https://github.com/prashsainidev/dev-tool-landing-page-cursor',
    },
    tags: ['UI Clone', 'Vanilla JS'],
    featured: false,
    order: 4,
  },
  {
    id: 'weatherwise',
    title: 'WeatherWise',
    titleKanji: '天気予報',
    tagline: 'Weather at a glance — real-time, readable, reliable.',
    description:
      'A cutting-edge weather application built with React and Vite. Experience real-time weather updates with a fast, client-side rendered architecture.',
    details: [
      'Vite build tool for ultra-fast HMR and optimized production bundles',
      'React Router DOM for seamless client-side page navigation',
    ],
    tech: ['React', 'Vite', 'React Router'],
    role: 'Frontend Developer',
    timeline: 'Feb 2025',
    image: '/projects/weather.png',
    links: {
      live: 'https://weather-wise-ai.vercel.app/',
      github: 'https://github.com/prashsainidev/WeatherWise-AI',
    },
    tags: ['APIs', 'React'],
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
    role: 'Backend Developer',
    timeline: 'Feb 2025',
    image: '/projects/Library.png',
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
      'An interactive educational website built with foundational web technologies. Designed to provide engaging learning experiences for students without heavy frameworks.',
    details: [
      'Vanilla JavaScript for dynamic DOM manipulation and state management',
      'Custom CSS architecture utilizing variables for a consistent design system',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    role: 'Frontend Developer',
    timeline: 'Mar 2025',
    image: '/projects/ITech.png',
    links: {
      live: 'https://i-tech-gamma.vercel.app/',
      github: 'https://github.com/prashsainidev/I-Tech-World',
    },
    tags: ['EdTech', 'Vanilla JS'],
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
    image: '/projects/Heart.png',
    links: {
      github: 'https://github.com/prashsainidev/Heart-Disease-Predicition',
    },
    tags: ['Machine Learning', 'Python'],
    featured: false,
    order: 8,
  },
];
