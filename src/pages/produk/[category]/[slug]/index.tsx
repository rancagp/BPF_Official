import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
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
    const { t } = useTranslation('produk');
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
                                <div className="w-full flex justify-center px-4">
                                    <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-sm">
                                        <div className="animate-pulse bg-gray-200 rounded-2xl w-full h-96"></div>
                                    </div>
                                </div>

                                {/* Skeleton Deskripsi */}
                                <div className="w-full max-w-4xl mx-auto space-y-12">
                                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            </div>

                            <div className="w-full bg-white p-6 rounded-xl shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                                </h2>
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
                    <div className="flex flex-col gap-8">
                        {/* Gambar Produk */}
                        <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/img/produk/${product?.image}`}
                                    alt={product?.name}
                                    className="w-full h-full object-contain p-4"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Deskripsi */}
                        {product?.deskripsi && (
                            <div className="w-full py-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6">Deskripsi Produk</h2>
                                <div 
                                    className="prose max-w-none text-gray-700 leading-relaxed text-base sm:text-lg"
                                    style={{
                                        '--tw-prose-headings': 'text-gray-900',
                                        '--tw-prose-body': 'text-gray-700',
                                        '--tw-prose-links': 'text-blue-600 hover:text-blue-800',
                                        '--tw-prose-underline': 'text-blue-600',
                                        '--tw-prose-underline-shadow': 'shadow-[inset_0_-2px_0_0_rgba(37,99,235,0.3)]',
                                        '--tw-prose-underline-underline': 'text-blue-600',
                                        '--tw-prose-underline-underline-offset': '2px',
                                        '--tw-prose-underline-underline-thickness': '2px',
                                        '--tw-prose-underline-hover': 'text-blue-800',
                                        '--tw-prose-underline-hover-shadow': 'shadow-[inset_0_calc(-1*var(--tw-prose-underline-underline-thickness))_0_0_var(--tw-prose-underline-hover)]',
                                    } as React.CSSProperties}
                                    dangerouslySetInnerHTML={{ 
                                        __html: product.deskripsi 
                                            .replace(/<img/g, '<img class="w-full h-auto my-6 rounded-lg shadow-sm mx-auto max-w-full" loading="lazy"')
                                            .replace(/<table/g, '<div class="overflow-x-auto my-6"><table class="min-w-full divide-y divide-gray-200"')
                                            .replace(/<\/table>/g, '</table></div>')
                                            .replace(/<th/g, '<th class="px-4 py-3 bg-gray-50 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"')
                                            .replace(/<td/g, '<td class="px-4 py-3 whitespace-nowrap text-sm sm:text-base text-gray-900 border-b border-gray-200"')
                                    }} 
                                />
                            </div>
                        )}

                        {/* Spesifikasi */}
                        {product?.specs && (
                            <div className="w-full py-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6">Spesifikasi</h2>
                                <div 
                                    className="prose max-w-none text-gray-700 leading-relaxed text-base sm:text-lg"
                                    style={{
                                        '--tw-prose-headings': 'text-gray-900',
                                        '--tw-prose-body': 'text-gray-700',
                                        '--tw-prose-lists': 'list-disc pl-6 sm:pl-8',
                                        '--tw-prose-li': 'my-2',
                                    } as React.CSSProperties}
                                    dangerouslySetInnerHTML={{ 
                                        __html: product.specs
                                            .replace(/<img/g, '<img class="w-full h-auto my-6 rounded-lg shadow-sm mx-auto max-w-full" loading="lazy"')
                                            .replace(/<table/g, '<div class="w-full my-6 overflow-hidden"><table class="w-full max-w-full border-collapse"')
                                            .replace(/<\/table>/g, '</table></div>')
                                            .replace(/<th/g, '<th class="p-2 sm:p-3 bg-gray-50 text-left text-xs sm:text-sm font-medium text-gray-500 align-top break-words"')
                                            .replace(/<td/g, '<td class="p-2 sm:p-3 text-sm sm:text-base text-gray-900 border-b border-gray-200 align-top break-words"')
                                            .replace(/<tr/g, '<tr class="hover:bg-gray-50"')
                                    }} 
                                />
                            </div>
                        )}

                        {/* Tombol Lihat Semua Produk */}
                        <div className="mt-6 w-full text-center">
                            <button 
                                onClick={() => router.push('/produk')}
                                className="inline-flex items-center px-6 py-3 bg-[#FF0000] hover:bg-[#cc0000] text-white text-sm sm:text-base font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                                {t('viewAllProducts')}
                            </button>
                        </div>
                    </div>

                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
