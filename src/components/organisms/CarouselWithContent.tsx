"use client";

import { useEffect, useRef, useState } from "react";

interface Slide {
    title: string;
    description: string;
    image: string;
}

const slides: Slide[] = [
    {
        title: "Selamat Datang di PT. Solid Gold Berjangka",
        description: "Pialang berjangka terpercaya untuk masa depan keuangan Anda.",
        image: "/assets/corousel-1.png",
    },
    {
        title: "Solusi Investasi Profesional",
        description: "Kami hadir untuk membantu Anda meraih masa depan finansial yang lebih baik.",
        image: "/assets/corousel-2.png",
    },
    {
        title: "Layanan Konsultasi Eksklusif",
        description: "Didukung oleh analis berpengalaman dan teknologi modern.",
        image: "/assets/corousel-3.png",
    },
];

const totalSlides = slides.length;

export default function CarouselWithContent() {
    const [index, setIndex] = useState(1); // Start from 1 (karena slide 0 adalah clone terakhir)
    const [transitioning, setTransitioning] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const fullSlides = [
        slides[slides.length - 1], // Clone last
        ...slides,
        slides[0], // Clone first
    ];

    const goTo = (newIndex: number) => {
        setIndex(newIndex);
        setTransitioning(true);
    };

    const goToNext = () => {
        goTo(index + 1);
    };

    const goToPrev = () => {
        goTo(index - 1);
    };

    const handleTransitionEnd = () => {
        if (index === fullSlides.length - 1) {
            setTransitioning(false);
            setIndex(1);
        }
        if (index === 0) {
            setTransitioning(false);
            setIndex(totalSlides);
        }
    };

    // Autoplay
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            goToNext();
        }, 10000);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [index]);

    return (
        <div className="relative w-full overflow-hidden py-10 text-white">
            <div
                className={`flex w-full`}
                style={{
                    transform: `translateX(-${index * 100}%)`,
                    transition: transitioning ? "transform 0.7s ease-in-out" : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {fullSlides.map((slide, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-full px-10 md:px-32 flex items-center justify-center gap-16"
                    >
                        {/* Text */}
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-4">{slide.title}</h1>
                            <p className="text-lg mb-6">{slide.description}</p>
                            <div className="space-x-3">
                                <a href="#" className="bg-white hover:bg-gray-100 transition-all ease-in text-green-700 rounded-full px-5 py-3 font-bold shadow">
                                    Registrasi Akun Online
                                </a>
                                <a href="#" className="bg-white hover:bg-gray-100 transition-all ease-in text-green-700 rounded-full px-5 py-3 font-bold shadow">
                                    Akun Demo
                                </a>
                                <a href="#" className="bg-white hover:bg-gray-100 transition-all ease-in text-green-700 rounded-full px-5 py-3 font-bold shadow">
                                    Akun Real
                                </a>
                            </div>
                        </div>
                        {/* Gambar */}
                        <div className="hidden md:block">
                            <img src={slide.image} alt={slide.title} className="h-130 w-auto object-contain" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, dotIndex) => (
                    <button
                        key={dotIndex}
                        onClick={() => goTo(dotIndex + 1)}
                        className={`h-2 w-2 rounded-full ${dotIndex + 1 === index ? "bg-white" : "bg-gray-400"}`}
                    />
                ))}
            </div>

            {/* Tombol Navigasi */}
            <button
                onClick={goToPrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 text-white px-3 py-2 rounded-full hover:bg-white/40"
            >
                &#10094;
            </button>
            <button
                onClick={goToNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 text-white px-3 py-2 rounded-full hover:bg-white/40"
            >
                &#10095;
            </button>
        </div>
    );
}
