"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import MarketUpdate from "./MarketUpdate";

interface MenuItem {
    key: string;
    label: string;
    href: string;
    submenu?: MenuItem[];
    icon?: string;
    disabled?: boolean;
}

// Type for menu items with submenus
interface NavItem extends Omit<MenuItem, 'submenu'> {
    submenu?: NavItem[];
}

// Base menu items with required properties
const baseMenuItems: NavItem[] = [
    { 
        key: 'home',
        label: 'Beranda',
        href: "/"
    },
    {
        key: 'about',
        label: 'Tentang Kami',
        href: "#",
        submenu: [
            { 
                key: 'about_companyProfile',
                label: 'Profil Perusahaan',
                href: "/profil/perusahaan" 
            },
            { 
                key: 'about_businessLicense',
                label: 'Legalitas Bisnis',
                href: "/profil/legalitas-bisnis" 
            },
            { 
                key: 'about_brokerRepresentative',
                label: 'Wakil Pialang',
                href: "/profil/wakil-pialang" 
            },
            { 
                key: 'about_regulatoryBody',
                label: 'Badan Regulasi',
                href: "/profil/badan-regulasi" 
            },
            { 
                key: 'about_facilitiesServices',
                label: 'Fasilitas & Layanan', 
                href: "/umum/fasilitas-layanan" 
            },
            {
                key: 'about_achievements',
                label: 'Pencapaian',
                href: '#',
                submenu: [
                    { 
                        key: 'about_achievements_awards',
                        label: 'Penghargaan', 
                        href: "/profil/pencapaian/penghargaan" 
                    },
                    { 
                        key: 'about_achievements_certificates',
                        label: 'Sertifikat', 
                        href: "/profil/pencapaian/sertifikat" 
                    },
                ],
            },
            {
                key: 'about_general',
                label: 'Umum',
                href: '#',
                submenu: [
                    { 
                        key: 'about_general_information',
                        label: 'Informasi', 
                        href: "/umum/informasi" 
                    },
                    { 
                        key: 'about_general_videos',
                        label: 'Video', 
                        href: "/umum/video" 
                    },
                ],
            },
        ],
    },
    {
        key: 'products',
        label: 'Produk',
        href: '#',
        submenu: [
            { 
                key: 'products_allProducts',
                label: 'Semua Produk', 
                href: "/produk" 
            },
            { 
                key: 'products_jfxProducts',
                label: 'Produk JFX', 
                href: "/produk/jfx" 
            },
            { 
                key: 'products_spaProducts',
                label: 'Produk SPA', 
                href: "/produk/spa" 
            },
            { 
                key: 'products_productAdvantages',
                label: 'Keunggulan Produk', 
                href: "/produk/keunggulan-produk" 
            },
            { 
                key: 'products_transactionIllustration',
                label: 'Ilustrasi Transaksi', 
                href: "/prosedur/ilustrasi-transaksi" 
            },
        ],
    },
    {
        key: 'procedures',
        label: 'Prosedur',
        href: '#',
        submenu: [
            { 
                key: 'procedures_onlineRegistration',
                label: 'Pendaftaran Online', 
                href: "/prosedur/registrasi-online" 
            },
            { 
                key: 'procedures_withdrawal',
                label: 'Penarikan Dana', 
                href: "/prosedur/penarikan" 
            },
            { 
                key: 'procedures_transactionGuide',
                label: 'Panduan Transaksi', 
                href: "/prosedur/petunjuk-transaksi" 
            },
        ],
    },
    {
        key: 'analysis',
        label: 'Analisis',
        href: '#',
        submenu: [
            { 
                key: 'analysis_news',
                label: 'Berita', 
                href: "/analisis/berita" 
            },
            { 
                key: 'analysis_economicCalendar',
                label: 'Kalender Ekonomi', 
                href: "/analisis/economic-calendar" 
            },
            { 
                key: 'analysis_historicalData',
                label: 'Data Historis', 
                href: "/analisis/historical-data" 
            },
            { 
                key: 'analysis_pivotFibonacci',
                label: 'Pivot & Fibonacci', 
                href: "/analisis/pivot-fibonacci" 
            },
        ],
    },
    {
        key: 'education',
        label: 'Edukasi',
        href: '#',
        submenu: [
            { 
                key: 'education_tradingMechanism',
                label: 'Mekanisme Trading', 
                href: "/edukasi/mekanisme" 
            },
            { 
                key: 'education_indexSymbols',
                label: 'Simbol Indeks', 
                href: "/edukasi/simbol-indeks" 
            },
            { 
                key: 'education_locoLondonGold',
                label: 'Loco London Gold', 
                href: "/edukasi/loco-london-gold" 
            },
            { 
                key: 'education_summerWinter',
                label: 'Summer & Winter', 
                href: "/edukasi/summer-winter" 
            },
            { 
                key: 'education_articles',
                label: 'Artikel', 
                href: "/edukasi/artikel" 
            },
            { 
                key: 'education_marketingTools',
                label: 'Alat Pemasaran', 
                href: "/edukasi/alat-pemasaran" 
            },
        ],
    },
];

const NavBar: React.FC = () => {
    const { t, i18n } = useTranslation('common');
    const router = useRouter();
    const [menuItems, setMenuItems] = useState<NavItem[]>(baseMenuItems);
    const [mobileMenuItems, setMobileMenuItems] = useState<NavItem[]>(baseMenuItems);
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

    // Apply translations to menu items
    useEffect(() => {
        const translatedMenuItems = baseMenuItems.map(item => ({
            ...item,
            label: t(item.key, item.label),
            submenu: item.submenu?.map(subItem => ({
                ...subItem,
                label: t(subItem.key, subItem.label),
                submenu: subItem.submenu?.map(childItem => ({
                    ...childItem,
                    label: t(childItem.key, childItem.label)
                }))
            }))
        }));
        
        setMenuItems(translatedMenuItems);
        setMobileMenuItems(translatedMenuItems);
    }, [i18n.language, t]);

    const toggleDropdown = (e: React.MouseEvent, key: string) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenDropdown(openDropdown === key ? null : key);
        setOpenSubDropdown(null); // Close any open sub-dropdowns
    };
    
    const toggleSubDropdown = (e: React.MouseEvent, key: string) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenSubDropdown(openSubDropdown === key ? null : key);
    };
    
    const closeAllMenus = () => {
        setMenuOpen(false);
        setOpenDropdown(null);
        setOpenSubDropdown(null);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            if (openDropdown || openSubDropdown) {
                closeAllMenus();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [openDropdown, openSubDropdown]);

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
                        <Link href="/" locale={i18n.language} className="flex items-center gap-1 group">
                            <img 
                                src="/assets/logo-kpf-full.png" 
                                alt="Logo KPF" 
                                width={120}
                                height={40}
                                className="h-8 w-auto md:h-10 transition-transform duration-300 group-hover:scale-105" 
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {menuItems.map((item, index) => (
                                <div key={item.key} className="relative">
                                    <div 
                                        className="relative group"
                                        onMouseEnter={() => item.submenu && setOpenDropdown(item.key)}
                                        onMouseLeave={() => item.submenu && setOpenDropdown(null)}
                                    >
                                        <Link 
                                            href={item.href || '#'} 
                                            locale={i18n.language}
                                            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors flex items-center"
                                        >
                                            {item.label}
                                            {item.submenu && (
                                                <i className="fas fa-chevron-down text-xs ml-1 transition-transform duration-200 group-hover:rotate-180" />
                                            )}
                                        </Link>
                                        {item.submenu && (
                                            <div 
                                                className={`absolute mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 ${
                                                    // Jika item menu berada di 2 terakhir (Edukasi atau kontak), tampilkan submenu ke kiri
                                                    index >= menuItems.length - 2 ? 'right-0' : 'left-0'
                                                }`}
                                            >
                                                {item.submenu.map((subItem) => (
                                                    <div key={subItem.key} className="relative group">
                                                        {!subItem.submenu ? (
                                                            <Link 
                                                                href={subItem.href} 
                                                                locale={i18n.language}
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                onClick={closeAllMenus}
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        ) : (
                                                            <div 
                                                                className="relative group/sub"
                                                                onMouseEnter={() => setOpenSubDropdown(subItem.key)}
                                                                onMouseLeave={() => setOpenSubDropdown(null)}
                                                            >
                                                                <Link
                                                                    href="#"
                                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                                                                >
                                                                    {subItem.label}
                                                                    <i className="fas fa-chevron-right text-xs group-hover/sub:rotate-90 transition-transform duration-200" />
                                                                </Link>
                                                                {subItem.submenu && (
                                                                    <div 
                                                                        className={`absolute top-0 w-56 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 transform ${
                                                                            // Jika item menu berada di 2 terakhir, tampilkan submenu ke kiri
                                                                            index >= menuItems.length - 2 
                                                                                ? 'right-full mr-1 translate-x-1 group-hover/sub:translate-x-0' 
                                                                                : 'left-full ml-1 -translate-x-1 group-hover/sub:translate-x-0'
                                                                        }`}
                                                                    >
                                                                        {subItem.submenu.map((child) => (
                                                                            <Link 
                                                                                key={child.key}
                                                                                href={child.href} 
                                                                                locale={i18n.language}
                                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                                onClick={closeAllMenus}
                                                                            >
                                                                                {child.label}
                                                                            </Link>
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
                                                onClick={(e) => toggleDropdown(e, item.key || '')}
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
                                                                        onClick={(e) => toggleSubDropdown(e, sub.key || '')}
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
