import type { NextApiRequest, NextApiResponse } from 'next';

// Tipe data Wakil Pialang sesuai response asli
interface WakilPialang {
    id: number;
    nama: string;
    nomor_izin: string;
    status: string;
    kategori_wakil_pialang: {
        id: number;
        slug: string;
        nama_kategori: string;
    };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<WakilPialang[] | { message: string }>
) {
    try {
        const { kategori_slug } = req.query;
        let apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wakil-pialang`;
        
        // Jika ada parameter kategori_slug, tambahkan ke URL
        if (kategori_slug) {
            apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kategori-wakil-pialang/${kategori_slug}/wakil`;
        }
        
        const response = await fetch(apiUrl);

        if (!response.ok) {
            return res.status(response.status).json({ message: 'Gagal memuat data Wakil Pialang' });
        }

        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}
