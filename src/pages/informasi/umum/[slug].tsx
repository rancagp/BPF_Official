import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import Image from "next/image";

type Berita = {
    id: number;
    image: string;
    kategori: string;
    status: string;
    judul: string;
    slug: string;
    isi: string;
    created_at: string;
    updated_at: string;
};

export default function DetailBerita() {
    const router = useRouter();
    const { slug } = router.query;
    const [berita, setBerita] = useState<Berita | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBerita() {
            if (!slug) return;

            try {
                const response = await fetch(`/api/berita?slug=${slug}`);
                if (!response.ok) {
                    throw new Error('Berita tidak ditemukan');
                }
                const data = await response.json();
                
                if (data && data.length > 0) {
                    setBerita(data[0]);
                } else {
                    setError('Berita tidak ditemukan');
                }
            } catch (err) {
                console.error('Error fetching berita:', err);
                setError('Gagal memuat berita. Silakan coba lagi nanti.');
            } finally {
                setLoading(false);
            }
        }

        fetchBerita();
    }, [slug]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Jakarta'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    if (loading) {
        return (
            <PageTemplate title="Memuat...">
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                </div>
            </PageTemplate>
        );
    }

    if (error || !berita) {
        return (
            <PageTemplate title="Error">
                <div className="text-center py-20">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                    <p className="text-gray-600">{error || 'Berita tidak ditemukan'}</p>
                    <button 
                        onClick={() => router.back()}
                        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Kembali
                    </button>
                </div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title={berita.judul}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={berita.judul}>
                    <div className="mb-8">
                        <div className="text-sm text-gray-500 mb-2">
                            Dipublikasikan pada: {formatDate(berita.created_at)}
                        </div>
                        {berita.updated_at !== berita.created_at && (
                            <div className="text-sm text-gray-500 mb-4">
                                Diperbarui pada: {formatDate(berita.updated_at)}
                            </div>
                        )}
                        
                        {berita.image && (
                            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden my-6">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/img/berita/${berita.image}`}
                                    alt={berita.judul}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                        
                        <div 
                            className="prose max-w-none mt-8 text-justify"
                            dangerouslySetInnerHTML={{ __html: berita.isi }}
                        />
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={() => router.back()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Kembali ke Halaman Beranda
                        </button>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
