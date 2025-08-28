import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

type Product = {
    id: number;
    image: string;
    name: string;
    slug: string;
    deskripsi?: string;
    specs?: string;
    created_at?: string;
    updated_at?: string;
};

export default function ProductDetail() {
    const router = useRouter();
    const { category, slug } = router.query;

    const [product, setProduct] = useState<Product | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!category || !slug) return;

        const categoryStr = String(category).toLowerCase();
        let apiUrl = "";

        if (categoryStr === "jfx") {
            apiUrl = "/api/jfx";
        } else if (categoryStr === "spa") {
            apiUrl = "/api/spa";
        } else {
            setProduct(null);
            setLoading(false);
            return;
        }

        async function fetchProduct() {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error("Gagal memuat data produk");

                const data: Product[] = await response.json();
                const found = data.find(item => item.slug === slug);

                setProduct(found || null);
            } catch (error) {
                console.error("Gagal fetch:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [category, slug]);

    if (loading) {
        return (
            <PageTemplate title="Memuat...">
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title="Memuat...">
                        <div className="flex flex-col gap-5 items-start">
                            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10 w-full">
                                {/* Skeleton Gambar */}
                                <div className="w-full md:w-1/2">
                                    <div className="animate-pulse bg-gray-200 rounded-2xl w-full h-96"></div>
                                </div>

                                {/* Skeleton Deskripsi */}
                                <div className="w-full md:w-1/2 space-y-4">
                                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            </div>

                            {/* Skeleton Spesifikasi */}
                            <div className="w-full pt-8 mt-8 border-t border-gray-200">
                                <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                                <div className="space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            </div>
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    if (notFound) {
        return (
            <PageTemplate title="Produk Tidak Ditemukan">
                <div className="text-center py-20">Produk tidak ditemukan.</div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title={product?.name || 'Detail Produk'}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={product?.name || 'Detail Produk'}>
                    <div className="flex flex-col gap-5 items-start">
                        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
                            {/* Gambar Produk */}
                            <div className="w-full md:w-1/2 flex justify-center">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/img/produk/${product?.image}`}
                                    alt={product?.name}
                                    className="w-full max-w-md h-auto object-cover rounded-2xl shadow-lg"
                                />
                            </div>

                            {/* Deskripsi */}
                            <div className="w-full md:w-1/2 text-gray-800 leading-relaxed text-base text-justify">
                                <div dangerouslySetInnerHTML={{ __html: product?.deskripsi || "" }} />
                            </div>
                        </div>

                        {/* Deskripsi & Spesifikasi */}
                        <div className="w-full">
                            {product?.specs && (
                                <div className="border-t pt-4 text-sm prose max-w-none prose-p:my-2 prose-table:border prose-th:border prose-td:border prose-th:bg-gray-100">
                                    <div dangerouslySetInnerHTML={{ __html: product.specs }} />
                                </div>
                            )}
                        </div>

                        {/* Tombol Lihat Semua Produk */}
                        <div className="mt-10 pt-6 border-t border-gray-200 w-full">
                            <button 
                                onClick={() => router.push('/produk')}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                                Lihat Semua Produk
                            </button>
                        </div>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
