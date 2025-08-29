export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  category_id: string;
  kategori: NewsCategory;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface NewsApiResponse {
  current_page: number;
  data: NewsItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export const fetchNews = async (page = 1, perPage = 9): Promise<NewsApiResponse> => {
  try {
    const response = await fetch(
      `https://portalnews.newsmaker.id/api/berita?page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error('Gagal mengambil daftar berita');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const fetchFeaturedNews = async (limit = 3): Promise<NewsItem[]> => {
  try {
    const response = await fetchNews(1, limit);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching featured news:', error);
    return [];
  }
};

export const fetchNewsDetail = async (slug: string): Promise<NewsItem | null> => {
  try {
    const response = await fetch(
      `https://portalnews.newsmaker.id/api/berita/${slug}`
    );
    
    if (!response.ok) {
      throw new Error('Berita tidak ditemukan');
    }
    
    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('Error fetching news detail:', error);
    return null;
  }
};
