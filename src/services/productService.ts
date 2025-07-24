interface Product {
    id: number;
    name: string;
    slug: string;
    // tambahkan field lain yang diperlukan
}

export async function fetchJfxProducts(): Promise<Product[]> {
    try {
        const response = await fetch('http://kpf-backend.test/api/jfx', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            next: { revalidate: 3600 } // Cache selama 1 jam
        });

        if (!response.ok) {
            throw new Error('Gagal mengambil data produk');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching JFX products:', error);
        return [];
    }
}
