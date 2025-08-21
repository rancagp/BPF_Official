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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    // Gunakan ref untuk melacak perubahan state banners
    const bannersRef = useRef<Banner[]>([]);
    
    // Update ref ketika state banners berubah
    useEffect(() => {
        console.log('State banners berubah:', banners);
        bannersRef.current = banners;
    }, [banners]);
    const [index, setIndex] = useState(1); // start dari 1 karena clone
    const [transitioning, setTransitioning] = useState(true);
    const [isTabActive, setIsTabActive] = useState(true);
    
    // Refs
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isMounted = useRef(true);
    const isTransitioningRef = useRef(false);
    
    // Fungsi untuk memuat banner
    const fetchBanners = useCallback(async () => {
        // Set isMounted ke true saat memulai
        isMounted.current = true;
        console.log('Memulai pengambilan banner...');
        setLoading(true);
        
        try {
            console.log('Mengambil data dari API...');
            const response = await getBanners();
            
            // Periksa apakah komponen masih terpasang
            if (!isMounted.current) {
                console.log('Komponen sudah tidak terpasang, hentikan proses');
                return;
            }
            
            console.log('Response dari API:', response);
            
            // Pastikan data yang diterima adalah array
            if (!Array.isArray(response)) {
                console.error('Format data banner tidak valid:', response);
                throw new Error('Format data banner tidak valid');
            }
            
            // Buat salinan data untuk menghindari mutasi
            const data = JSON.parse(JSON.stringify(response));
            
            console.log('Data banner yang akan diproses:', data);
            
            // Filter hanya banner yang aktif
            const activeBanners = data.filter((banner: any) => banner?.is_active);
            console.log('Jumlah banner aktif:', activeBanners.length, activeBanners);
            
            // Jika tidak ada banner aktif, gunakan default
            if (activeBanners.length === 0) {
                console.log('Tidak ada banner aktif, menggunakan banner default');
                setBanners(defaultBanners);
                setLoading(false);
                return;
            }
            
            // Pastikan URL gambar lengkap
            const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');
            console.log('Menggunakan base URL:', baseUrl);
            
            // Proses banner
            const processedBanners = activeBanners.map((banner: any) => {
                try {
                    if (!banner) {
                        console.warn('Banner null/undefined ditemukan');
                        return null;
                    }
                    
                    // Pastikan banner memiliki properti yang diperlukan
                    if (!banner.id || !banner.title || !banner.image) {
                        console.warn('Banner tidak valid - properti penting hilang:', banner);
                        return null;
                    }
                    
                    let imageUrl = banner.image?.toString().trim() || '';
                    
                    // Jika gambar sudah URL lengkap, gunakan langsung
                    if (imageUrl.startsWith('http')) {
                        return banner;
                    }
                    
                    // Tambahkan base URL jika diperlukan
                    if (imageUrl.startsWith('/')) {
                        imageUrl = imageUrl.substring(1); // Hapus slash di depan
                    }
                    
                    const fullImageUrl = `${baseUrl}/${imageUrl}`;
                    
                    return {
                        ...banner,
                        image: fullImageUrl
                    };
                } catch (err) {
                    console.error('Error memproses banner:', banner?.id, err);
                    return null;
                }
            }).filter(Boolean); // Hapus null entries
            
            console.log('Banner setelah diproses:', processedBanners);
            
            // Urutkan berdasarkan order
            const sortedBanners = [...processedBanners].sort((a: any, b: any) => 
                (a.order || 0) - (b.order || 0)
            );
            
            console.log('Banner setelah diurutkan:', sortedBanners);
            
            // Update state hanya jika komponen masih terpasang
            if (isMounted.current) {
                console.log('Mengupdate state banners dengan:', sortedBanners);
                setBanners(sortedBanners as Banner[]);
                setError(null);
                setLoading(false);
                console.log('State setelah update - loading:', false, 'banners:', sortedBanners);
            } else {
                console.log('Komponen sudah tidak terpasang, batalkan update state');
            }
        } catch (err) {
            console.error('Gagal mengambil data banner:', err);
            if (isMounted.current) {
                const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat banner';
                console.log('Menampilkan banner default karena error:', errorMessage);
                setError('Gagal memuat banner. Menampilkan banner default.');
                setBanners(defaultBanners);
            }
        } finally {
            console.log('Mengubah status loading menjadi false');
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, []);
    
    // Ambil data banner dari API
    useEffect(() => {
        console.log('Komponen Carousel dipasang, memulai fetchBanners');
        fetchBanners().catch(err => {
            console.error('Error dalam fetchBanners:', err);
            if (isMounted.current) {
                setError('Terjadi kesalahan saat memuat banner');
                setBanners(defaultBanners);
                setLoading(false);
            }
        });
        
        // Cleanup function
        return () => {
            console.log('Komponen Carousel dilepas, membersihkan resource');
            isMounted.current = false;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            if (navigationCooldown.current) {
                clearTimeout(navigationCooldown.current);
                navigationCooldown.current = null;
            }
        };
    }, []); // Hanya dijalankan sekali saat komponen dipasang

    // Inisialisasi slides dari data banner
    const slides: Slide[] = useMemo(() => {
        // Gunakan ref untuk mendapatkan nilai terbaru dari banners
        const currentBanners = bannersRef.current;
        console.log('Menginisialisasi slides dari banners:', currentBanners);
        
        if (!currentBanners || currentBanners.length === 0) {
            console.log('Tidak ada banner yang tersedia');
            return [];
        }
        
        const processedSlides = currentBanners.map(banner => {
            try {
                if (!banner) {
                    console.warn('Banner null/undefined ditemukan');
                    return null;
                }
                
                // Pastikan URL gambar valid
                let imageUrl = banner.image?.trim() || '';
                console.log('Memproses banner:', banner.id, 'dengan image:', imageUrl);
                
                // Jika URL relatif, tambahkan base URL
                if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
                    // Hapus slash di awal jika ada
                    imageUrl = imageUrl.replace(/^\/+/, '');
                    const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');
                    imageUrl = `${baseUrl}/${imageUrl}`;
                }
                
                if (!imageUrl) {
                    console.warn('URL gambar kosong untuk banner:', banner.id);
                    return null;
                }
                
                const slide = {
                    title: banner.title || 'No Title',
                    description: banner.description || '',
                    image: imageUrl
                };
                
                console.log('Banner berhasil diproses:', banner.id, slide);
                return slide as Slide;
            } catch (error) {
                console.error('Error memproses banner:', banner?.id, error);
                return null;
            }
        }).filter(Boolean) as Slide[]; // Hapus entri null
        
        console.log('Total slide yang diproses:', processedSlides.length, processedSlides);
        return processedSlides;
    }, [banners]);

    const totalSlides = Math.max(0, slides.length);
    
    // Buat array slides dengan kloning untuk infinite loop
    const fullSlides = useMemo(() => {
        if (totalSlides === 0) return [];
        if (totalSlides === 1) return [...slides]; // Tidak perlu kloning jika hanya 1 slide
        
        // Pastikan slides memiliki isi sebelum mengakses indeks
        if (!slides || slides.length === 0) return [];
        
        // Kloning slide terakhir di awal dan slide pertama di akhir
        return [
            slides[totalSlides - 1], // Kloning slide terakhir
            ...slides,                // Semua slide asli
            slides[0]                 // Kloning slide pertama
        ];
    }, [slides, totalSlides]);

    const goTo = useCallback((newIndex: number) => {
        // Pastikan fullSlides sudah terisi
        if (!fullSlides || fullSlides.length === 0) {
            console.warn('No slides available');
            return;
        }
        
        // Pastikan index tidak melebihi batas
        const safeIndex = Math.max(0, Math.min(newIndex, fullSlides.length - 1));
        
        if (newIndex !== safeIndex) {
            console.warn('Adjusted index from', newIndex, 'to', safeIndex);
        }
        
        setIndex(safeIndex);
        setTransitioning(true);
    }, [fullSlides]);

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

    // Fungsi untuk navigasi ke slide berikutnya
    const next = useCallback(() => {
        if (!canNavigate || fullSlides.length <= 1) return;
        setCanNavigate(false);
        const newIndex = (index + 1) % fullSlides.length;
        goTo(newIndex);
        resetNavigationCooldown();
    }, [index, canNavigate, goTo, resetNavigationCooldown, fullSlides.length]);

    // Fungsi untuk navigasi ke slide sebelumnya
    const prev = useCallback(() => {
        if (!canNavigate || fullSlides.length <= 1) return;
        setCanNavigate(false);
        const newIndex = (index - 1 + fullSlides.length) % fullSlides.length;
        goTo(newIndex);
        resetNavigationCooldown();
    }, [index, canNavigate, goTo, resetNavigationCooldown, fullSlides.length]);

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
                timeoutRef.current = setTimeout(next, 8000);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [transitioning, next]);

    // Autoplay
    useEffect(() => {
        if (!isTabActive || fullSlides.length <= 1) return;
        
        const startAutoplay = () => {
            if (isTransitioningRef.current) return;
            
            timeoutRef.current = setTimeout(() => {
                if (isTabActive && !isTransitioningRef.current && fullSlides.length > 1) {
                    // Gunakan fungsi next yang sudah didefinisikan
                    next();
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
    }, [index, transitioning, isTabActive, next]);

    // Debounced navigation handlers
    const debouncedGoToNext = useCallback(debounce(next, 300), [next]);
    const debouncedGoToPrev = useCallback(debounce(prev, 300), [prev]);

    // Tampilkan loading hanya jika benar-benar loading dan belum ada banner
    if (loading && banners.length === 0) {
        console.log('Menampilkan loading state');
        return (
            <div className="relative w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500">
                <div className="animate-pulse">Memuat banner...</div>
            </div>
        );
    }
    
    // Jika tidak loading tapi tidak ada banner, tampilkan pesan
    if (banners.length === 0) {
        console.log('Tidak ada banner yang tersedia untuk ditampilkan');
        return (
            <div className="relative w-full h-96 bg-gray-200 flex items-center justify-center text-red-500">
                Tidak ada banner yang tersedia
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
