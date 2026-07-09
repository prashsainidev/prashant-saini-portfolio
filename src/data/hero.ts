import { IHero } from '@/types';

export const heroData: IHero = {
  firstName: 'Prashant',
  lastName: 'Saini',
  nameKanji: '誠一', // Phonetic representation
  subtitle:
    'I build clean, practical web experiences with JavaScript, React.js, Node.js, and modern web tools.',
  role: 'Full-Stack Developer',
  location: 'Aligarh, India',
  locationJP: 'アリーガル、インド',
  availability: 'Available for work',
  resumeUrl: 'https://drive.google.com/drive/folders/1pNEG5U8ipkXiXczyFJw1nK-1H0mC90fo?usp=sharing',
  socials: [
    {
      name: 'github',
      label: 'GitHub',
      url: 'https://github.com/prashsainidev/',
      icon: 'Github',
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/prashsainidev/',
      icon: 'Linkedin',
    },
    {
      name: 'twitter',
      label: 'Twitter / X',
      url: 'https://x.com/prashsainidev/',
      icon: 'Twitter',
    },
    {
      name: 'leetcode',
      label: 'LeetCode',
      url: 'https://leetcode.com/u/prashsainidev/',
      icon: 'Code2',
    },
    {
      name: 'hashnode',
      label: 'Hashnode',
      url: 'https://prashsainidev.hashnode.dev/',
      icon: 'BookOpen',
    },
  ],
};
