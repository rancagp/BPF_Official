import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "@/components/moleculs/ProductCard";
import Header1 from "@/components/moleculs/Header1";

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
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Produk Kami</h2>
                <div className="w-20 h-1 bg-green-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Temukan beragam produk investasi terbaik yang kami tawarkan untuk membantu Anda mencapai tujuan keuangan Anda.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-100 rounded w-24"></div>
                    </div>
                </div>
            ) : productList.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {productList.map((product) => (
                        <div 
                            key={`${product.category}-${product.id}`}
                            className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                            onClick={() => handleProductClick(product.category, product.slug)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleProductClick(product.category, product.slug);
                                }
                            }}
                        >
                            <ProductCard
                                title={product.name}
                                image={`${process.env.NEXT_PUBLIC_API_BASE_URL}/img/produk/${product.image}`}
                                category={product.category}
                                slug={product.slug}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <span className="text-white text-sm font-medium">Lihat Detail</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <i className="fas fa-box-open text-4xl text-gray-300 mb-3"></i>
                    <p className="text-gray-600">Tidak ada produk tersedia saat ini.</p>
                    <p className="text-sm text-gray-500 mt-1">Silakan coba lagi nanti</p>
                </div>
            )}
        </div>
    );
}
