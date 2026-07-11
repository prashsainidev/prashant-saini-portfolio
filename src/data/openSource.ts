export interface OpenSourceProject {
  name: string;
  repo: string;
  description: string;
  stars: number;
}

export interface OpenSourceData {
  title: string;
  subtitle: string;
  list: OpenSourceProject[];
}

export const openSourceData: OpenSourceData = {
  title: 'Open Source',
  subtitle: 'My journey into the open-source community.',
  list: [
    {
      name: 'first-contributions',
      repo: 'https://github.com/firstcontributions/first-contributions',
      description:
        'My very first step into the open-source ecosystem. Learned the standard fork, branch, and Pull Request workflow used by major repositories.',
      stars: 0,
    },
    {
      name: '[ STATUS: ACTIVE EXPLORATION ]',
      repo: 'https://github.com/prashsainidev',
      description:
        "I am currently hunting for active open-source React and Next.js projects to contribute to. If you maintain a repository and need an extra pair of hands, I'd love to jump in!",
      stars: 0,
    },
  ],
};
