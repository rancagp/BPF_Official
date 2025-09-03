import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import NewsCard from "@/components/moleculs/Newscard";
import { NewsItem, fetchFeaturedNews } from '@/services/newsService';

// Fungsi untuk mendapatkan URL gambar yang lengkap
// Mengambil gambar ketiga (indeks 2) atau keempat (indeks 3) dari API
const getFullImageUrl = (images: string[] | undefined) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return '/images/placeholder-news.jpg';
  }
  
  // Ambil gambar ketiga (indeks 2) atau keempat (indeks 3) dari API
  const imagePath = images[2] || images[3] || images[0]; // Fallback ke gambar pertama jika indeks 2 dan 3 tidak ada
  
  if (!imagePath) return '/images/placeholder-news.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return `http://portalnews.test/${imagePath.replace(/^\/+/, '')}`;
};

interface BeritaSectionProps {
    limit?: number;
    showHeader?: boolean;
    className?: string;
}

export default function BeritaSection({ className, limit = 3, showHeader = true }: BeritaSectionProps) {
    const { t } = useTranslation('berita');
    const router = useRouter();
    const { locale } = router;
    const [news, setNews] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNews = async () => {
            try {
                setIsLoading(true);
                const featuredNews = await fetchFeaturedNews(limit);
                setNews(featuredNews);
                setError(null);
            } catch (err) {
                console.error('Error loading news:', err);
                setError('Gagal memuat berita. Silakan coba lagi nanti.');
            } finally {
                setIsLoading(false);
            }
        };

        loadNews();
    }, [limit]);

    return (
        <div className={`${className} mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`}>
            {showHeader && (
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 text-xs font-semibold text-green-700 bg-green-100 rounded-full mb-3">
                        {t('latestUpdate')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-black bg-clip-text text-transparent">
                        {t('title')}
                    </h2>
                    <div className="w-24 h-1 bg-green-600 rounded-full mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('description')}
                    </p>
                </div>
            )}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(limit)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-12">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        Coba Lagi
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((berita, index) => (
                        <div 
                            key={berita.id}
                            className="transform transition-transform duration-300 hover:-translate-y-1"
                            data-aos="fade-up"
                            data-aos-delay={`${(index % 3) * 100}`}
                        >
                            <NewsCard
                                title={berita.title}
                                date={berita.created_at}
                                content={berita.content?.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}
                                slug={berita.slug}
                                img={getFullImageUrl(berita.images)}
                            />
                        </div>
                    ))}
                </div>
            )}
            
            {(!limit || news.length > 0) && (
                <div className="text-center mt-12">
                    <Link 
                        href="/analisis/berita"
                        locale={locale}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-800 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        {t('viewAllNews')}
                        <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            )}
        </div>
    );
}
