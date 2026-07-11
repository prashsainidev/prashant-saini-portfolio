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
    {
      name: 'Agentic Workflow Builder',
      description:
        'A visual node-based editor for creating and deploying multi-agent LLM workflows with custom tools and memory.',
      model: 'GPT-4o',
      stack: ['Next.js', 'React Flow', 'LangChain', 'OpenAI'],
      links: [
        { name: 'Live', url: '#' },
        { name: 'GitHub', url: '#' },
      ],
    },
    {
      name: 'Semantic Code Search',
      description:
        'An IDE extension that allows developers to search their codebase using natural language queries instead of regex.',
      model: 'Gemini 1.5 Pro',
      stack: ['TypeScript', 'Pinecone', 'Gemini API', 'VS Code API'],
      links: [
        { name: 'Live', url: '#' },
        { name: 'GitHub', url: '#' },
      ],
    },
    {
      name: 'Automated PR Reviewer',
      description:
        'A GitHub App that automatically reviews pull requests, suggests optimizations, and catches security vulnerabilities.',
      model: 'Claude 3.5 Sonnet',
      stack: ['Node.js', 'Probot', 'Anthropic API'],
      links: [
        { name: 'Live', url: '#' },
        { name: 'GitHub', url: '#' },
      ],
    },
    {
      name: 'AI Document Summarizer',
      description:
        'Internal tool that ingests massive PDFs and generates executive summaries and flashcards for quick learning.',
      model: 'Llama 3',
      stack: ['Python', 'FastAPI', 'Ollama', 'React'],
      links: [
        { name: 'Live', url: '#' },
        { name: 'GitHub', url: '#' },
      ],
    },
  ],
};
