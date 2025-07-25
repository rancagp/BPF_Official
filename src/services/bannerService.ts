export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Mengambil daftar banner aktif
 */
export const getBanners = async (): Promise<Banner[]> => {
  try {
    const response = await fetch('/api/banners', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Gagal mengambil data banner');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
};

/**
 * Mengambil detail banner berdasarkan ID
 * @param id ID banner yang akan diambil
 */
export const getBanner = async (id: number): Promise<Banner> => {
  try {
    const response = await fetch(`/api/banners/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data banner ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching banner ${id}:`, error);
    throw error;
  }
};

/**
 * Membuat banner baru
 * @param formData Data banner dalam bentuk FormData
 */
export const createBanner = async (formData: FormData): Promise<Banner> => {
  try {
    const response = await fetch('/api/banners', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Gagal membuat banner');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating banner:', error);
    throw error;
  }
};

/**
 * Memperbarui banner
 * @param id ID banner yang akan diperbarui
 * @param formData Data banner yang baru dalam bentuk FormData
 */
export const updateBanner = async (id: number, formData: FormData): Promise<Banner> => {
  try {
    // Tambahkan method spoofing untuk PUT dengan FormData
    formData.append('_method', 'PUT');
    
    const response = await fetch(`/api/banners/${id}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Gagal memperbarui banner ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating banner ${id}:`, error);
    throw error;
  }
};

/**
 * Menghapus banner
 * @param id ID banner yang akan dihapus
 */
export const deleteBanner = async (id: number): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`/api/banners/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Gagal menghapus banner ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting banner ${id}:`, error);
    throw error;
  }
};
