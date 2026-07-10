export interface Talk {
  title: string;
  event: string;
  date: string;
  description: string;
  slidesUrl?: string;
  eventUrl?: string;
}

export interface TalksData {
  title: string;
  subtitle: string;
  list: Talk[];
}

export const talksData: TalksData = {
  title: 'Talks & Events',
  subtitle: 'Sessions, workshops, and community events where I have shared what I know.',
  list: [
    {
      title: 'Git and GitHub Workshop',
      event: 'ACET Coding Club',
      date: '2023',
      description:
        'Conducted a hands-on workshop on Git version control and GitHub workflow for fellow engineering students — covering branching, pull requests, and collaborative development.',
      slidesUrl: '',
      eventUrl: '',
    },
  ],
};
