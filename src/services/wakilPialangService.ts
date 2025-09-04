export interface KategoriWakilPialang {
  id: number;
  slug: string;
  nama_kategori: string;
}

export interface WakilPialang {
  id: number;
  nama: string;
  nomor_izin: string;
  status: string;
  kategori_wakil_pialang: KategoriWakilPialang;
}

export const fetchWakilPialang = async (kategoriSlug?: string): Promise<WakilPialang[]> => {
  try {
    let url = '/api/wakil-pialang';
    if (kategoriSlug) {
      url = `/api/kategori-wakil-pialang/${kategoriSlug}/wakil`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Gagal memuat data wakil pialang');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching wakil pialang:', error);
    throw error;
  }
};
