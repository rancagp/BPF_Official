export interface KategoriWakilPialang {
  id: number;
  nama_kategori: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export const fetchKategoriWakilPialang = async (): Promise<KategoriWakilPialang[]> => {
  try {
    const response = await fetch('/api/kategori-wakil-pialang');
    
    if (!response.ok) {
      throw new Error('Gagal memuat data kategori wakil pialang');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching kategori wakil pialang:', error);
    throw error;
  }
};
