import { useRouter } from "next/router";
import ProductCard from "@/components/moleculs/ProductCard";
import productList from "@/data/ProductList";
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

export default function ProdukByCategory() {
    const router = useRouter();
    const { category } = router.query;

    if (!category) return null;  // Pastikan router siap

    const categoryStr = String(category).toLowerCase();

    const filteredProducts = productList.filter(
        (product) => product.category.toLowerCase() === categoryStr
    );

    const categoryTitle = categoryStr.charAt(0).toUpperCase() + categoryStr.slice(1);

    return (
        <PageTemplate title={`Produk ${categoryTitle}`}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={`Produk ${categoryTitle}`}>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredProducts.map((product, index) => (
                                <ProductCard
                                    key={index}
                                    title={product.title}
                                    image="https://placehold.co/400"
                                    category={product.category}
                                    slug={product.slug}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-10">
                            Tidak ada produk ditemukan.
                        </p>
                    )}
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
