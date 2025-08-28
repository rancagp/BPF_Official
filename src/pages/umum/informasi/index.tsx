import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import NewsCard2 from "@/components/moleculs/NewsCard2";

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
};

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'informasi', 'footer'])),
        },
    };
};

export default function InformasiUmum() {
    const { t } = useTranslation('informasi');
    const [beritaList, setBeritaList] = useState<Berita[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchBerita() {
            try {
                const response = await fetch("/api/berita");
                if (!response.ok) throw new Error("Gagal memuat data informasi");

                const data: Berita[] = await response.json();
                const processedData = data.map(item => {
                    let imageUrl = undefined;
                    if (item.image) {
                        if (item.image.startsWith('http')) {
                            imageUrl = item.image;
                        } else if (item.image.startsWith('/')) {
                            imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}${item.image}`;
                        } else {
                            imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/img/berita/${item.image}`;
                        }
                    }
                    return {
                        ...item,
                        image: imageUrl
                    };
                });

                setBeritaList(processedData);
            } catch (error) {
                console.error("Error fetching informasi:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBerita();
    }, []);

    return (
        <PageTemplate title={t('pageTitle')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('pageTitle')}>
                    {loading ? (
                        <div className="flex justify-center py-16">
                            <div className="animate-pulse flex flex-col items-center">
                                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                <div className="h-3 bg-gray-100 rounded w-24"></div>
                            </div>
                        </div>
                    ) : beritaList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {beritaList.map((item) => (
                                <div 
                                    key={item.id}
                                    className="transform transition-transform duration-300 hover:-translate-y-1"
                                >
                                    <NewsCard2
                                        title={item.judul}
                                        date={item.created_at}
                                        content={item.isi}
                                        link={`/umum/informasi/${item.slug}`}
                                        image={item.image}
                                        category={item.kategori || t('generalCategory', 'Umum')}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Tidak ada informasi</h3>
                            <p className="mt-1 text-gray-500">Tidak ada informasi yang tersedia saat ini.</p>
                        </div>
                    )}
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
