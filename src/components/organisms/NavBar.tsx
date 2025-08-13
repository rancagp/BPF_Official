"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import MarketUpdate from "./MarketUpdate";

interface MenuItem {
    label: string;
    href?: string;
    submenu?: MenuItem[];
    key?: string;
}

const NavBar: React.FC = () => {
    const { t, i18n } = useTranslation('common');
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [navKey, setNavKey] = useState(0);
    
    // Debug: Log language and translations
    useEffect(() => {
        console.log('=== DEBUG NAVBAR ===');
        console.log('Current language:', i18n.language);
        console.log('Available languages:', i18n.languages);
        
        // Cek resource bundle
        try {
            const resources = i18n.services.resourceStore.data;
            console.log('Available resources:', Object.keys(resources));
            
            if (resources[i18n.language]?.navbar) {
                console.log('Navbar translations:', resources[i18n.language].navbar);
            } else {
                console.error('No navbar translations found for language:', i18n.language);
            }
        } catch (error) {
            console.error('Error getting resources:', error);
        }
        
        // Cek beberapa terjemahan kunci
        const testKeys = ['home', 'about', 'products', 'procedures', 'analysis', 'education'];
        testKeys.forEach(key => {
            const translation = t(key, `${key} (not found)`);
            console.log(`Translation for ${key}:`, translation);
        });
        
        console.log('Is i18n initialized?', i18n.isInitialized);
        console.log('i18n instance:', i18n);
        console.log('==================');
    }, [i18n.language, t, i18n]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Force re-render when language changes
    useEffect(() => {
        const handleLanguageChanged = () => {
            setNavKey(prev => prev + 1);
            setOpenDropdown(null);
            setOpenSubDropdown(null);
        };

        i18n.on('languageChanged', handleLanguageChanged);
        return () => {
            i18n.off('languageChanged', handleLanguageChanged);
        };
    }, [i18n]);

    // Daftar menu dengan terjemahan langsung
    const menuItems: MenuItem[] = [
        { 
            label: t('home', 'Beranda'),
            href: "/",
            key: 'home'
        },
        {
            label: t('about', 'Tentang Kami'),
            key: 'about',
            submenu: [
                { 
                    label: t('about_companyProfile', 'Profil Perusahaan'),
                    href: "/profil/perusahaan" 
                },
                { 
                    label: t('about_businessLicense', 'Legalitas Bisnis'),
                    href: "/profil/legalitas-bisnis" 
                },
                { 
                    label: t('about_brokerRepresentative', 'Wakil Pialang'),
                    href: "/profil/wakil-pialang" 
                },
                { 
                    label: t('about_regulatoryBody', 'Badan Regulasi'),
                    href: "/profil/badan-regulasi" 
                },
                { 
                    label: t('about_facilitiesServices', 'Fasilitas & Layanan'), 
                    href: "/umum/fasilitas-layanan" 
                },
                {
                    label: t('about_achievements', 'Pencapaian'),
                    key: 'achievements',
                    submenu: [
                        { 
                            label: t('about_achievements_awards', 'Penghargaan'), 
                            href: "/profil/pencapaian/penghargaan" 
                        },
                        { 
                            label: t('about_achievements_certificates', 'Sertifikat'), 
                            href: "/profil/pencapaian/sertifikat" 
                        },
                    ],
                },
                {
                    label: t('about_general', 'Umum'),
                    key: 'general',
                    submenu: [
                        { 
                            label: t('about_general_information', 'Informasi'), 
                            href: "/umum/informasi" 
                        },
                        { 
                            label: t('about_general_videos', 'Video'), 
                            href: "/umum/video" 
                        },
                    ],
                },
            ],
        },
        {
            label: t('products', 'Produk'),
            key: 'products',
            submenu: [
                { 
                    label: t('products_allProducts', 'Semua Produk'), 
                    href: "/produk/semua-produk" 
                },
                { 
                    label: t('products_jfxProducts', 'Produk JFX'), 
                    href: "/produk/jfx" 
                },
                { 
                    label: t('products_spaProducts', 'Produk SPA'), 
                    href: "/produk/spa" 
                },
                { 
                    label: t('products_productAdvantages', 'Keunggulan Produk'), 
                    href: "/produk/keunggulan" 
                },
                { 
                    label: t('products_transactionIllustration', 'Ilustrasi Transaksi'), 
                    href: "/produk/ilustrasi" 
                },
            ],
        },
        {
            label: t('procedures', 'Prosedur'),
            key: 'procedures',
            submenu: [
                { 
                    label: t('procedures_onlineRegistration', 'Pendaftaran Online'), 
                    href: "/prosedur/pendaftaran" 
                },
                { 
                    label: t('procedures_withdrawal', 'Penarikan Dana'), 
                    href: "/prosedur/penarikan" 
                },
                { 
                    label: t('procedures_transactionGuide', 'Panduan Transaksi'), 
                    href: "/prosedur/panduan" 
                },
            ],
        },
        {
            label: t('analysis', 'Analisis'),
            key: 'analysis',
            submenu: [
                { 
                    label: t('analysis_news', 'Berita'), 
                    href: "/analisis/berita" 
                },
                { 
                    label: t('analysis_economicCalendar', 'Kalender Ekonomi'), 
                    href: "/analisis/kalender-ekonomi" 
                },
                { 
                    label: t('analysis_historicalData', 'Data Historis'), 
                    href: "/analisis/data-historis" 
                },
                { 
                    label: t('analysis_pivotFibonacci', 'Pivot & Fibonacci'), 
                    href: "/analisis/pivot-fibonacci" 
                },
            ],
        },
        {
            label: t('education', 'Edukasi'),
            key: 'education',
            submenu: [
                { 
                    label: t('education_tradingMechanism', 'Mekanisme Trading'), 
                    href: "/edukasi/mekanisme" 
                },
                { 
                    label: t('education_indexSymbols', 'Simbol Indeks'), 
                    href: "/edukasi/simbol-indeks" 
                },
                { 
                    label: t('education_locoLondonGold', 'Loco London Gold'), 
                    href: "/edukasi/loco-london-gold" 
                },
                { 
                    label: t('education_summerWinter', 'Summer & Winter'), 
                    href: "/edukasi/summer-winter" 
                },
                { 
                    label: t('education_articles', 'Artikel'), 
                    href: "/edukasi/artikel" 
                },
                { 
                    label: t('education_marketingTools', 'Alat Pemasaran'), 
                    href: "/edukasi/alat-pemasaran" 
                },
            ],
        },
    ];

    const toggleDropdown = (key: string) => {
        setOpenDropdown(openDropdown === key ? null : key);
        setOpenSubDropdown(null);
    };
    
    const toggleSubDropdown = (key: string) => {
        setOpenSubDropdown(openSubDropdown === key ? null : key);
    };
    
    const closeAllMenus = () => {
        setMenuOpen(false);
        setOpenDropdown(null);
        setOpenSubDropdown(null);
    };

    if (!isClient) {
        return null; // Tampilkan loading state atau null di server
    }

    return (
        <div className="sticky top-0 z-50 bg-white">
            <style jsx>{`
                .animate-slideDown {
                    animation: slideDown 0.3s ease-in-out;
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-1 group">
                            <img 
                                src="/assets/logo-kpf-full.png" 
                                alt="Logo KPF" 
                                width={120}
                                height={40}
                                className="h-8 w-auto md:h-10 transition-transform duration-300 group-hover:scale-105" 
                            />
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {menuItems.map((item, index) => (
                                <div key={item.key || index} className="relative">
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => toggleDropdown(item.key || '')}
                                            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors flex items-center"
                                        >
                                            {item.label}
                                            <i className={`ml-1 fas fa-chevron-down text-xs transition-transform ${openDropdown === item.key ? 'transform rotate-180' : ''}`} />
                                        </button>
                                    )}
                                    
                                    {item.submenu && openDropdown === item.key && (
                                        <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                                            {item.submenu.map((subItem, subIndex) => (
                                                <div key={subItem.key || subIndex} className="relative">
                                                    {subItem.href ? (
                                                        <a
                                                            href={subItem.href}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            {subItem.label}
                                                        </a>
                                                    ) : (
                                                        <button
                                                            onClick={() => toggleSubDropdown(subItem.key || '')}
                                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                                                        >
                                                            {subItem.label}
                                                            {subItem.submenu && (
                                                                <i className={`fas fa-chevron-right text-xs ${openSubDropdown === subItem.key ? 'transform rotate-90' : ''}`} />
                                                            )}
                                                        </button>
                                                    )}
                                                    
                                                    {subItem.submenu && openSubDropdown === subItem.key && (
                                                        <div className="absolute left-full top-0 w-56 bg-white rounded-md shadow-lg py-1 ml-1 z-50">
                                                            {subItem.submenu.map((child, childIndex) => (
                                                                <a
                                                                    key={childIndex}
                                                                    href={child.href}
                                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                >
                                                                    {child.label}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700 focus:outline-none"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'} text-xl`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden animate-slideDown">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
                            {menuItems.map((item, index) => (
                                <div key={item.key || index}>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50"
                                            onClick={closeAllMenus}
                                        >
                                            {item.label}
                                        </a>
                                    ) : (
                                        <div>
                                            <button
                                                onClick={() => toggleDropdown(item.key || '')}
                                                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 flex justify-between items-center"
                                            >
                                                {item.label}
                                                <i className={`fas fa-chevron-${openDropdown === item.key ? 'up' : 'down'} text-xs`} />
                                            </button>
                                            
                                            {item.submenu && openDropdown === item.key && (
                                                <div className="pl-4 mt-1 space-y-1">
                                                    {item.submenu.map((sub, subIndex) => (
                                                        <div key={sub.key || subIndex}>
                                                            {sub.href ? (
                                                                <a
                                                                    href={sub.href}
                                                                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-green-700 hover:bg-gray-50 rounded-md"
                                                                    onClick={closeAllMenus}
                                                                >
                                                                    {sub.label}
                                                                </a>
                                                            ) : (
                                                                <div>
                                                                    <button
                                                                        onClick={() => toggleSubDropdown(sub.key || '')}
                                                                        className="w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-green-700 hover:bg-gray-50 rounded-md flex justify-between items-center"
                                                                    >
                                                                        {sub.label}
                                                                        <i className={`fas fa-chevron-${openSubDropdown === sub.key ? 'up' : 'down'} text-xs`} />
                                                                    </button>
                                                                    
                                                                    {sub.submenu && openSubDropdown === sub.key && (
                                                                        <div className="pl-4 mt-1 space-y-1">
                                                                            {sub.submenu.map((child, childIndex) => (
                                                                                <a
                                                                                    key={childIndex}
                                                                                    href={child.href}
                                                                                    className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-green-700 hover:bg-gray-50 rounded-md"
                                                                                    onClick={closeAllMenus}
                                                                                >
                                                                                    {child.label}
                                                                                </a>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
            
            <MarketUpdate />
        </div>
    );
};

export default NavBar;
