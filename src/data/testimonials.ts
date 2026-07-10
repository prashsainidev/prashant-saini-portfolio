export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
  linkedinUrl?: string;
}

export interface TestimonialsData {
  title: string;
  subtitle: string;
  list: Testimonial[];
}

export const testimonialsData: TestimonialsData = {
  title: 'What People Say',
  subtitle: 'Kind words from colleagues and collaborators I have had the pleasure of working with.',
  list: [
    // Add testimonials here when you have them
  ],
};
