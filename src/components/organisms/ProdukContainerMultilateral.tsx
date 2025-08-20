import ProductCard from "@/components/moleculs/ProductCard";

const products = [
    { title: "Kontrak Berjangka Olein (OLE)" },
    { title: "Kontrak Berjangka Emas (GOL)" },
    { title: "Kontrak Berjangka Emas 250 Gram (GOL250)" },
];

export default function ProdukContainerMultilateral() {
    return (
        <div className="">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        title={product.title}
                        image={`https://placehold.co/400`} category={""} slug={""}                    />
                ))}
            </div>
        </div>
    );
}
