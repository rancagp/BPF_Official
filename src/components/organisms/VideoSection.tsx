import { useState } from "react";
import VideoCard from "../moleculs/VideoCard";


export default function VideoSection() {
    const [modalState, setModalState] = useState({ isOpen: false, videoUrl: '' });

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

    const handleOpenModal = (videoUrl: string) => {
        setModalState({ isOpen: true, videoUrl });
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, videoUrl: '' });
    };

    return (
        <>
            <section className="py-2 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
                    {videoList.map((item, index) => (
                        <VideoCard
                            key={index}
                            title={item.title}
                            description={item.desc}
                            videoUrl={item.videoUrl}
                            onClick={() => handleOpenModal(item.videoUrl)}
                        />
                    ))}
                </div>
            </section>

            {modalState.isOpen && modalState.videoUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-3" onClick={handleCloseModal}>
                    <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-1 text-gray-700 hover:text-black"
                            onClick={handleCloseModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <div className="bg-white rounded-xl p-1 shadow-lg">
                            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                <iframe
                                    src={`${modalState.videoUrl}?autoplay=1`}
                                    title="Video Player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
