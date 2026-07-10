export interface AIProject {
  name: string;
  description: string;
  model: string; // e.g. "GPT-4o", "Gemini 1.5 Pro"
  stack: string[];
  links: { name: string; url: string }[];
}

export interface AIProjectsData {
  title: string;
  subtitle: string;
  list: AIProject[];
}

export const aiProjectsData: AIProjectsData = {
  title: 'AI Projects',
  subtitle:
    'Projects built at the intersection of AI and the web — from LLM integrations to agentic workflows.',
  list: [
    // Add AI projects here as you build them at FlyRank
  ],
};
