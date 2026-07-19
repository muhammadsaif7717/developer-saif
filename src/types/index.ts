export interface Project {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  image: string[];
  category: string;
  type: 'personal' | 'client' | 'open-source' | 'freelance';
  date: string;
  role: string;
  technologies: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  currentlyWorking: boolean;
  priority: number;
}

export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  categories: string[];
  tags: string[];
  status: 'draft' | 'published';
  readTime: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}
