"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { getBanners } from "@/services/bannerService";
import { debounce } from "@/utils/debounce";

interface Banner {
    id: number;
    title: string;
    description: string;
    image: string;
    order: number;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

interface CTAButton {
    label: string;
    link: string;
}

interface Slide {
    title: string;
    description: string;
    image: string;
}

const defaultBanners: Banner[] = [
    {
        id: 1,
        title: "Real Time Online Trading",
        description: "Bergabunglah dan cobalah alat perdagangan online kami di manapun Anda berada. Hubungi marketing kami untuk memulai panduan yang tepat tentang online trading kami",
        image: "/assets/corousel-1.png",
        order: 1,
        is_active: true
    },
    {
        id: 2,
        title: "Layanan Terbaik",
        description: "Kami akan selalu memberikan layanan terbaik bagi seluruh calon nasabah dan nasabah terutama dalam hal kemudahan bertransaksi real account maupun demo account didukung oleh SDM berkualitas yang telah resmi menjadi wakil pialang berjangka melalui fit dan proper test dari Bappebti.",
        image: "/assets/corousel-2.png",
        order: 2,
        is_active: true
    }
];

const CTA_ITEMS = [
    { label: "Daftar Sekarang", link: "https://regol.kontak-perkasa-futures.co.id/" },
    { label: "Demo", link: "https://demo.kontakperkasafutures.com/login" },
    { label: "Live", link: "https://etrade.kontakperkasafutures.com/login" },
];

export default function CarouselWithContent() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [index, setIndex] = useState(1); // start dari 1 karena clone
    const [transitioning, setTransitioning] = useState(true);
    const [isTabActive, setIsTabActive] = useState(true);
    
    // Refs
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isMounted = useRef(true);
    const isTransitioningRef = useRef(false);
    
    // Fungsi untuk memuat banner
    const fetchBanners = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getBanners();
            console.log('Data banner yang diterima:', data);
            
            if (!isMounted.current) return;
            
            // Filter hanya banner yang aktif
            const activeBanners = data.filter(banner => banner.is_active);
            console.log('Active banners:', activeBanners);
            
            // Pastikan URL gambar lengkap
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
            const bannersWithFullUrls = activeBanners.map(banner => {
                // Jika gambar sudah URL lengkap, gunakan langsung
                if (banner.image.startsWith('http')) {
                    return banner;
                }
                
                // Jika gambar dimulai dengan /storage, tambahkan base URL
                if (banner.image.startsWith('/storage/')) {
                    return {
                        ...banner,
                        image: `${baseUrl}${banner.image}`
                    };
                }
                
                // Jika tidak, tambahkan base URL dengan format yang benar
                return {
                    ...banner,
                    image: `${baseUrl}${banner.image.startsWith('/') ? '' : '/'}${banner.image}`
                };
            });
            
            console.log('Banners with full URLs:', bannersWithFullUrls);
            
            // Urutkan berdasarkan order
            const sortedBanners = [...bannersWithFullUrls].sort((a, b) => a.order - b.order);
            console.log('Sorted banners:', sortedBanners);
            
            setBanners(sortedBanners);
            setError(null);
        } catch (err) {
            console.error('Gagal mengambil data banner:', err);
            if (isMounted.current) {
                setError('Gagal memuat banner. Menampilkan banner default.');
                setBanners(defaultBanners);
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, []);
    
    // Ambil data banner dari API
    useEffect(() => {
        fetchBanners();
        
        // Cleanup function
        return () => {
            isMounted.current = false;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (navigationCooldown.current) {
                clearTimeout(navigationCooldown.current);
            }
        };
    }, [fetchBanners]);

    // Inisialisasi slides dari data banner
    const slides: Slide[] = useMemo(() => {
        if (!banners || banners.length === 0) return [];
        
        return banners.map(banner => {
            try {
                // Pastikan URL gambar valid
                let imageUrl = banner.image?.trim() || '';
                
                // Jika URL relatif, tambahkan base URL
                if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
                    // Hapus slash di awal jika ada
                    imageUrl = imageUrl.replace(/^\/+/, '');
                    const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');
                    imageUrl = `${baseUrl}/${imageUrl}`;
                }
                
                if (!imageUrl) {
                    console.warn('Empty image URL for banner:', banner.id);
                    return null;
                }
                
                return {
                    title: banner.title || 'No Title',
                    description: banner.description || '',
                    image: imageUrl
                };
            } catch (error) {
                console.error('Error processing banner:', banner.id, error);
                return null;
            }
        }).filter(Boolean) as Slide[]; // Filter out any null entries
    }, [banners]);

    const totalSlides = Math.max(0, slides.length);
    
    // Buat array slides dengan kloning untuk infinite loop
    const fullSlides = useMemo(() => {
        if (totalSlides === 0) return [];
        if (totalSlides === 1) return [...slides]; // Tidak perlu kloning jika hanya 1 slide
        
        // Kloning slide terakhir di awal dan slide pertama di akhir
        return [
            slides[totalSlides - 1], // Kloning slide terakhir
            ...slides,                // Semua slide asli
            slides[0]                 // Kloning slide pertama
        ];
    }, [slides, totalSlides]);

    const goTo = useCallback((newIndex: number) => {
        // Pastikan index tidak melebihi batas
        if (newIndex < 0 || newIndex >= fullSlides.length) {
            console.warn('Index out of bounds:', newIndex);
            return;
        }
        setIndex(newIndex);
        setTransitioning(true);
    }, [fullSlides.length]);

    const [canNavigate, setCanNavigate] = useState(true);
    const navigationCooldown = useRef<NodeJS.Timeout | null>(null);

    // Reset navigation cooldown
    const resetNavigationCooldown = useCallback(() => {
        if (navigationCooldown.current) {
            clearTimeout(navigationCooldown.current);
        }
        navigationCooldown.current = setTimeout(() => {
            setCanNavigate(true);
        }, 800); // 800ms cooldown between navigations
    }, []);

    const goToNext = useCallback(() => {
        if (isTransitioningRef.current || !canNavigate) return;
        
        setCanNavigate(false);
        isTransitioningRef.current = true;
        goTo(index + 1);
        resetNavigationCooldown();
    }, [goTo, index, canNavigate, resetNavigationCooldown]);

    const goToPrev = useCallback(() => {
        if (isTransitioningRef.current || !canNavigate) return;
        
        setCanNavigate(false);
        isTransitioningRef.current = true;
        goTo(index - 1);
        resetNavigationCooldown();
    }, [goTo, index, canNavigate, resetNavigationCooldown]);

    const handleTransitionEnd = useCallback(() => {
        // Pastikan fullSlides memiliki konten yang valid
        if (fullSlides.length <= 1) {
            setTransitioning(false);
            return;
        }

        // Reset index jika mencapai ujung carousel
        if (index === 0) {
            // ke clone belakang → reset ke slide terakhir
            setTransitioning(false);
            requestAnimationFrame(() => {
                setIndex(totalSlides);
                requestAnimationFrame(() => {
                    setTransitioning(true);
                });
            });
        } else if (index === fullSlides.length - 1) {
            // ke clone depan → reset ke slide pertama
            setTransitioning(false);
            requestAnimationFrame(() => {
                setIndex(1);
                requestAnimationFrame(() => {
                    setTransitioning(true);
                });
            });
        } else {
            setTransitioning(false);
        }
    }, [index, totalSlides, fullSlides.length]);

    // Handle tab visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            const isVisible = !document.hidden;
            setIsTabActive(isVisible);
            
            if (isVisible && transitioning) {
                // Reset timer when tab becomes visible
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(goToNext, 8000);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [transitioning, goToNext]);

    // Autoplay
    useEffect(() => {
        if (!isTabActive || fullSlides.length <= 1) return;
        
        const startAutoplay = () => {
            if (isTransitioningRef.current) return;
            
            timeoutRef.current = setTimeout(() => {
                if (isTabActive && !isTransitioningRef.current && fullSlides.length > 1) {
                    // Pastikan index berikutnya valid
                    const nextIndex = index + 1;
                    if (nextIndex < fullSlides.length) {
                        goToNext();
                    } else {
                        // Reset ke slide pertama jika sudah di akhir
                        setIndex(1);
                        setTransitioning(true);
                    }
                }
            }, 5000); // 5 detik delay antar slide
        };

        // Mulai autoplay setelah transisi selesai
        if (transitioning) {
            const timer = setTimeout(() => {
                isTransitioningRef.current = false;
                // Jangan mulai autoplay jika ini adalah slide kloning
                if (index > 0 && index < fullSlides.length - 1) {
                    startAutoplay();
                }
            }, 1000); // Sesuaikan dengan durasi transisi CSS
            
            return () => clearTimeout(timer);
        } else if (index > 0 && index < fullSlides.length - 1) {
            // Hanya mulai autoplay jika bukan slide kloning
            startAutoplay();
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [index, transitioning, isTabActive, goToNext]);

    // Debounced navigation handlers
    const debouncedGoToNext = useCallback(debounce(goToNext, 300), [goToNext]);
    const debouncedGoToPrev = useCallback(debounce(goToPrev, 300), [goToPrev]);

    if (loading && banners.length === 0) {
        return (
            <div className="relative w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500">
                <div className="animate-pulse">Memuat banner...</div>
            </div>
        );
    }

    if (error || totalSlides === 0) {
        return (
            <div className="relative w-full h-96 bg-gray-200 flex items-center justify-center text-red-500">
                {error || 'Tidak ada banner yang tersedia'}
            </div>
        );
    }

    return (
        <div className="relative w-full overflow-hidden text-white">
            <div
                className="flex"
                style={{
                    transform: `translateX(-${index * 100}%)`,
                    transition: transitioning ? "transform 2s ease-in-out" : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {fullSlides.map((slide: Slide, i: number) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-full flex flex-col-reverse md:flex-row items-center justify-center gap-8 px-6 py-1 md:px-32"
                    >
                        {/* Teks */}
                        <div className="text-center md:text-left max-w-xl">
                            <h1 className="text-2xl md:text-4xl font-bold mb-4">{slide.title}</h1>
                            <p className="text-base md:text-lg mb-6">{slide.description}</p>
                            <div className="flex flex-col md:flex-row gap-3">
                                {CTA_ITEMS.map((item: CTAButton, i: number) => (
                                    <a
                                        key={i}
                                        href={item.link}
                                        target="_blank"
                                        className="inline-block bg-white hover:bg-gray-100 transition text-green-800 rounded-full px-5 py-3 font-semibold shadow"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Gambar */}
                        <div className="mt-8 md:mt-0">
                            <div className="h-100 md:h-120 w-full">
                                <img 
                                    src={slide.image} 
                                    alt={slide.title} 
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        console.error('Gagal memuat gambar:', {
                                            imageUrl: slide.image,
                                            error: e,
                                            timestamp: new Date().toISOString()
                                        });
                                        // Coba fallback ke placeholder yang ada di public folder
                                        e.currentTarget.src = '/placeholder.jpg';
                                        e.currentTarget.alt = 'Gambar tidak tersedia';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Slide ${i + 1}`}
                        onClick={() => goTo(i + 1)}
                        className={`h-3 w-3 rounded-full transition-all ${index === i + 1 ? "bg-white scale-110" : "bg-white/40"}`}
                    />
                ))}
            </div>

            {/* Tombol Navigasi */}
            <button
                aria-label="Previous Slide"
                onClick={debouncedGoToPrev}
                disabled={!canNavigate}
                className={`absolute top-1/2 left-4 -translate-y-1/2 text-white rounded-full p-2 transition-all duration-300 ${
                    canNavigate 
                        ? 'bg-white/30 hover:bg-white/50 cursor-pointer' 
                        : 'bg-white/20 cursor-not-allowed opacity-70'
                }`}
            >
                &#10094;
            </button>
            <button
                aria-label="Next Slide"
                onClick={debouncedGoToNext}
                disabled={!canNavigate}
                className={`absolute top-1/2 right-4 -translate-y-1/2 text-white rounded-full p-2 transition-all duration-300 ${
                    canNavigate 
                        ? 'bg-white/30 hover:bg-white/50 cursor-pointer' 
                        : 'bg-white/20 cursor-not-allowed opacity-70'
                }`}
            >
                &#10095;
            </button>
        </div>
    );
}
