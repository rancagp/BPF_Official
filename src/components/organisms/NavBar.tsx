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
            { label: "Fasilitas & Layanan", href: "/informasi/fasilitas-layanan" },
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
                    { label: "Informasi", href: "/informasi/informasi-umum" },
                    { label: "Video", href: "/informasi/video-umum" },
                ],
            },
        ],
    },
    {
        label: "Produk",
        submenu: [
            { label: "Multilateral (JFX)",
                submenu: [
                    { label: "Kontrak Berjangka Olein (OLE)", href: "/produk/kontrak berjangka olein" },
                    { label: "Kontrak Berjangka Emas (GOL)", href: "/produk/kontrak berjangka emas" },
                    { label: "Kontrak Berjangka Emas 250gr (GOL 250)", href: "/produk/kontrak berjangka emas 250gr" },
                ]
            },
            { label: "Bilateral (SPA)", href: "/produk/SPA" },
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
        if (!isMobile) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setOpenDropdown(label);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            timeoutRef.current = setTimeout(() => {
                setOpenDropdown(null);
            }, 200); // delay close
        }
    };

    const closeAllMenus = () => {
        setOpenDropdown(null);
        setMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-40">
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
                .animate-slideDown {
                    animation: slideDown 0.25s ease-out forwards;
                }
                /* Pastikan dropdown kanan tidak terpotong */
                .navbar-dropdown-parent { overflow: visible !important; }
                .navbar-dropdown-sub { left: 100% !important; top: 0 !important; min-width: 14rem; }
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
                        className="md:hidden text-gray-800 hover:text-green-700 text-2xl transition-colors p-2 rounded-full hover:bg-gray-100"
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
                                        <button
                                            onClick={() => isMobile && toggleDropdown(item.label)}
                                            className="flex items-center gap-1.5 px-4 py-3 rounded-lg text-gray-800 hover:text-green-700 font-medium transition-all duration-300 hover:bg-gray-50 group"
                                        >
                                            <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 group-hover:after:w-full">
                                                {item.label}
                                            </span>
                                            <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200 group-hover:rotate-180" />
                                        </button>
                                        {openDropdown === item.label && (
                                            <div className="absolute top-full left-0 w-56 mt-2 z-50" onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
                                                <ul className="bg-white text-black rounded-lg shadow-lg border border-gray-100 overflow-hidden py-1 animate-fadeIn navbar-dropdown-parent">
                                                    {item.submenu.map((sub) => (
    <li key={sub.label} className="relative group">
        {sub.submenu ? (
            <>
                <button
                    type="button"
                    className="flex items-center w-full px-6 py-3 hover:bg-green-50 text-gray-700 hover:text-green-700 transition-colors duration-200"
                    tabIndex={0}
                    onClick={e => e.preventDefault()}
                >
                    {sub.label}
                    <i className="fa-solid fa-chevron-right ml-2 text-xs" />
                </button>
                <ul className="absolute navbar-dropdown-sub bg-white text-black rounded-lg shadow-lg border border-gray-100 overflow-hidden py-1 animate-fadeIn hidden group-hover:block group-focus-within:block z-50">
                    {sub.submenu.map((child) => (
                        <li key={child.href}>
                            <a
                                href={child.href}
                                className="block px-6 py-3 hover:bg-green-50 text-gray-700 hover:text-green-700 transition-colors duration-200 whitespace-nowrap"
                            >
                                {child.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </>
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

                {/* Menu Mobile */}
                {menuOpen && (
    <nav className="md:hidden px-6 py-4 space-y-2 text-base bg-white border-t border-gray-100 shadow-inner animate-slideDown">
        {menuItems.map((item) => (
            <div key={item.label}>
                {item.submenu ? (
                    <>
                        <button
                            onClick={() => {
                                setOpenDropdown(openDropdown === item.label ? null : item.label);
                                setOpenSubDropdown(null); // Tutup sub-submenu jika ganti menu utama
                            }}
                            className="w-full flex justify-between items-center py-3 px-4 rounded-lg text-gray-800 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                        >
                            {item.label}
                            <i
                                className={`fa-solid fa-chevron-down transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                            />
                        </button>
                        {openDropdown === item.label && (
                            <ul className="pl-4">
                                {item.submenu.map((sub) => (
                                    <li key={sub.label}>
                                        {sub.submenu ? (
                                            <>
                                                <button
                                                    onClick={() => setOpenSubDropdown(openSubDropdown === sub.label ? null : sub.label)}
                                                    className="w-full flex justify-between items-center py-2.5 px-6 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                                                >
                                                    {sub.label}
                                                    <i className={`fa-solid fa-chevron-down transition-transform ${openSubDropdown === sub.label ? "rotate-180" : ""}`} />
                                                </button>
                                                {openSubDropdown === sub.label && (
                                                    <ul className="pl-4 border-l border-gray-200 ml-2">
                                                        {sub.submenu.map((child) => (
                                                            <li key={child.href}>
                                                                <a
                                                                    href={child.href}
                                                                    className="block py-2.5 px-6 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                                                                    onClick={closeAllMenus}
                                                                >
                                                                    {child.label}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </>
                                        ) : (
                                            <a
                                                href={sub.href}
                                                className="block py-2.5 px-6 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                                                onClick={closeAllMenus}
                                            >
                                                {sub.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                ) : (
                    <a
                        href={item.href}
                        className="block py-3 px-4 rounded-lg text-gray-800 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                        onClick={closeAllMenus}
                    >
                        {item.label}
                    </a>
                )}
            </div>
        ))}
    </nav>
)}
            </div>
            <MarketUpdate />
        </header>
    );
}
