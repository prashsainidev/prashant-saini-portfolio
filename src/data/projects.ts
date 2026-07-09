import { IProject } from '@/types';

export const projectsData: IProject[] = [
  {
    id: 'real-time-tracker',
    title: 'Real-Time Tracker',
    titleKanji: 'リアルタイム追跡',
    description:
      'A real-time location tracking app built with Node.js, Express, Socket.IO, and Mapbox GL JS. It shows moving assets live on an interactive map with smooth updates and a clean monitoring experience.',
    tech: ['Node.js', 'Express', 'Socket.IO', 'Mapbox GL JS'],
    links: [
      {
        type: 'github',
        url: 'https://github.com/prashsainidev/realtime-tracker',
        label: 'Source Code',
      },
    ],
    // image: "/images/projects/realtime-tracker.jpg", // TBD: need to migrate images
  },
  {
    id: 'learniverse',
    title: 'Learniverse',
    titleKanji: '学習宇宙',
    description:
      'An evolving e-learning platform designed for students across different levels, with a focus on simple navigation, approachable design, and a clear learning journey.',
    tech: ['React.js', 'Node.js', 'MongoDB'],
    links: [
      {
        type: 'live',
        url: 'https://learniverse-pied.vercel.app/',
        label: 'Live Site',
      },
    ],
  },
  {
    id: 'weatherwise',
    title: 'Weatherwise',
    titleKanji: '天気',
    description:
      'A weather forecasting app that delivers real-time conditions and useful predictions in a simple, easy-to-read interface.',
    tech: ['JavaScript', 'APIs'],
    links: [
      {
        type: 'live',
        url: 'https://weather-wise-ai.vercel.app/',
        label: 'Live Site',
      },
    ],
  },
  {
    id: 'mylibrary',
    title: 'MyLibrary',
    titleKanji: '図書館',
    description:
      'A library management system built with Node.js, Express, EJS, and MongoDB that makes it easy to manage books and authors through a clear CRUD workflow.',
    tech: ['Node.js', 'Express', 'EJS', 'MongoDB'],
    links: [
      {
        type: 'live',
        url: 'https://mylibrary-kappa.vercel.app/',
        label: 'Live Site',
      },
    ],
  },
  {
    id: 'i-tech-world',
    title: 'I Tech World',
    titleKanji: '技術',
    description:
      'An ongoing e-learning platform for students from high school to engineering, designed to make technical learning more interactive and accessible.',
    tech: ['React.js', 'Tailwind CSS'],
    links: [
      {
        type: 'live',
        url: 'https://i-tech-gamma.vercel.app/',
        label: 'Live Site',
      },
    ],
  },
  {
    id: 'heart-disease',
    title: 'Heart Disease Prediction',
    titleKanji: '予測',
    description:
      'A machine learning project that predicts heart disease risk using real-world data and presents the results in a more understandable, actionable way.',
    tech: ['Python', 'Machine Learning'],
    links: [
      {
        type: 'github',
        url: 'https://github.com/prashsainidev/Heart-Disease-Predicition',
        label: 'Source Code',
      },
    ],
  },
];
