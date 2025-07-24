import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import ProductCard from "@/components/moleculs/ProductCard";

type Product = {
    id: number;
    image: string;
    name: string;
    slug: string;
    deskripsi?: string;
    specs?: string;
    category: string;
};

export default function ProdukPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

                setProducts([...jfxProducts, ...spaProducts]);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const handleProductClick = (category: string, slug: string) => {
        router.push(`/produk/${category.toLowerCase()}/${slug}`);
    };

    return (
        <PageTemplate title="Produk Kami">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Produk Kami">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Daftar Produk</h2>
                        <p className="text-gray-600">
                            Temukan berbagai produk investasi terbaik dari kami.
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
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
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
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
