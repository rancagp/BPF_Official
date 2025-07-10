import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

interface WakilPialang {
    id: number;
    nama: string;
    nomor_izin: string;
    status: string;
    kategori_wakil_pialang: {
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

        const fetchWakilPialang = async () => {
            try {
                const response = await fetch("/api/wakil-pialang");
                const data = await response.json();

                const filtered = data.filter((item: WakilPialang) => item.kategori_wakil_pialang?.slug === slug);

                setWakilList(filtered);

                if (filtered.length > 0) {
                    setKategoriNama(filtered[0].kategori_wakil_pialang.nama_kategori);
                } else {
                    setKategoriNama("Kategori Tidak Ditemukan");
                }
            } catch (error) {
                console.error("Gagal memuat data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWakilPialang();
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
                                            <td className="px-6 py-4 text-center">{wpb.nama}</td>
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
