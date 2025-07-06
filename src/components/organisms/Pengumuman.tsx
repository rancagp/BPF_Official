import pengumumanList from "@/data/PengumumanList";
import NewsCard2 from "@/components/moleculs/NewsCard2";
import Header1 from "@/components/moleculs/Header1";

export default function PengumumanHome() {
    return (
        <div className="mx-auto px-4 py-10">
            <Header1 title="Pengumuman" center className="mb-10 uppercase font-bold" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {pengumumanList.map((item, index) => (
                    <NewsCard2
                        key={index}
                        title={item.title}
                        date={item.date}
                        content={item.content}
                        link={`/informasi/umum/${item.slug}`}
                    />
                ))}
            </div>
        </div>
    );
}
