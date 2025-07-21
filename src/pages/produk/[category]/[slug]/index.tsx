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
    const [loading, setLoading] = useState<boolean>(true);

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

    if (!category || !slug || loading) {
        return (
            <PageTemplate title="Memuat...">
                <div className="text-center py-20">Memuat produk...</div>
            </PageTemplate>
        );
    }

    if (!product) {
        return (
            <PageTemplate title="Produk Tidak Ditemukan">
                <div className="text-center py-20">Produk tidak ditemukan.</div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title={product.name}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={product.name}>
                    <div className="flex flex-col gap-5 items-start">
                        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
                            {/* Gambar Produk */}
                            <div className="w-full md:w-1/2 flex justify-center">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/img/produk/${product.image}`}
                                    alt={product.name}
                                    className="w-full max-w-md h-auto object-cover rounded-2xl shadow-lg"
                                />
                            </div>

                            {/* Deskripsi */}
                            <div className="w-full md:w-1/2 text-gray-800 leading-relaxed text-base text-justify">
                                <div dangerouslySetInnerHTML={{ __html: product.deskripsi || "" }} />
                            </div>
                        </div>

                        {/* Deskripsi & Spesifikasi */}
                        <div className="w-full">
                            {product.specs && (
                                <div className="border-t pt-4 text-sm prose max-w-none prose-p:my-2 prose-table:border prose-th:border prose-td:border prose-th:bg-gray-100">
                                    <div dangerouslySetInnerHTML={{ __html: product.specs }} />
                                </div>
                            )}
                        </div>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
