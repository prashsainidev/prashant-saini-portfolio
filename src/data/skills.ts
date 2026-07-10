import { ISkillCategory } from '@/types';

export const skillsData: ISkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    labelJP: 'フロントエンド',
    kanjiChar: '描',
    skills: [
      { name: 'React.js', level: 'expert', since: 2022 },
      { name: 'Next.js', level: 'proficient', since: 2023 },
      { name: 'TypeScript', level: 'proficient', since: 2023 },
      { name: 'JavaScript', level: 'expert', since: 2021 },
      { name: 'HTML5', level: 'expert', since: 2021 },
      { name: 'CSS3', level: 'expert', since: 2021 },
      { name: 'Tailwind CSS', level: 'expert', since: 2023 },
      { name: 'GSAP', level: 'proficient', since: 2024 },
      { name: 'Framer Motion', level: 'proficient', since: 2024 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    labelJP: 'バックエンド',
    kanjiChar: '基',
    skills: [
      { name: 'Node.js', level: 'expert', since: 2022 },
      { name: 'Express.js', level: 'expert', since: 2022 },
      { name: 'MongoDB', level: 'proficient', since: 2023 },
      { name: 'REST APIs', level: 'expert', since: 2022 },
      { name: 'Python', level: 'proficient', since: 2023 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    labelJP: 'ツール',
    kanjiChar: '具',
    skills: [
      { name: 'Git & GitHub', level: 'expert', since: 2021 },
      { name: 'VS Code', level: 'expert', since: 2021 },
      { name: 'Postman', level: 'proficient', since: 2023 },
      { name: 'Figma', level: 'learning', since: 2024 },
      { name: 'Vercel', level: 'proficient', since: 2023 },
      { name: 'Linux', level: 'proficient', since: 2023 },
    ],
  },
];
