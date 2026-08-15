export interface NewsArticle {
  id: string;
  title: string;
  url: string;
  description: string;
  content?: string;
  full_content?: string;
  video_url?: string;
  published: string;
  image: string | null;
  author?: string;
  language?: string;
  category?: string[];
  source: string;
}

export interface NewsResponse {
  data: NewsArticle[];
  next_cursor: string | null;
}

export interface Category {
  id: string | number;
  name: string;
}
