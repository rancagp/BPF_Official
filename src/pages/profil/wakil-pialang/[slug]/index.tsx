import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

export default function WakilPialangBySlug() {
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

    return (
        <PageTemplate title="Wakil Pialang">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={kategoriNama || "Wakil Pialang"}>
                    {loading ? (
                        <p>Memuat data Wakil Pialang...</p>
                    ) : wakilList.length === 0 ? (
                        <p className="text-gray-500">Tidak ada data Wakil Pialang untuk kategori ini.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden border bg-white">
                                <thead className="bg-green-500 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-sm font-semibold uppercase">No</th>
                                        <th className="px-6 py-3 text-sm font-semibold uppercase">Nama</th>
                                        <th className="px-6 py-3 text-sm font-semibold uppercase">Nomor Izin WPB</th>
                                        <th className="px-6 py-3 text-sm font-semibold uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {wakilList.map((wpb, index) => (
                                        <tr key={wpb.id} className="bg-zinc-50 hover:bg-green-100 transition duration-200">
                                            <td className="px-6 py-4 text-center">{index + 1}</td>
                                            <td className="px-6 py-4 text-center">{wpb.name}</td>
                                            <td className="px-6 py-4 text-center">{wpb.nomor_izin}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${wpb.status === "aktif"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {wpb.status === "aktif" ? "Aktif" : "Tidak Aktif"}
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
