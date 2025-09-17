// pages/api/banners.ts

import type { NextApiRequest, NextApiResponse } from 'next';

type Banner = {
    id: number;
    title: string;
    description: string;
    image: string;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Banner[] | { error: string }>
) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/banners`);
        
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Gagal mengambil data banner' });
        }

        const result = await response.json();
        
        // Pastikan URL gambar lengkap
        const banners = result.data.map((banner: Banner) => {
            // Jika sudah URL lengkap, kembalikan langsung
            if (banner.image.startsWith('http')) {
                return banner;
            }
            
            // Hapus semua awalan yang tidak diinginkan
            let cleanPath = banner.image
                .replace(/^(\/|\\)*/, '') // Hapus semua slash di awal
                .replace(/^(public|storage)(\/|\\)*/i, ''); // Hapus awalan public/ atau storage/
            
            // Pastikan tidak ada duplikasi 'storage/'
            if (cleanPath.startsWith('storage/')) {
                cleanPath = cleanPath.replace(/^storage\//, '');
            }
                
            // Buat URL lengkap dengan path storage yang benar
            const fullUrl = `${apiUrl}/storage/banners/${cleanPath}`;
            
            console.log('Processed image URL:', {
                original: banner.image,
                cleanPath,
                fullUrl
            });
                
            return {
                ...banner,
                image: fullUrl
            };
        });

        return res.status(200).json(banners);
    } catch (error) {
        console.error('Error fetching banners:', error);
        return res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
}
