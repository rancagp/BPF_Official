import type { NextApiRequest, NextApiResponse } from 'next';

// Tipe data untuk kategori (opsional, biar rapi)
interface Category {
    id: number;
    nama_kategori: string;
    slug: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Category[] | { message: string }>
) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kategori-wakil-pialang`);

        if (!response.ok) {
            return res.status(response.status).json({ message: 'Gagal memuat data kategori' });
        }

        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}
