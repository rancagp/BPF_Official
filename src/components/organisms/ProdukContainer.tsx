import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { ArrowRight, Package } from 'lucide-react';
import ProductCard from '../moleculs/ProductCard';

type Product = {
    id: number;
    image: string;
    name: string;
    slug: string;
    deskripsi?: string;
    specs?: string;
    category: string;  // Tambahan untuk membedakan jenis produk
};

export default function ProdukContainer() {
    const { t } = useTranslation('produk', { useSuspense: false });
    const router = useRouter();
    const [productList, setProductList] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleProductClick = (category: string, slug: string) => {
        router.push(`/produk/${category.toLowerCase()}/${slug}`);
    };

    useEffect(() => {
        async function fetchProducts() {
            try {
                const [jfxRes, spaRes] = await Promise.all([
                    fetch("/api/jfx"),
                    fetch("/api/spa"),
                ]);

                if (!jfxRes.ok || !spaRes.ok) throw new Error("Gagal memuat data produk");

                const jfxData = await jfxRes.json();
                const spaData = await spaRes.json();

                const jfxProducts: Product[] = jfxData.map((item: any) => ({
                    ...item,
                    category: "JFX",
                }));

                const spaProducts: Product[] = spaData.map((item: any) => ({
                    ...item,
                    category: "SPA",
                }));

                setProductList([...jfxProducts, ...spaProducts]);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className="relative py-16 sm:py-20">
            {/* Background elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-gradient-to-r from-[#080031]/5 to-[#FF0000]/5 rounded-full blur-3xl"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                    <div className="flex-1 max-w-3xl">
                        <div className="flex flex-col space-y-4">
                            <span className="inline-flex items-center w-fit px-4 py-2 text-xs font-bold tracking-wide uppercase text-[#FF0000] bg-[#FF0000]/10 rounded-full">
                                <span className="w-2 h-2 bg-[#FF0000] rounded-full mr-2"></span>
                                {t('featuredBadge')}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#080031] leading-tight">
                                {t('title')}
                            </h2>
                            <div className="w-32 h-1.5 bg-gradient-to-r from-[#FF0000] to-[#080031] rounded-full"></div>
                            {/* Mobile-only View All button */}
                            <div className="md:hidden pt-2">
                                <Link
                                    href="/produk"
                                    className="inline-flex items-center px-5 py-2.5 bg-[#FF0000] hover:bg-[#E60000] text-white font-medium rounded-lg transition-all duration-300 shadow-md"
                                >
                                    {t('viewAllProducts')}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center h-full">
                        <Link 
                            href="/produk" 
                            className="group flex items-center px-6 py-3 bg-[#FF0000] hover:bg-[#E60000] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg whitespace-nowrap"
                        >
                            {t('viewAllProducts')}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                                <div className="h-48 bg-gradient-to-br from-[#080031]/5 to-[#FF0000]/5 animate-pulse"></div>
                                <div className="p-5">
                                    <div className="h-6 bg-[#080031]/10 rounded-full w-3/4 mb-4"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-[#080031]/5 rounded-full w-full"></div>
                                        <div className="h-4 bg-[#080031]/5 rounded-full w-5/6"></div>
                                    </div>
                                    <div className="mt-6 pt-5 border-t border-gray-100">
                                        <div className="h-10 bg-[#080031]/5 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : productList.length > 0 ? (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {productList.filter(Boolean).slice(0, 6).map((product) => {
                                if (!product || !product.category || !product.slug) {
                                    console.warn('Invalid product data:', product);
                                    return null;
                                }
                                return (
                                    <ProductCard 
                                        key={`${product.category}-${product.id}`}
                                        product={product}
                                        onClick={handleProductClick}
                                        className="group hover:-translate-y-1 transition-transform duration-300"
                                    />
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gradient-to-br from-white to-[#080031]/5 rounded-2xl border-2 border-dashed border-[#080031]/20">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#FF0000]/10 to-[#080031]/10 text-[#FF0000] mb-6">
                            <Package className="h-12 w-12" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#080031] mb-3">Produk Belum Tersedia</h3>
                        <p className="text-[#080031]/80 max-w-md mx-auto text-lg">Maaf, saat ini belum ada produk yang tersedia. Silakan cek kembali nanti untuk update terbaru.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
