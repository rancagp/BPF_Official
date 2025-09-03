import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import PageTemplate from '@/components/templates/PageTemplate';
import Container from '@/components/templates/PageContainer/Container';
import NotFound from '@/components/moleculs/NotFound';
import DetailBerita from '@/components/organisms/DetailBerita';
import { fetchNewsDetail } from '@/services/newsService';
import { NewsItem, NewsCategory } from '@/services/newsService';
import Image from 'next/image';

// Fungsi untuk mendapatkan URL gambar yang lengkap
// Mengambil gambar ketiga (indeks 2) atau keempat (indeks 3) dari API
const getFullImageUrl = (images: string[] | undefined): string => {
    if (!images || !Array.isArray(images) || images.length === 0) {
        return '/images/placeholder-news.jpg';
    }
    
    // Ambil gambar ketiga (indeks 2) atau keempat (indeks 3) dari API
    const imagePath = images[2] || images[3] || images[0]; // Fallback ke gambar pertama jika indeks 2 dan 3 tidak ada
    
    if (!imagePath) return '/images/placeholder-news.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    // Gunakan base URL yang benar untuk gambar
    return `https://portalnews.newsmaker.id/${imagePath.replace(/^\/+/, '')}`;
};

export default function BeritaDetail() {
    const router = useRouter();
    const { slug } = router.query;
    const { t } = useTranslation('berita');
    const [berita, setBerita] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBerita = async () => {
            if (!slug) return;
            
            try {
                setLoading(true);
                const data = await fetchNewsDetail(slug as string);
                if (!data) {
                    throw new Error('Berita tidak ditemukan');
                }
                setBerita(data);
                setError(null);
            } catch (err) {
                console.error('Error loading news:', err);
                setError('Gagal memuat detail berita');
            } finally {
                setLoading(false);
            }
        };

        loadBerita();
    }, [slug]);

    const formatDate = (inputDate: string) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
        };
        const parsedDate = new Date(inputDate);
        return parsedDate.toLocaleDateString("id-ID", options);
    };


    if (loading) {
        return (
            <PageTemplate title={t('loading', 'Memuat...')}>
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <Container title={t('title', 'Berita & Analisis Terbaru')}>
                        <div className="animate-pulse space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden bg-gray-200"></div>
                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                                ))}
                            </div>
                        </div>
                    </Container>
                </div>
            </PageTemplate>
        );
    }

    if (error || !berita) {
        return (
            <PageTemplate title="Berita Tidak Ditemukan">
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <Container title={t('title', 'Berita & Analisis Terbaru')}>
                        <div className="text-center">
                            <NotFound />
                            <p className="mt-4 text-gray-600">Maaf, berita yang Anda cari tidak ditemukan.</p>
                            <div className="mt-6">
                                <a 
                                    href="/analisis/berita" 
                                    className='inline-block bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md text-white transition-all duration-300'
                                >
                                    &#129032; Kembali ke Halaman Berita
                                </a>
                            </div>
                        </div>
                    </Container>
                </div>
            </PageTemplate>
        );
    }

    // Pastikan berita ada sebelum merender
    if (!berita) return null;

    return (
        <PageTemplate title={berita.title}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <Container title={t('title', 'Berita Terbaru')}>
                    <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden mb-8">
                        <Image
                            src={getFullImageUrl(berita.images)}
                            alt={berita.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="prose max-w-none">
                        <div className="flex items-center text-gray-500 text-sm mb-6">
                            <span>{formatDate(berita.created_at)}</span>
                            {berita.kategori?.name && (
                                <span className="mx-2">•</span>
                            )}
                            {berita.kategori?.name && (
                                <span className="text-green-600 font-medium">
                                    {berita.kategori.name}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            {berita.title}
                        </h1>
                        <div 
                            className="prose max-w-none" 
                            dangerouslySetInnerHTML={{ __html: berita.content }} 
                        />
                        
                        {/* Tombol Lihat Semua Berita */}
                        <div className="mt-10 pt-6 border-t border-gray-200 w-full">
                            <button 
                                onClick={() => router.push('/analisis/berita')}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                                Lihat Semua Berita
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        </PageTemplate>
    );
}
