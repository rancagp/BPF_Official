import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

interface WakilPialang {
    id: number;
    name: string;  // Diubah dari 'nama' menjadi 'name' untuk konsistensi dengan backend
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
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
                
                // Ambil detail kategori
                const kategoriResponse = await fetch(`${apiUrl}/api/kategori-wakil-pialang/${slug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    // credentials: 'include', // Uncomment ini jika menggunakan session/cookie
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

                // Ambil daftar wakil pialang berdasarkan kategori
                const wakilResponse = await fetch(`${apiUrl}/api/kategori-wakil-pialang/${slug}/wakil`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    // credentials: 'include', // Uncomment ini jika menggunakan session/cookie
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
            <PageTemplate title={t('pageTitle')} description={t('pageDescription')}>
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title={t('loading')}>
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">{t('loadingText')}</p>
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title={t('pageTitle')} description={t('pageDescription')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={kategoriNama || "Wakil Pialang"}>
                    {wakilList.length === 0 ? (
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">
                            {t('wakilPialangIn', { city: kategoriNama })}
                        </h1>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden border bg-white">
                                <thead className="bg-green-500 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-sm font-semibold uppercase">{t('table.no', { ns: 'wakil_pialang' })}</th>
                                        <th className="px-6 py-3 text-sm font-semibold uppercase">{t('table.name', { ns: 'wakil_pialang' })}</th>
                                        <th className="px-6 py-3 text-sm font-semibold uppercase">{t('table.licenseNumber', { ns: 'wakil_pialang' })}</th>
                                        <th className="px-6 py-3 text-sm font-semibold uppercase">{t('table.status', { ns: 'wakil_pialang' })}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {wakilList.map((wpb, index) => (
                                        <tr key={wpb.id} className="bg-zinc-50 hover:bg-green-100 transition duration-200">
                                            <td className="px-6 py-4 text-center">{index + 1}</td>
                                            <td className="px-6 py-4 text-center">{wpb.name}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="text-sm font-medium text-gray-500">
                                                    {t('licenseNumber')}: {wpb.nomor_izin}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${wpb.status.toLowerCase() === "aktif"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {wpb.status.toLowerCase() === "aktif" ? t('active') : t('inactive')}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
