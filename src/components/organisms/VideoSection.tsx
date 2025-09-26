import { useState } from "react";
import { useTranslation } from 'next-i18next';
import VideoCard from "../moleculs/VideoCard";

interface VideoItem {
    title: string;
    description: string;
    videoUrl: string;
    category?: string;
    duration?: string;
    date?: string;
}

export default function VideoSection() {
    const { t } = useTranslation('video');
    const [modalState, setModalState] = useState({ isOpen: false, videoUrl: '' });
    const [activeCategory, setActiveCategory] = useState('all');
    const videoData = t('videos', { returnObjects: true });
    const videoList = Array.isArray(videoData) ? videoData : [];

    // Extract unique categories
    const categories = ['all', ...new Set(videoList.map((video: VideoItem) => video.category || 'Uncategorized'))];

    const filteredVideos = activeCategory === 'all' 
        ? videoList 
        : videoList.filter((video: VideoItem) => video.category === activeCategory);

    const handleOpenModal = (videoUrl: string) => {
        setModalState({ isOpen: true, videoUrl });
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, videoUrl: '' });
    };

    return (
        <>
            <section className="py-8 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {videoList.map((item: VideoItem, index: number) => (
                        <VideoCard
                            key={index}
                            title={item.title}
                            description={item.description}
                            videoUrl={item.videoUrl}
                            category={item.category}
                            duration={item.duration}
                            date={item.date}
                            onClick={() => handleOpenModal(item.videoUrl)}
                        />
                    ))}
                </div>
            </section>

            {modalState.isOpen && modalState.videoUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-3" onClick={handleCloseModal}>
                    <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute -top-10 right-0 z-10 bg-[#FF0000] rounded-full p-2 text-white hover:bg-[#E60000] transition-colors"
                            onClick={handleCloseModal}
                            aria-label="Tutup video"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="bg-[#080031] rounded-xl overflow-hidden shadow-2xl">
                            <div className="aspect-video bg-black">
                                <iframe
                                    src={`${modalState.videoUrl}?autoplay=1`}
                                    title="Video Player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
