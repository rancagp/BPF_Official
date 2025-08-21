import { useState } from "react";
import { useTranslation } from 'next-i18next';
import VideoCard from "../moleculs/VideoCard";

interface VideoItem {
    title: string;
    description: string;
    videoUrl: string;
}

export default function VideoSection() {
    const { t } = useTranslation('video');
    const [modalState, setModalState] = useState({ isOpen: false, videoUrl: '' });
    const videoData = t('videos', { returnObjects: true });
    const videoList = Array.isArray(videoData) ? videoData : [];

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
                    {videoList.map((item: VideoItem, index: number) => (
                        <VideoCard
                            key={index}
                            title={item.title}
                            description={item.description}
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
