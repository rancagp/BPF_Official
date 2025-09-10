import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

interface WakilPialang {
    id: number;
    name: string;
    nomor_izin: string;
    status: string;
    kategori_wakil_pialang?: {
        id: number;
        slug: string;
        nama_kategori: string;
    };
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale || 'id', ['wakil_pialang', 'common', 'footer'])),
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}

export default function WakilPialangBySlug() {
    const { t } = useTranslation('wakil_pialang');
    const router = useRouter();
    const { slug } = router.query;

    const [wakilList, setWakilList] = useState<WakilPialang[]>([]);
    const [loading, setLoading] = useState(true);
    const [kategoriNama, setKategoriNama] = useState<string>("");

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                // Gunakan Next.js API route
                const kategoriResponse = await fetch(`/api/kategori-pialang/${slug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                
                if (!kategoriResponse.ok) {
                    throw new Error('Gagal memuat detail kategori');
                }
                
                const kategoriData = await kategoriResponse.json();
                console.log('Detail kategori:', kategoriData);
                
                if (kategoriData.success && kategoriData.data) {
                    setKategoriNama(kategoriData.data.nama_kategori);
                } else {
                    throw new Error('Data kategori tidak valid');
                }

                // Ambil daftar wakil pialang menggunakan API route Next.js
                const wakilResponse = await fetch(`/api/wakil-pialang?kategori_slug=${slug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                
                const wakilData = await wakilResponse.json();
                console.log('Daftar wakil pialang:', wakilData);
                
                if (!wakilData.success) {
                    throw new Error(wakilData.message || 'Gagal memuat daftar wakil pialang');
                }
                
                // Pastikan data adalah array, jika tidak gunakan array kosong
                const wakilList = Array.isArray(wakilData.data) ? wakilData.data : [];
                setWakilList(wakilList);
                
                // Jika tidak ada data, tampilkan pesan
                if (wakilList.length === 0) {
                    console.log('Tidak ada data wakil pialang untuk kategori ini');
                }
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui';
                console.error("Gagal memuat data:", errorMessage);
                setKategoriNama(`Error: ${errorMessage}`);
                setWakilList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <PageTemplate 
                title={t('loadingText')}
                description={t('loadingDescription')}
            >
                <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto">
                    <ProfilContainer title="">
                        <div className="animate-pulse space-y-8">
                            <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {[1, 2, 3, 4, 5].map((item) => (
                                            <tr key={item}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="h-6 bg-gray-100 rounded-full w-20"></div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title={t('pageTitle')} description={t('pageDescription')}>
            <div className="px-4 sm:px-6 py-8 max-w-4xl mx-auto">
                <ProfilContainer title={kategoriNama || "Wakil Pialang"}>
                    {wakilList.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Data Tidak Ditemukan</h3>
                            <p className="text-gray-600">Tidak ada data wakil pialang untuk wilayah ini</p>
                        </div>
                    ) : (
                        <div className="relative w-full">
                            <div className="overflow-x-auto w-full">
                                <div className="inline-block min-w-full py-2">
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-[#4C4C4C] w-full">
                                            <tr>
                                                <th scope="col" className="w-12 px-2 py-3 text-left text-xs font-semibold text-white">
                                                    {t('table.no', { ns: 'wakil_pialang' })}
                                                </th>
                                                <th scope="col" className="w-1/4 px-2 py-3 text-left text-xs font-semibold text-white">
                                                    {t('table.name', { ns: 'wakil_pialang' })}
                                                </th>
                                                <th scope="col" className="w-1/3 px-2 py-3 text-left text-xs font-semibold text-white">
                                                    {t('table.licenseNumber', { ns: 'wakil_pialang' })}
                                                </th>
                                                <th scope="col" className="w-24 px-2 py-3 text-left text-xs font-semibold text-white">
                                                    {t('table.status', { ns: 'wakil_pialang' })}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 bg-white">
                                            {wakilList.map((wpb, index) => (
                                                <tr key={wpb.id} className="bg-white hover:bg-gray-50 transition-colors group">
                                                    <td className="whitespace-nowrap px-2 py-3 text-xs text-gray-500">
                                                    {index + 1}
                                                </td>
                                                <td className="px-2 py-3">
                                                    <div className="text-[11px] font-medium text-gray-900 line-clamp-2 leading-tight">{wpb.name}</div>
                                                </td>
                                                <td className="px-2 py-3">
                                                    <div className="text-xs text-gray-500 break-words">{wpb.nomor_izin}</div>
                                                </td>
                                                <td className="px-2 py-3">
                                                        <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium w-full justify-center ${
                                                            wpb.status.toLowerCase() === "aktif" 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {wpb.status.toLowerCase() === "aktif" ? t('active') : t('inactive')}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                                </tbody>
                                        </table>
                                    </div>
                                    <div className="sm:hidden px-4 py-2 text-xs text-gray-500 text-center bg-gray-50 border-t border-gray-200">
                                        Geser ke kanan untuk melihat lebih banyak
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
