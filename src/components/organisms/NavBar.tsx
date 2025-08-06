"use client";

import { useEffect, useRef, useState } from "react";
// Animation components will be added later
import MarketUpdate from "./MarketUpdate";

const menuItems = [
    { label: "Beranda", href: "/" },
    {
        label: "Tentang Kami",
        submenu: [
            { label: "Profil Perusahaan", href: "/profil/perusahaan" },
            { label: "Legalitas Bisnis", href: "/profil/legalitas-bisnis" },
            { label: "Wakil Pialang", href: "/profil/wakil-pialang" },
            { label: "Badan Regulasi", href: "/profil/badan-regulasi" },
            { label: "Fasilitas & Layanan", href: "/umum/fasilitas-layanan" },
            {
                label: "Pencapaian",
                submenu: [
                    { label: "Penghargaan", href: "/profil/pencapaian/penghargaan" },
                    { label: "Sertifikat", href: "/profil/pencapaian/sertifikat" },
                ],
            },
            {
                label: "Umum",
                submenu: [
                    { label: "Informasi", href: "/umum/informasi" },
                    { label: "Video", href: "/umum/video" },
                ],
            },
        ],
    },
    {
        label: "Produk",
        submenu: [
            { label: "Semua Produk", href: "/produk" },
            { label: "Produk JFX", href: "/produk/jfx" },
            { label: "Produk SPA", href: "/produk/spa" },
            { label: "Keunggulan Produk", href: "/produk/keunggulan-produk" },
            { label: "Ilustrasi Transaksi", href: "/prosedur/ilustrasi-transaksi" },
        ],
    },

    {
        label: "Prosedur",
        submenu: [
            { label: "Prosedur Registrasi Online", href: "/prosedur/registrasi-online" },
            { label: "Prosedur Penarikan", href: "/prosedur/penarikan" },
            { label: "Petunjuk Transaksi", href: "/prosedur/petunjuk-transaksi" },
        ],
    },
    {
        label: "Analisis",
        submenu: [
            { label: "Berita", href: "/analisis/berita" },
            { label: "Kalender Ekonomi", href: "/analisis/economic-calendar" },
            { label: "Data Historis", href: "/analisis/historical-data" },
            { label: "Pivot & Fibonacci", href: "/analisis/pivot-fibonacci" },
        ],
    },
    {
        label: "Edukasi",
        submenu: [
            { label: "Mekanisme Perdagangan", href: "/edukasi/mekanisme-perdagangan" },
            { label: "Symbol Indeks", href: "/edukasi/symbol-indeks" },
            { label: "Loco London Gold", href: "/edukasi/loco-london-gold" },
            { label: "Summer & Winter", href: "/edukasi/summer-winter" },
            { label: "Artikel", href: "/edukasi/artikel" },
            { label: "Marketing Tools", href: "https://digitalmarketing.kp-futures.com/"},
        ]
    },
];

// Definisikan tipe untuk item menu agar lebih aman
interface MenuItem {
    label: string;
    href?: string;
    submenu?: MenuItem[];
}

export default function Navbar() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const toggleDropdown = (label: string) => {
        setOpenDropdown((prev) => (prev === label ? null : label));
    };

    const handleMouseEnter = (label: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setOpenDropdown(label);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
            setOpenSubDropdown(null);
        }, 200); // Sedikit jeda sebelum menutup
    };

    const closeAllMenus = () => {
        setMenuOpen(false);
        setOpenDropdown(null);
        setOpenSubDropdown(null);
    };

    return (
        <header className="sticky top-0 z-50 bg-white">
            <style>{`
                .animate-slideDown {
                    animation: slideDown 0.3s ease-in-out;
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Navbar utama */}
            <div className="bg-white text-black shadow-sm">
                
                <div className="flex justify-start items-center px-4 md:px-4 lg:px-8 py-3 max-w-7xl mx-auto w-full">
                    
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-1 group">
                        <img 
                            src="/assets/logo-kpf-full.png" 
                            alt="Logo KPF" 
                            className="h-8 md:h-10 transition-transform duration-300 group-hover:scale-105" 
                        />
                    </a>

                    {/* Mobile menu toggle */}
                    <button
                        className="md:hidden ml-auto text-gray-800 hover:text-green-700 text-2xl transition-colors p-2 rounded-full hover:bg-gray-100"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
                    </button>

                    {/* Menu Desktop */}
                                        <nav className="hidden md:flex items-center space-x-4 ml-6">
                        {menuItems.map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => handleMouseEnter(item.label)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {item.submenu ? (
                                    <>
                                        <button className="px-4 py-3 rounded-lg text-gray-800 hover:text-green-700 font-medium transition-all duration-300 hover:bg-gray-50 group flex items-center gap-2">
                                            <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 group-hover:after:w-full">
                                                {item.label}
                                            </span>
                                            <i className={`fa-solid fa-chevron-down text-xs transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openDropdown === item.label && (
                                            <div className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-xl py-2 z-20 border border-gray-100">
                                                <ul>
                                                    {item.submenu.map((sub) => (
                                                        <li key={sub.label}>
                                                            {sub.submenu ? (
                                                                <div 
                                                                    className="relative"
                                                                    onMouseEnter={() => setOpenSubDropdown(sub.label)}
                                                                    onMouseLeave={() => setOpenSubDropdown(null)}
                                                                >
                                                                    <button className="w-full text-left flex justify-between items-center px-6 py-3 hover:bg-green-50 text-gray-700 hover:text-green-700 transition-colors duration-200">
                                                                        {sub.label}
                                                                        <i className="fa-solid fa-chevron-right text-xs" />
                                                                    </button>
                                                                    {openSubDropdown === sub.label && (
                                                                        <div className="absolute left-full -top-1 mt-0 w-64 bg-white rounded-lg shadow-xl py-2 z-30 border border-gray-100">
                                                                            <ul>
                                                                                {sub.submenu.map((child) => (
                                                                                    <li key={child.href}>
                                                                                        <a
                                                                                            href={child.href}
                                                                                            className="block px-6 py-3 hover:bg-green-50 text-gray-700 hover:text-green-700 transition-colors duration-200"
                                                                                        >
                                                                                            {child.label}
                                                                                        </a>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <a
                                                                    href={sub.href}
                                                                    className="block px-6 py-3 hover:bg-green-50 text-gray-700 hover:text-green-700 transition-colors duration-200"
                                                                >
                                                                    {sub.label}
                                                                </a>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <a
                                        href={item.href}
                                        className="px-4 py-3 rounded-lg text-gray-800 hover:text-green-700 font-medium transition-all duration-300 hover:bg-gray-50 group"
                                    >
                                        <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 group-hover:after:w-full">
                                            {item.label}
                                        </span>
                                    </a>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Mobile Menu (Dropdown with Scroll) */}
                {menuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg animate-slideDown">
                        <nav className="px-4 pt-2 pb-4 max-h-[70vh] overflow-y-auto">
                            {menuItems.map((item) => (
                                <div key={item.label} className="py-1 border-b border-gray-100 last:border-b-0">
                                    {item.submenu ? (
                                        <>
                                            <button
                                                onClick={() => toggleDropdown(item.label)}
                                                className="w-full flex justify-between items-center py-3 px-2 rounded-lg text-gray-800 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 font-medium"
                                            >
                                                {item.label}
                                                <i className={`fa-solid fa-chevron-down text-sm transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                                            </button>
                                            {openDropdown === item.label && (
                                                <ul className="pl-4 pt-2 pb-2 border-l border-green-200 ml-2">
                                                    {item.submenu.map((sub) => (
                                                        <li key={sub.label} className="py-1">
                                                            {sub.submenu ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => setOpenSubDropdown(openSubDropdown === sub.label ? null : sub.label)}
                                                                        className="w-full flex justify-between items-center py-2 px-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-200 text-left"
                                                                    >
                                                                        {sub.label}
                                                                        <i className={`fa-solid fa-chevron-down text-xs transition-transform ${openSubDropdown === sub.label ? "rotate-180" : ""}`} />
                                                                    </button>
                                                                    {openSubDropdown === sub.label && (
                                                                        <ul className="pl-4 pt-2 pb-1 border-l border-gray-200 ml-2">
                                                                            {sub.submenu.map((child) => (
                                                                                <li key={child.href}>
                                                                                    <a href={child.href} onClick={closeAllMenus} className="block py-2 px-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-green-600 transition-colors duration-200">
                                                                                        {child.label}
                                                                                    </a>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <a href={sub.href} onClick={closeAllMenus} className="block py-2 px-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-200">
                                                                    {sub.label}
                                                                </a>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ) : (
                                        <a href={item.href} onClick={closeAllMenus} className="block py-3 px-2 rounded-lg text-gray-800 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 font-medium">
                                            {item.label}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
            <MarketUpdate />
        </header>
    );
}
