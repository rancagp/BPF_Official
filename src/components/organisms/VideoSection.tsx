import VideoCard from "../moleculs/VideoCard";

export default function VideoSection() {
    const videoList = [
        {
            title: "Kemeriahan 17 Agustus 2024 PT. Kontakperkasa Futures Jakarta",
            desc: "Perayaan Hari Kemerdekaan 17 Agustus 2024 di KPF Jakarta",
            videoUrl: "https://www.youtube.com/embed/ZW7CWB8fnZs"
        },
        {
            title: "Bulan Literasi PBK 2024 - 5 Agustus 2024",
            desc: "Kegiatan Bulan Literasi Perdagangan Berjangka Komoditi di tahun 2024",
            videoUrl: "https://www.youtube.com/embed/GW0TRluwfC0"
        },
        {
            title: "Bulan Literasi PBK KPF Marein 2023",
            desc: "Kegiatan Literasi PBK bersama KPF Marein tahun 2023",
            videoUrl: "https://www.youtube.com/embed/bIKJmN-sPS4"
        }
    ];

    return (
        <section className="py-2 px-4 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
                {videoList.map((item, index) => (
                    <VideoCard
                        key={index}
                        title={item.title}
                        description={item.desc}
                        videoUrl={item.videoUrl}
                    />
                ))}
            </div>
        </section>
    );
}
