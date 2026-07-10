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
  subtitle: "Contributions and tools I've built for the community.",
  list: [],
};
