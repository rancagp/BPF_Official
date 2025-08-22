import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import Link from "next/link";

interface KategoriPialang {
    id: number;
    nama_kategori: string;
    slug: string;
}

// Data dummy untuk pengembangan
const dataDummy: KategoriPialang[] = [
    { id: 1, nama_kategori: "Jakarta", slug: "wakil-pialang-jakarta" },
    { id: 2, nama_kategori: "Yogyakarta", slug: "wakil-pialang-yogyakarta" },
    { id: 3, nama_kategori: "Bali", slug: "wakil-pialang-bali" },
    { id: 4, nama_kategori: "Makassar", slug: "wakil-pialang-makassar" },
    { id: 5, nama_kategori: "Bandung", slug: "wakil-pialang-bandung" },
    { id: 6, nama_kategori: "Semarang", slug: "wakil-pialang-semarang" },
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
                    const errorData = await response.json().catch(() => ({}));
                    console.error('Error response:', errorData);
                    throw new Error(`Terjadi kesalahan: ${response.status} - ${response.statusText}`);
                }
                
                const data = await response.json();
                
                if (Array.isArray(data)) {
                    setKategori(data);
                } else {
                    console.error('Format data tidak valid:', data);
                    throw new Error("Format data tidak valid");
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui';
                console.error("Gagal memuat kategori:", errorMessage);
                setError(`${t('errorText')} ${errorMessage}`);
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
                    <ProfilContainer title={t('wakilPialangList')}>
                        <div className="text-center py-10">{t('loadingText')}</div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    if (error && kategori.length === 0) {
        return (
            <PageTemplate title={t('pageTitle')} description={t('pageDescription')}>
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title={t('error')}>
                        <div className="text-center py-10 text-red-600">
                            {error}
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title={t('pageTitle')} description={t('pageDescription')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('wakilPialangList')}>
                    <div className="space-y-4">
                        {kategori.map((item) => (
                            <Link 
                                key={item.id} 
                                href={`/profil/wakil-pialang/${item.slug}`}
                                className="block group"
                            >
                                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-medium text-gray-900 truncate">
                                            {item.nama_kategori}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {t('viewAllText')}
                                        </p>
                                    </div>
                                    <div className="ml-4 text-gray-400 group-hover:text-green-500 transition-colors">
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
