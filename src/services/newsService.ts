export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}

export interface NewsItem {
  id: number;
  title: string;
  titles: {
    default: string;
    sg?: string;
    rfb?: string;
    kpf: string;
    ewf?: string;
    bpf?: string;
  };
  slug: string;
  content: string;
  category_id: number;
  kategori?: {
    id: number;
    name: string;
    slug: string;
  };
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
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export const fetchLatestNews = async (limit = 3): Promise<NewsItem[]> => {
  try {
    const response = await fetch(
      `https://portalnews.newsmaker.id/api/berita?per_page=${limit}&sort_by=created_at&order=desc`
    );
    
    if (!response.ok) {
      throw new Error('Gagal mengambil berita terbaru');
    }
    
    const data = await response.json();
    
    // Process each news item to prioritize EWF title and use 4th image
    const processedData = data.data.map((item: NewsItem) => {
      // For images, we want to use the 4th image (index 3) if it exists
      let mainImage = null;
      if (item.images?.length > 3) {
        mainImage = item.images[3];
      } else if (item.images?.length > 0) {
        mainImage = item.images[0]; // Fallback to first image if no 4th image
      }
      
      return {
        ...item,
        title: item.titles?.ewf || item.title, // Use EWF title if available, fallback to default title
        // If we have a main image, use it as the only image
        images: mainImage ? [mainImage] : []
      };
    });
    
    return processedData || [];
  } catch (error) {
    console.error('Error fetching latest news:', error);
    return [];
  }
};

export const fetchNews = async (page = 1, perPage = 9, sortBy = 'created_at', order = 'desc'): Promise<NewsApiResponse> => {
  try {
    const response = await fetch(
      `https://portalnews.newsmaker.id/api/berita?page=${page}&per_page=${perPage}&sort_by=${sortBy}&order=${order}`
    );
    
    if (!response.ok) {
      throw new Error('Gagal mengambil daftar berita');
    }
    
    const data = await response.json();
    
    // Process each news item to prioritize EWF title and use 4th image
    if (data.data && Array.isArray(data.data)) {
      data.data = data.data.map((item: NewsItem) => {
        // For images, we want to use the 4th image (index 3) if it exists
        let mainImage = null;
        if (item.images?.length > 3) {
          mainImage = item.images[3];
        } else if (item.images?.length > 0) {
          mainImage = item.images[0]; // Fallback to first image if no 4th image
        }
        
        return {
          ...item,
          title: item.titles?.ewf || item.title, // Use EWF title if available, fallback to default title
          // If we have a main image, use it as the only image
          images: mainImage ? [mainImage] : []
        };
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const fetchFeaturedNews = async (limit = 3): Promise<NewsItem[]> => {
  try {
    const response = await fetchNews(1, limit, 'created_at', 'desc');
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
    
    if (result.data) {
      // For images, we want to use the 4th image (index 3) if it exists
      let mainImage = null;
      if (result.data.images?.length > 3) {
        mainImage = result.data.images[3];
      } else if (result.data.images?.length > 0) {
        mainImage = result.data.images[0]; // Fallback to first image if no 4th image
      }
      
      // Update the data with EWF title and processed images
      result.data = {
        ...result.data,
        title: result.data.titles?.ewf || result.data.title, // Use EWF title if available, fallback to default title
        // If we have a main image, use it as the only image
        images: mainImage ? [mainImage] : []
      };
    }
    
    return result.data || null;
  } catch (error) {
    console.error('Error fetching news detail:', error);
    return null;
  }
};
