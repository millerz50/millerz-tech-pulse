export interface MillerzProject {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  type: string;
  categoryGroup: 'marketplace' | 'saas' | 'studio' | 'social';
  href: string;
  imageUrl: string;
  metrics?: string;
  techStack: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string;
  status: string;
  featured: boolean;
  sortOrder: number;
  featuredArticleId?: string;
}