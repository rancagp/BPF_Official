// BeritaSection.tsx

import NewsCard from "@/components/moleculs/Newscard";
import Header2 from "@/components/moleculs/Header2";

interface BeritaSectionProps {
    limit?: number;
    showHeader?: boolean; // default false
    className?: string; // optional class name for container
}

const beritaList = [
    {
        title: "Kinerja Perdagangan Komoditas Meningkat",
        date: "1 Juli 2025",
        excerpt:
            "Pasar komoditas menunjukkan performa yang kuat di kuartal kedua tahun ini. Harga emas, minyak sawit, dan perak mengalami kenaikan yang signifikan seiring meningkatnya permintaan global dan stabilitas kebijakan fiskal. PT Solid Gold Berjangka mencatat pertumbuhan volume transaksi yang positif dibandingkan periode sebelumnya.",
        link: "/berita/kinerja-perdagangan",
    },
    {
        title: "PT Solid Gold Buka Cabang Baru",
        date: "28 Juni 2025",
        excerpt:
            "Peresmian kantor cabang baru di Yogyakarta disambut antusias oleh para investor lokal. Cabang ini dilengkapi fasilitas modern dan layanan konsultasi investasi personal untuk meningkatkan kepercayaan serta edukasi masyarakat terhadap perdagangan berjangka.",
        link: "/berita/buka-cabang-baru",
    },
    {
        title: "Webinar Edukasi Pasar Komoditas Digelar",
        date: "20 Juni 2025",
        excerpt:
            "PT Solid Gold Berjangka mengadakan webinar nasional dengan tema 'Strategi Investasi Komoditas di Era Digital'. Acara ini diikuti oleh ratusan peserta dari berbagai kota dan menghadirkan pembicara ahli di bidang pasar berjangka dan ekonomi global.",
        link: "/berita/webinar-edukasi",
    },
    {
        title: "Peningkatan Literasi Keuangan Melalui Sekolah Pasar",
        date: "15 Juni 2025",
        excerpt:
            "Program Sekolah Pasar kembali digelar sebagai komitmen perusahaan dalam meningkatkan pemahaman masyarakat tentang instrumen perdagangan komoditas. Materi yang disampaikan mencakup analisa teknikal, manajemen risiko, dan pengenalan kontrak derivatif.",
        link: "/berita/sekolah-pasar",
    },
];

export default function BeritaSection({ className, limit, showHeader = true }: BeritaSectionProps) {
    const data = typeof limit === "number" ? beritaList.slice(0, limit) : beritaList;

    return (
        <div className={`${className}`}>
            {showHeader && <Header2 title="Berita Terbaru" />}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((berita, index) => (
                    <NewsCard key={index} {...berita} />
                ))}
            </div>
        </div>
    );
}
