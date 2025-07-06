import ProductCard from "@/components/moleculs/ProductCard";
import Header1 from "@/components/moleculs/Header1";
import productList from "@/data/ProductList";

export default function ProdukContainer() {
    return (
        <div className="mx-auto px-4">
            <Header1 title="Produk Kami" center className="mb-6" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {productList.map((product, index) => (
                    <ProductCard
                        key={index}
                        title={product.title}
                        image="https://placehold.co/400"
                        category={product.category}   // ✅ Tambahkan ini
                        slug={product.slug}           // ✅ Tambahkan ini
                    />
                ))}
            </div>
        </div>
    );
}
