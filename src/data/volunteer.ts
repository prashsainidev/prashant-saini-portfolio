export interface VolunteerEntry {
  role: string;
  organization: string;
  duration: string;
  description: string;
  bullets: string[];
}

export interface VolunteerData {
  title: string;
  subtitle: string;
  list: VolunteerEntry[];
}

export const volunteerData: VolunteerData = {
  title: 'Community',
  subtitle: 'Giving back to the community and growing together.',
  list: [
    {
      role: 'Coding Club Lead',
      organization: 'ACET, Aligarh',
      duration: '2022 – 2024',
      description:
        'Led the college coding club, organising technical workshops, hackathons, and the annual tech fest.',
      bullets: [
        'Organised hackathons and competitive programming sessions.',
        'Coordinated the annual tech fest with 500+ student participants.',
        'Mentored junior students in web development and version control.',
      ],
    },
  ],
};
