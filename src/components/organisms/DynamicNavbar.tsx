'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchJfxProducts } from '@/services/productService';

interface NavItem {
    label: string;
    href?: string; // Menjadikan href opsional
    submenu?: NavItem[];
}

export default function DynamicNavbar() {
    const [navItems, setNavItems] = useState<NavItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNavItems() {
            try {
                // Ambil data produk JFX dari API
                const jfxProducts = await fetchJfxProducts();
                
                // Format data produk untuk menu
                const jfxMenuItems = jfxProducts.map(product => ({
                    label: product.name,
                    href: `/produk/jfx/${product.slug}`
                }));

                // Definisikan struktur menu
                const menuItems: NavItem[] = [
                    // Menu Profil dan lainnya...
                    {
                        label: "Produk",
                        href: "#", // Menambahkan href default
                        submenu: [
                            {
                                label: "Multilateral (JFX)",
                                href: "#jfx", // Menambahkan href default
                                submenu: jfxMenuItems
                            },
                            {
                                label: "Bilateral (SPA)",
                                href: "#spa", // Menambahkan href default
                                submenu: [
                                    { label: "Contoh Produk SPA", href: "/produk/spa/contoh-produk" }
                                ]
                            },
                            { 
                                label: "Daftar Produk Lengkap", 
                                href: "/produk/jfx"
                            },
                            { 
                                label: "Keunggulan Produk", 
                                href: "/produk/keunggulan" 
                            },
                            { 
                                label: "Ilustrasi Transaksi", 
                                href: "/prosedur/ilustrasi-transaksi" 
                            },
                        ]
                    }
                ];

                setNavItems(menuItems);
            } catch (error) {
                console.error('Error loading navigation items:', error);
            } finally {
                setLoading(false);
            }
        }

        loadNavItems();
    }, []);

    // Fungsi rekursif untuk merender menu
    const renderMenu = (items: NavItem[]) => {
        return items.map((item, index) => (
            <li key={index} className="group relative">
                <Link 
                    href={item.href || '#'} 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                    {item.label}
                </Link>
                {item.submenu && (
                    <ul className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                        {renderMenu(item.submenu)}
                    </ul>
                )}
            </li>
        ));
    };

    if (loading) {
        return <div className="animate-pulse">Memuat menu...</div>;
    }

    return (
        <nav className="bg-white dark:bg-gray-900 shadow">
            <div className="container mx-auto px-4">
                <ul className="flex space-x-1">
                    {renderMenu(navItems)}
                </ul>
            </div>
        </nav>
    );
}
