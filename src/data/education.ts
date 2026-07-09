import { IEducation } from '@/types';

export const educationData: IEducation[] = [
  {
    id: 'acet-btech',
    degree: 'Bachelor of Technology',
    field: 'Information Technology',
    institution: 'Aligarh College of Engineering and Technology',
    institutionShort: 'ACET',
    location: 'Aligarh, UP',
    startYear: 2020,
    endYear: 2024,
    grade: 'CGPA: 8.1',
    highlights: [
      'Graduated with a CGPA of 8.1. ACET is affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU).',
      'Led the coding club, organizing technical workshops and hackathons.',
      "Coordinated the university's annual tech fest, fostering innovation and collaboration.",
    ],
    chapter: '03', // default chapter, can be overridden by dynamic numbering
  },
];
