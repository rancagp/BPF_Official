import ProductCard from "@/components/moleculs/ProductCard";

const products = [
    { 
      title: "Kontrak Berjangka Olein (OLE)",
      slug: "kontrak-berjangka-olein",
      image: "https://placehold.co/400"
    },
    { 
      title: "Kontrak Berjangka Emas (GOL)",
      slug: "kontrak-berjangka-emas",
      image: "https://placehold.co/400"
    },
    { 
      title: "Kontrak Berjangka Emas 250 Gram (GOL250)",
      slug: "kontrak-berjangka-emas-250",
      image: "https://placehold.co/400"
    },
];

export default function ProdukContainerMultilateral() {
    return (
        <div className="">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        product={{
                            id: index,
                            name: product.title,
                            image: product.image,
                            slug: product.slug,
                            category: 'multilateral' // atau kategori yang sesuai
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
