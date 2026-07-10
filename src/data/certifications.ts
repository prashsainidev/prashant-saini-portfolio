export interface Certification {
  title: string;
  subtitle: string;
  imageFallback: string;
  link: {
    name: string;
    url: string;
  };
}

export interface CertificationsData {
  title: string;
  subtitle: string;
  list: Certification[];
}

export const certificationsData: CertificationsData = {
  title: 'Achievements And Certifications',
  subtitle: 'Achievements, Certifications, Award Letters and Some Cool Stuff that I have done!',
  list: [
    {
      title: 'Solutions Architecture Job Simulation',
      subtitle:
        'Developed a scalable and cost-effective hosting architecture solution, focusing on performance, reliability, and clear client communication to simplify complex technical ideas.',
      imageFallback: 'aws.png',
      link: {
        name: 'View Certificate',
        url: 'https://drive.google.com/drive/folders/1Q1wjkqs-pw8Oxx9_ems64Mob4jToR96C?usp=sharing',
      },
    },
    {
      title: 'Software Engineering Job Simulation',
      subtitle:
        'Gained practical experience in software development by completing tasks in architecture, security, programming, testing, and agile methodologies, strengthening my problem-solving and collaborative skills.',
      imageFallback: 'accenture.png',
      link: {
        name: 'View Certificate',
        url: 'https://drive.google.com/drive/folders/1aXhh4VE2NB4UILqTtrvLpRZN9kkycXAz?usp=sharing',
      },
    },
    {
      title: 'Problem Solving Basic Certificate',
      subtitle:
        "Through HackerRank's engaging challenges, I refined my problem-solving skills and built a strong coding foundation, boosting my logical thinking and passion for coding.",
      imageFallback: 'HackerRank.png',
      link: {
        name: 'Certification',
        url: 'https://drive.google.com/drive/folders/1kSiwm7T2VDl7XtT8eqayUu-LJvWxeUVB?usp=sharing',
      },
    },
    {
      title: 'CSS Basic Certificate',
      subtitle:
        'I completed the CSS Basics course to enhance my design skills and create visually appealing web interfaces, mastering the art of clean and creative web styling.',
      imageFallback: 'HackerRank.png',
      link: {
        name: 'Certification',
        url: 'https://drive.google.com/drive/folders/1GWZL8e9M9891-BfpVH9hiER9sJ19eADm?usp=sharing',
      },
    },
    {
      title: 'AWS Skill Builder Badge',
      subtitle:
        "Completed Generative AI courses: 'Introduction to Generative AI - Art of Possible', 'Planning a Generative AI Certificate', and 'Building a Generative AI-Ready Organization'.",
      imageFallback: 'amazon.png',
      link: {
        name: 'View All Certificates',
        url: 'https://drive.google.com/drive/folders/1Yko2etEgpSiQnkOZBOaGYOBvCdJ1tIk0?usp=sharing',
      },
    },
    {
      title: 'Data Analytics Consulting Virtual Internship',
      subtitle:
        'Completed on November 4th, 2023, this internship sharpened my skills in data quality assessment, insights, and presentation under expert mentorship.',
      imageFallback: 'KPMG.png',
      link: {
        name: 'Certification',
        url: 'https://drive.google.com/drive/folders/1mtV21KA-K9Gg4FI2mJjYjE-27o_LWBhn?usp=sharing',
      },
    },
    {
      title: 'Data Analytics and Visualization Job Simulation',
      subtitle:
        'A transformative job simulation completed in October 2023, where I immersed myself in real-world projects, mastered data cleaning and modeling, created captivating visual stories, and presented clear, impactful insights.',
      imageFallback: 'accenture.png',
      link: {
        name: 'Certification',
        url: 'https://drive.google.com/drive/folders/1Y252E-hI-7hvBEJ6TNOwvFaMIPhrud_0?usp=sharing',
      },
    },
    {
      title: 'Google Developer Badge',
      subtitle:
        'Awarded for showing solid skills with Google tools and an ongoing drive to learn and try new things.',
      imageFallback: 'Google.png',
      link: { name: 'View Badge', url: 'https://g.dev/prashant_saini' },
    },
    {
      title: 'Apna College Alpha Java & DSA Certificate',
      subtitle:
        'Completed an intensive 4.5-month course at Apna College where I mastered Java fundamentals, learned essential data structures and algorithms, and honed my problem-solving skills.',
      imageFallback: 'APNA.png',
      link: {
        name: 'Certification',
        url: 'https://drive.google.com/drive/folders/1-nqGZBUB0Ulule3Q-tmJBZELo5iklmFz?usp=sharing',
      },
    },
    {
      title: 'TVS Credit E.P.I.C 5.0-IT Challenge Participation',
      subtitle:
        'Proudly represented ACET, Aligarh in the Round 1 Online Quiz of the TVS Credit E.P.I.C 5.0-IT Challenge, demonstrating quick thinking and technical insight.',
      imageFallback: 'TVS.png',
      link: {
        name: 'Certification',
        url: 'https://drive.google.com/drive/folders/1u5iCD8uuP4cWd4L-BtRtkSoaqa9N0jJE?usp=sharing',
      },
    },
  ],
};
