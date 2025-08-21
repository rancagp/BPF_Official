// pages/api/berita.ts

import type { NextApiRequest, NextApiResponse } from 'next';

type Berita = {
    id: number;
    image: string;
    kategori: string;
    status: string;
    judul: string;
    slug: string;
    isi: string;
    created_at: string;
    updated_at: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/berita`);
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch berita' });
        }

        const data: Berita[] = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching berita:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

