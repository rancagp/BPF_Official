import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import productList from "@/data/ProductList";
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

export default function ProductDetail() {
    const router = useRouter();
    const { category, slug } = router.query;

    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        if (category && slug) {
            const foundProduct = productList.find(
                (item) =>
                    item.slug === slug &&
                    item.category.toLowerCase() === String(category).toLowerCase()
            );
            setProduct(foundProduct);
        }
    }, [category, slug]);

    if (!category || !slug) {
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
        <PageTemplate title={product.title}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={product.title}>
                    <div>
                        <div className="flex justify-center mb-6">
                            <img
                                src="https://placehold.co/600x300"
                                alt={product.title}
                                className="rounded-lg"
                            />
                        </div>
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
