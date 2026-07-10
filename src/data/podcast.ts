export interface PodcastData {
  title: string;
  subtitle: string;
  episodes: string[]; // embed URLs
}

export const podcastData: PodcastData = {
  title: 'Podcast',
  subtitle: 'Episodes and appearances where I talk tech, learning, and building.',
  episodes: [],
};
