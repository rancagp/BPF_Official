import NewsCard from "@/components/moleculs/Newscard";
import Header1 from "@/components/moleculs/Header1";

const pengumumanList = [
    {
        title: "Libur Nasional 17 Agustus",
        date: "5 3 2025",
        excerpt: "Dalam rangka Hari Kemerdekaan Republik Indonesia, seluruh aktivitas perdagangan akan diliburkan.",
        link: "/pengumuman/libur-17-agustus",
    },
    {
        title: "Pemeliharaan Sistem",
        date: "5 2 2025",
        excerpt: "Akan dilakukan pemeliharaan sistem pada hari Minggu pukul 00:00 - 06:00 WIB.",
        link: "/pengumuman/pemeliharaan-sistem",
    },
    {
        title: "Perubahan Jadwal Trading",
        date: "5 1 2025",
        excerpt: "Perubahan jadwal trading pada hari Jumat karena hari libur pasar global.",
        link: "/pengumuman/perubahan-jadwal",
    },
];


export default function Pengumuman() {
    return (
        <div className="mx-auto px-4">
            <Header1 title="Pengumuman" center className="mb-10 uppercase font-bold" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {pengumumanList.map((item, index) => (
                    <NewsCard key={index} {...item} />
                ))}
            </div>
        </div>
    );
}
