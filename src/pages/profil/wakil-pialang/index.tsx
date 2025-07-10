import { useEffect, useState } from "react";
import CardCategoryPialang from "@/components/atoms/CardCategoryPialang";
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

export default function WakilPialang() {
    const [kategori, setKategori] = useState<KategoriPialang[]>([]);
    const [sedangMemuat, setSedangMemuat] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const ambilKategori = async () => {
            try {
                // Gunakan data dummy untuk sementara
                setKategori(dataDummy);
                setSedangMemuat(false);
                
                // Jika ingin menggunakan API, aktifkan kode di bawah ini
                /*
                const response = await fetch("/api/kategori-pialang");
                if (!response.ok) {
                    throw new Error(`Terjadi kesalahan: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setKategori(data);
                } else {
                    throw new Error("Format data tidak valid");
                }
                */
            } catch (err) {
                console.error("Gagal memuat kategori:", err);
                setError("Gagal memuat data. Silakan coba lagi nanti.");
            } finally {
                setSedangMemuat(false);
            }
        };

        ambilKategori();
    }, []);

    if (sedangMemuat) {
        return (
            <PageTemplate title="Wakil Pialang">
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title="Daftar Wakil Pialang">
                        <div className="text-center py-10">Memuat data...</div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    if (error) {
        return (
            <PageTemplate title="Wakil Pialang">
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title="Terjadi Kesalahan">
                        <div className="text-center py-10 text-red-600">
                            {error}
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title="Wakil Pialang">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Daftar Wakil Pialang">
                    {kategori.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {kategori.map((item) => (
                                <Link 
                                    key={item.id} 
                                    href={`/profil/wakil-pialang/${item.slug}`}
                                    className="block hover:opacity-90 transition-opacity"
                                >
                                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {item.nama_kategori}
                                        </h3>
                                        <p className="mt-2 text-blue-600">Lihat detail →</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            Tidak ada data wakil pialang yang tersedia.
                        </div>
                    )}
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
