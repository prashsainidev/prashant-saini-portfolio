import { IExperience } from '@/types';

export const experienceData: IExperience[] = [
  {
    id: 'flyrank-ai',
    company: 'FlyRank AI',
    companyKanji: '会社',
    role: 'Front-End AI Engineering Intern',
    roleJP: 'フロントエンドエンジニア',
    type: 'internship',
    startDate: '2026-07', // July 1, 2026
    endDate: 'present',
    location: 'Remote',
    description: [
      'Building AI-powered frontend experiences using React.js and modern web technologies.',
      'Collaborating with the product team to design and implement clean, user-centric interfaces.',
      'Integrating AI/ML features into the web platform for enhanced user workflows.',
      'Contributing to component architecture decisions and frontend best practices.',
    ],
    tech: ['React.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'AI APIs'],
    chapter: '01',
  },
  {
    id: 'chaicode-cohort',
    company: 'ChaiCode',
    companyKanji: '学習',
    role: 'Full-Stack Web Dev Cohort',
    roleJP: 'フルスタック開発者',
    type: 'internship', // closest type for cohort/bootcamp
    startDate: '2025-12', // December 2025
    endDate: '2026-06', // June 2026
    location: 'Online',
    description: [
      'Completed an intensive full-stack web development cohort covering modern JS ecosystem.',
      'Built production-grade projects using React.js, Node.js, Express, and MongoDB.',
      'Learned advanced patterns: authentication, REST APIs, state management, and deployment.',
      'Collaborated with peers on team projects and participated in code reviews.',
    ],
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Tailwind CSS'],
    chapter: '02',
  },
  // Add more experiences here as your career grows
];
