import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import Header1 from "@/components/moleculs/Header1";
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 text-xs font-semibold text-green-700 bg-green-100 rounded-full mb-3">
                    {t('featuredBadge')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-black bg-clip-text text-transparent">
                    {t('title')}
                </h2>
                <div className="w-24 h-1 bg-green-600 rounded-full mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    {t('description')}
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="h-48 bg-gray-100 animate-pulse"></div>
                            <div className="p-6">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : productList.length > 0 ? (
                <div className="space-y-10">
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
                            />
                        );
                    })}
                </div>
                    
                    <div className="text-center pt-6">
                        <Link 
                            href="/produk"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-800 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            {t('viewAllProducts')}
                            <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-green-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Produk Belum Tersedia</h3>
                    <p className="text-gray-600 max-w-md mx-auto">Maaf, saat ini belum ada produk yang tersedia. Silakan cek kembali nanti untuk update terbaru.</p>
                </div>
            )}
        </div>
    );
}
