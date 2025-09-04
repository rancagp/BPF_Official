import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import PageTemplate from '@/components/templates/PageTemplate';
import Container from '@/components/templates/PageContainer/Container';
import NotFound from '@/components/moleculs/NotFound';
import { fetchNews, fetchNewsDetail } from '@/services/newsService';
import { NewsItem } from '@/services/newsService';
import Image from 'next/image';
import Link from 'next/link';

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
    const [relatedBerita, setRelatedBerita] = useState<NewsItem[]>([]);
    const [loadingRelated, setLoadingRelated] = useState(true);

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

    // Fungsi untuk mengambil berita terkait
    const fetchRelatedBerita = useCallback(async () => {
        if (!slug) return;
        
        try {
            setLoadingRelated(true);
            // Mengambil 10 berita terbaru untuk memastikan cukup berita setelah difilter
            const response = await fetchNews(1, 10, 'created_at', 'desc');
            
            if (!response || !response.data) {
                console.error('Response tidak valid:', response);
                return;
            }
            
            console.log('Berita yang diterima:', response.data);
            
            // Urutkan berdasarkan created_at terbaru
            const sortedBerita = [...response.data].sort((a: NewsItem, b: NewsItem) => 
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
            
            console.log('Berita setelah diurutkan:', sortedBerita);
            
            // Filter berita saat ini dari daftar related berita
            const filteredBerita = sortedBerita
                .filter((item: NewsItem) => item?.slug && item.slug !== slug)
                .slice(0, 3); // Ambil 3 berita terbaru setelah difilter
            
            console.log('Berita setelah difilter:', filteredBerita);
            
            setRelatedBerita(filteredBerita);
        } catch (error) {
            console.error('Gagal mengambil berita terkait:', error);
            setRelatedBerita([]);
        } finally {
            setLoadingRelated(false);
        }
    }, [slug]);
    
    // Panggil fungsi fetchRelatedBerita saat komponen dimount
    useEffect(() => {
        fetchRelatedBerita();
    }, [fetchRelatedBerita]);

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
                        <div className="w-full">
                            <div 
                                className="prose prose-lg max-w-none text-left mx-0"
                                style={{
                                    color: '#000000',
                                    lineHeight: '1.8',
                                    fontSize: '1.125rem',
                                    textAlign: 'left',
                                    maxWidth: 'none',
                                    width: '100%'
                                }}
                                dangerouslySetInnerHTML={{ 
                                    __html: berita.content 
                                        .replace(/<p(\s+[^>]*)?>/g, (match, p1) => {
                                            // Jika paragraf kosong atau hanya berisi whitespace, abaikan
                                            if (/^\s*$/.test(match)) return match;
                                            // Tambahkan class untuk spasi yang lebih besar
                                            return `<p class="mb-4 leading-relaxed"${p1 || ''}>`;
                                        })
                                        .replace(/<h2/g, '<h2 class="text-2xl font-bold mt-10 mb-4 text-gray-800"')
                                        .replace(/<h3/g, '<h3 class="text-xl font-semibold mt-8 mb-3 text-gray-800"')
                                        .replace(/<ul/g, '<ul class="list-disc pl-6 space-y-2 my-6"')
                                        .replace(/<ol/g, '<ol class="list-decimal pl-6 space-y-2 my-6"')
                                        .replace(/<a/g, '<a class="text-green-600 hover:text-green-700 hover:underline"')
                                        .replace(/<blockquote/g, '<blockquote class="border-l-4 border-green-500 pl-4 italic my-6 text-gray-600"')
                                        .replace(/<img/g, '<img class="my-6 rounded-lg shadow-md w-full h-auto"')
                                        .replace(/<table/g, '<table class="min-w-full divide-y divide-gray-200 my-6"')
                                        .replace(/<th/g, '<th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"')
                                        .replace(/<td/g, '<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"')
                                }} 
                            />
                        </div>
                        
                        {/* Another Posts Section */}
                        <div className="mt-10 pt-6 border-t border-gray-200 w-full">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">Berita Terbaru</h3>
                            {loadingRelated ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="animate-pulse">
                                            <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                    {relatedBerita.map((item) => (
                                        <div key={item.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                            <Link 
                                                href={`/analisis/berita/${item.slug}`}
                                                className="block h-full flex flex-col"
                                            >
                                                <div className="relative h-48 w-full overflow-hidden">
                                                    {item.images?.length ? (
                                                        <Image
                                                            src={item.images[2] 
                                                                ? `https://portalnews.newsmaker.id/${item.images[2].replace(/^\/+/, '')}`
                                                                : `https://portalnews.newsmaker.id/${item.images[1].replace(/^\/+/, '')}`}
                                                            alt={item.titles?.kpf || item.title || 'Berita terkait'}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.onerror = null;
                                                                target.src = 'https://via.placeholder.com/300x200?text=Gambar+Tidak+Tersedia';
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-300"></div>
                                                    )}
                                                </div>
                                                <div className="p-5 flex-1 flex flex-col">
                                                    <div className="mb-2">
                                                        {item.kategori?.name && (
                                                            <div className="text-xs font-medium text-green-600 mb-1">
                                                                {item.kategori.name}
                                                            </div>
                                                        )}
                                                        <div className="text-xs text-gray-500">
                                                            {formatDate(item.created_at)}
                                                        </div>
                                                    </div>
                                                    <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2" style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        textOverflow: 'ellipsis',
                                                        minHeight: '3em',
                                                        lineHeight: '1.5em',
                                                        overflow: 'hidden',
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        {item.titles?.kpf || item.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 line-clamp-3" style={{
                                                        marginTop: 'auto',
                                                        paddingTop: '0.5rem',
                                                        borderTop: '1px solid #f3f4f6'
                                                    }}>
                                                        {item.content?.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

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
