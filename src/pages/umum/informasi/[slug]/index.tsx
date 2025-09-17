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

// formatDate hanya didefinisikan sekali
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
    const { t: tInfo } = useTranslation('informasi');
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
                                onClick={() => router.push(`/${i18n.language === 'en' ? 'en' : 'id'}/umum/informasi`)}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {tInfo('back_to_information_list')}
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
                        className="px-6 py-2.5 bg-gradient-to-r from-[#F2AC59] to-[#e09c4a] hover:from-[#e09c4a] hover:to-[#d08b3a] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
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
                <ProfilContainer title={tInfo('detail_information')}>
                    <div className="flex flex-col gap-8">
                        {berita.image && (
                            <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
                                    <Image
                                        src={berita.image}
                                        alt={berita.judul}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        className="object-contain p-4 sm:p-6"
                                        quality={85}
                                        priority
                                        unoptimized={!berita.image.startsWith('http')}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-gray-500">
                            <time dateTime={berita.created_at} className="flex items-center">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(berita.created_at, (i18n.language === 'id' || i18n.language === 'en' ? i18n.language : 'id') as 'id' | 'en')}
                            </time>
                            <span className="text-gray-300 hidden sm:inline">•</span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#FEF6E6] text-[#F2AC59] border border-[#FEE9C7]">
                                {berita.kategori || 'Informasi Umum'}
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            {berita.judul}
                        </h1>

                        <div 
                            className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed"
                            style={{
                                '--tw-prose-body': '#374151',
                                '--tw-prose-headings': '#111827',
                                '--tw-prose-links': '#F2AC59',
                                '--tw-prose-links-hover': '#e09c4a',
                                '--tw-prose-underline': 'rgba(5, 150, 105, 0.3)',
                                '--tw-prose-underline-hover': '#047857',
                                lineHeight: '1.75',
                            } as React.CSSProperties}
                            dangerouslySetInnerHTML={{ 
                                __html: (berita.isi || '')
                                    .toString()
                                    .replace(/<p(\s+[^>]*)?>/g, (match, p1) => {
                                        // Jika paragraf kosong atau hanya berisi whitespace, abaikan
                                        if (/^\s*$/.test(match)) return match;
                                        // Tambahkan class untuk spasi yang lebih besar
                                        return `<p class="mb-4 sm:mb-6"${p1 || ''}>`;
                                    })
                                    .replace(/<h2/g, '<h2 class="text-xl sm:text-2xl font-bold mt-10 sm:mt-12 mb-4 sm:mb-6 text-gray-900"')
                                    .replace(/<h3/g, '<h3 class="text-lg sm:text-xl font-semibold mt-8 sm:mt-10 mb-3 sm:mb-4 text-gray-900"')
                                    .replace(/<ul/g, '<ul class="list-disc pl-5 sm:pl-6 space-y-2 my-4 sm:my-6"')
                                    .replace(/<ol/g, '<ol class="list-decimal pl-5 sm:pl-6 space-y-2 my-4 sm:my-6"')
                                    .replace(/<li>/g, '<li class="pl-1">')
                                    .replace(/<a/g, '<a class="text-green-600 hover:text-green-700 hover:underline underline-offset-2"')
                                    .replace(/<blockquote/g, '<blockquote class="border-l-4 border-green-500 pl-4 sm:pl-6 italic my-6 sm:my-8 text-gray-600"')
                                    .replace(/<img/g, '<img class="my-6 sm:my-8 rounded-lg shadow-sm w-full h-auto mx-auto max-w-full" loading="lazy"')
                                    .replace(/<table/g, '<div class="w-full my-6 sm:my-8 overflow-hidden"><table class="w-full max-w-full border-collapse"')
                                    .replace(/<\/table>/g, '</table></div>')
                                    .replace(/<th/g, '<th class="p-2 sm:p-3 bg-gray-50 text-left text-xs sm:text-sm font-medium text-gray-500 align-top break-words"')
                                    .replace(/<td/g, '<td class="p-2 sm:p-3 text-sm sm:text-base text-gray-900 border-b border-gray-200 align-top break-words"')
                                    .replace(/<tr/g, '<tr class="hover:bg-gray-50"')
                            }}
                        />

                        <div className="mt-8 sm:mt-10 pt-6 border-t border-gray-200 w-full">
                            <div className="flex flex-row justify-between items-center mb-6 sm:mb-8 gap-2 sm:gap-4">
                                <div className="relative flex-shrink">
                                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900 inline-block relative pb-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] sm:max-w-none">
                                        {tInfo('latest_information')}
                                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#F2AC59] to-[#e09c4a] rounded-full"></span>
                                    </h3>
                                </div>
                                <button 
                                    onClick={() => {
                                        const lang = i18n.language || 'id';
                                        router.push(`/${lang}/umum/informasi`);
                                    }}
                                    className="px-3 py-1.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#F2AC59] to-[#e09c4a] hover:from-[#e09c4a] hover:to-[#d08b3a] text-white text-xs sm:text-base font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center whitespace-nowrap flex-shrink-0"
                                >
                                    <svg className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                    {tInfo('view_all_news', 'View All News')}
                                </button>
                            </div>
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
                                                        href={`${i18n.language === 'en' ? '/en' : ''}/umum/informasi/${item.slug}`}
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
                                                                <div className="text-xs font-medium text-[#F2AC59] mb-1">
                                                                    {item.kategori || 'Informasi'}
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {formatDate(item.created_at, (i18n.language === 'id' || i18n.language === 'en' ? i18n.language : 'id') as 'id' | 'en')}
                                                                </div>
                                                            </div>
                                                            <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#F2AC59] transition-colors line-clamp-2" style={{
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
                                            {tInfo('no_related_information')}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
