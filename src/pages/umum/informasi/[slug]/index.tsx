import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProfilContainer from '@/components/templates/PageContainer/Container';
import PageTemplate from '@/components/templates/PageTemplate';

type Berita = {
    id: number;
    image?: string;
    kategori: string;
    status: string;
    judul: string;
    slug: string;
    isi: string;
    created_at: string;
    updated_at: string;
    ringkasan?: string;
};

type DaftarBerita = {
    data: Berita[];
    current_page: number;
    last_page: number;
    total: number;
};

// ✅ formatDate hanya didefinisikan sekali
const formatDate = (inputDate: string, language: 'id' | 'en' = 'id'): string => {
    try {
        const parsedDate = new Date(inputDate);
        if (isNaN(parsedDate.getTime())) {
            throw new Error('Invalid date');
        }
        return parsedDate.toLocaleDateString(language, {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    } catch (e) {
        console.error('Invalid date format:', inputDate, e);
        return '';
    }
};

const processImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return undefined;
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/')) return `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}${imageUrl}`;
    return `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/img/berita/${imageUrl}`;
};

export const getStaticProps: GetStaticProps = async ({ locale = 'id', params }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'informasi', 'footer'])),
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default function DetailBerita() {
    const router = useRouter();
    const { slug } = router.query;
    const { t, i18n } = useTranslation(['common', 'informasi', 'footer']);
    const [berita, setBerita] = useState<Berita | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [relatedInfo, setRelatedInfo] = useState<Berita[]>([]);
    const [loadingRelated, setLoadingRelated] = useState(true);

    useEffect(() => {
        if (!router.isReady) return;
        if (!slug) {
            setError('Slug tidak valid');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/berita/${slug}`);
                if (!response.ok) {
                    throw new Error('Gagal memuat data berita');
                }
                const data = await response.json();
                const processedData = {
                    ...data,
                    image: processImageUrl(data.image)
                };
                setBerita(processedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        
        const fetchRelatedInfo = async () => {
            try {
                setLoadingRelated(true);
                const apiUrl = `/api/berita?per_page=4`; // Ambil 4 untuk antisipasi ada yang terfilter
                console.log('Mengambil data dari:', apiUrl);
                
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    console.error('Response tidak OK:', response.status, response.statusText);
                    throw new Error('Gagal memuat informasi terkait');
                }
                
                const data: Berita[] = await response.json();
                console.log('Data mentah dari API:', data);
                
                const currentSlug = Array.isArray(slug) ? slug[0] : slug;
                console.log('Current slug:', currentSlug);
                
                // Lakukan filter dan sortir di sisi klien
                const filteredData = Array.isArray(data) 
                    ? data
                        // Urutkan dulu berdasarkan tanggal terbaru
                        .sort((a, b) => {
                            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                        })
                        // Filter berita yang bukan yang sedang dilihat
                        .filter(item => item.slug !== currentSlug)
                        // Ambil 3 teratas
                        .slice(0, 3)
                        // Proses URL gambar
                        .map(item => ({
                            ...item,
                            image: processImageUrl(item.image)
                        }))
                    : [];
                
                console.log('Data setelah difilter dan diurutkan:', filteredData);
                setRelatedInfo(filteredData);
            } catch (err) {
                console.error('Error fetching related info:', err);
                setRelatedInfo([]);
            } finally {
                setLoadingRelated(false);
            }
        };
        
        if (slug) {
            fetchRelatedInfo();
        }
    }, [router.isReady, slug]);

    if (!router.isReady || loading) {
        return (
            <PageTemplate title="Memuat...">
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title="Memuat...">
                        <div className="animate-pulse space-y-6">
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-64 bg-gray-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    if (error) {
        return (
            <PageTemplate title="Error">
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title="Error">
                        <div className="text-center py-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Terjadi Kesalahan</h2>
                            <p className="text-gray-600 mb-6">{error}</p>
                            <button
                                onClick={() => router.push('/umum/informasi')}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Kembali ke Daftar Informasi
                            </button>
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    if (!berita) {
        return (
            <PageTemplate title="Tidak Ditemukan">
                <div className="text-center py-16">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Berita Tidak Ditemukan</h2>
                    <p className="text-gray-600 mb-6">Maaf, berita yang Anda cari tidak dapat ditemukan.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title={berita.judul}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('detail_information', 'Detail Informasi')}>
                    <div className="max-w-4xl mx-auto">
                        {berita.image && (
                            <div className="mb-8 flex justify-center">
                                <div className="relative w-full max-w-3xl">
                                    <div className="relative aspect-video max-h-[500px] bg-gray-50 rounded-lg overflow-hidden">
                                        <Image
                                            src={berita.image}
                                            alt={berita.judul}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 800px"
                                            className="object-contain p-2"
                                            quality={85}
                                            priority
                                            unoptimized={!berita.image.startsWith('http')}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                            <time dateTime={berita.created_at} className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(berita.created_at, (i18n.language === 'id' || i18n.language === 'en' ? i18n.language : 'id') as 'id' | 'en')}
                            </time>
                            <span className="text-gray-300">•</span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                {berita.kategori || 'Informasi Umum'}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                            {berita.judul}
                        </h1>

                        <div 
                            className="prose prose-lg max-w-none text-gray-700"
                            style={{
                                color: '#374151',
                                lineHeight: '1.8',
                            }}
                            dangerouslySetInnerHTML={{ 
                                __html: berita.isi
                                    .replace(/<p>/g, '<p class="mb-4">')
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

                        <div className="mt-10 pt-6 border-t border-gray-200 w-full">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">Informasi Terbaru</h3>
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
                                    {relatedInfo && relatedInfo.length > 0 ? (
                                        relatedInfo.map((item) => (
                                            item && item.id && (
                                                <div key={item.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                                    <a 
                                                        href={`/umum/informasi/${item.slug}`}
                                                        className="block h-full flex flex-col"
                                                    >
                                                        <div className="relative h-48 w-full overflow-hidden">
                                                            {item.image ? (
                                                                <Image
                                                                    src={item.image}
                                                                    alt={item.judul}
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
                                                                <div className="text-xs font-medium text-green-600 mb-1">
                                                                    {item.kategori || 'Informasi'}
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {formatDate(item.created_at, (i18n.language === 'id' || i18n.language === 'en' ? i18n.language : 'id') as 'id' | 'en')}
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
                                                                {item.judul}
                                                            </h4>
                                                            <p className="text-sm text-gray-600 line-clamp-3" style={{
                                                                marginTop: 'auto',
                                                                paddingTop: '0.5rem',
                                                                borderTop: '1px solid #f3f4f6'
                                                            }}>
                                                                {item.ringkasan || (item.isi ? item.isi.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : '')}
                                                            </p>
                                                        </div>
                                                    </a>
                                                </div>
                                            )
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-4 text-gray-500">
                                            Tidak ada informasi terkait yang tersedia
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <button 
                                onClick={() => router.push('/umum/informasi')}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto text-sm font-medium"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                {t('back_to_information', 'Kembali ke Daftar Informasi')}
                            </button>
                        </div>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
