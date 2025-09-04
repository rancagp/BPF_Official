import type { NextApiRequest, NextApiResponse } from 'next';

interface KategoriWakilPialang {
  id: number;
  nama_kategori: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<KategoriWakilPialang[] | { message: string }>
) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kategori-wakil-pialang`);
    
    if (!response.ok) {
      throw new Error('Gagal memuat data kategori wakil pialang');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
}
