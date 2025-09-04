import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import Link from "next/link";
import Image from 'next/image';

interface KategoriPialang {
    id: number;
    nama_kategori: string;
    slug: string;
    image?: string;
}

// Data dummy untuk pengembangan
const dataDummy: KategoriPialang[] = [
    { 
        id: 1, 
        nama_kategori: "Jakarta", 
        slug: "wakil-pialang-jakarta",
        image: "/images/cities/jakarta.jpg"
    },
    { 
        id: 2, 
        nama_kategori: "Yogyakarta", 
        slug: "wakil-pialang-yogyakarta",
        image: "/images/cities/yogyakarta.jpg"
    },
    { 
        id: 3, 
        nama_kategori: "Bali", 
        slug: "wakil-pialang-bali",
        image: "/images/cities/bali.jpg"
    },
    { 
        id: 4, 
        nama_kategori: "Makassar", 
        slug: "wakil-pialang-makassar",
        image: "/images/cities/makassar.jpg"
    },
    { 
        id: 5, 
        nama_kategori: "Bandung", 
        slug: "wakil-pialang-bandung",
        image: "/images/cities/bandung.jpg"
    },
    { 
        id: 6, 
        nama_kategori: "Semarang", 
        slug: "wakil-pialang-semarang",
        image: "/images/cities/semarang.jpg"
    },
];

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale || 'id', ['wakil_pialang', 'common', 'footer'])),
        },
    };
}

export default function WakilPialang() {
    const { t } = useTranslation('wakil_pialang');
    const [kategori, setKategori] = useState<KategoriPialang[]>([]);
    const [sedangMemuat, setSedangMemuat] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const ambilKategori = async () => {
            try {
                // Gunakan Next.js API route
                const response = await fetch('/api/kategori-pialang', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`Terjadi kesalahan: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (Array.isArray(data)) {
                    // Tambahkan gambar default jika tidak ada
                    const dataDenganGambar = data.map((item, index) => ({
                        ...item,
                        image: dataDummy[index % dataDummy.length]?.image || '/images/cities/default.jpg'
                    }));
                    setKategori(dataDenganGambar);
                } else {
                    throw new Error("Format data tidak valid");
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui';
                console.error("Gagal memuat kategori:", errorMessage);
                setError(t('errorText', 'Gagal memuat data. Silakan coba lagi nanti.'));
                setKategori(dataDummy);
            } finally {
                setSedangMemuat(false);
            }
        };

        ambilKategori();
    }, [t]);

    if (sedangMemuat) {
        return (
            <PageTemplate title={t('pageTitle')} description={t('pageDescription')}>
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer 
                        title={t('pageTitle', 'Wakil Pialang')}
                        description={t('pageDescription', 'Temukan wakil pialang terdekat di kota Anda.')}
                    >
                        <div className="animate-pulse space-y-6">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="flex items-center p-6 bg-gray-50 rounded-lg">
                                    <div className="w-12 h-12 bg-gray-200 rounded-xl mr-4"></div>
                                    <div className="flex-1">
                                        <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    </div>
                                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    if (error && kategori.length === 0) {
        return (
            <PageTemplate title={t('pageTitle')} description={t('pageDescription')}>
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer 
                        title={t('pageTitle', 'Wakil Pialang')}
                        description={t('pageDescription', 'Temukan wakil pialang terdekat di kota Anda.')}
                    >
                        <div className="text-center py-8">
                            <p className="text-red-600 mb-6">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                {t('tryAgain', 'Coba Lagi')}
                            </button>
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title={t('pageTitle')} description={t('pageDescription')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer 
                    title={t('pageTitle', 'Wakil Pialang')}
                    description={t('pageDescription', 'Temukan wakil pialang terdekat di kota Anda.')}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {kategori.map((item) => (
                            <Link 
                                key={item.id} 
                                href={`/profil/wakil-pialang/${item.slug}`}
                                className="block group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-green-100 hover:bg-gradient-to-br hover:from-white hover:to-green-50 transition-all duration-300 h-full">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 mr-4 group-hover:bg-green-100 group-hover:scale-110 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                                            {item.nama_kategori}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-600 transition-colors">
                                            {t('viewAllText', 'Lihat Semua')}
                                        </p>
                                    </div>
                                    <div className="ml-4 text-gray-300 group-hover:text-green-500 transition-colors">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
