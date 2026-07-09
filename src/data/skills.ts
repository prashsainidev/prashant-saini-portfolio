import { ISkillCategory } from '@/types';

export const skillsData: ISkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    labelJP: 'フロントエンド',
    kanjiChar: '描',
    skills: [
      { name: 'React.js', level: 'expert' },
      { name: 'Next.js', level: 'proficient' },
      { name: 'TypeScript', level: 'proficient' },
      { name: 'JavaScript', level: 'expert' },
      { name: 'HTML5', level: 'expert' },
      { name: 'CSS3', level: 'expert' },
      { name: 'Tailwind CSS', level: 'expert' },
      { name: 'GSAP', level: 'proficient' },
      { name: 'Framer Motion', level: 'proficient' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    labelJP: 'バックエンド',
    kanjiChar: '基',
    skills: [
      { name: 'Node.js', level: 'expert' },
      { name: 'Express.js', level: 'expert' },
      { name: 'MongoDB', level: 'proficient' },
      { name: 'REST APIs', level: 'expert' },
      { name: 'Python', level: 'proficient' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    labelJP: 'ツール',
    kanjiChar: '具',
    skills: [
      { name: 'Git & GitHub', level: 'expert' },
      { name: 'VS Code', level: 'expert' },
      { name: 'Postman', level: 'proficient' },
      { name: 'Figma', level: 'proficient' },
      { name: 'Vercel', level: 'proficient' },
      { name: 'Linux', level: 'proficient' },
    ],
  },
];
