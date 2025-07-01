import ProductCard from "@/components/moleculs/ProductCard";
import Header1 from "@/components/moleculs/Header1";

const products = [
    { title: "Kontrak Berjangka Olein (OLE)" },
    { title: "Kontrak Berjangka Emas (GOL)" },
    { title: "Kontrak Berjangka Emas 250 Gram (GOL250)" },
    { title: "UJ1010_BBJ & UJ10F_BBJ (USD/JPY)" },
    { title: "UC1010_BBJ & UC10F_BBJ (USD/CHF)" },
    { title: "XAG10_BBJ & XAGF_BBJ (SILVER)" },
    { title: "XUL10 & XULF (XUL)" },
    { title: "AU1010_BBJ & AU10F_BBJ (AUD/USD)" },
    { title: "EU1010_BBJ & EU10F_BBJ (EUR/USD)" },
    { title: "GU1010_BBJ & GU10F_BBJ (GBP/USD)" },
    { title: "HKK50_BBJ & HKK5U_BBJ (HKK50)" },
    { title: "JPK50_BBJ & JPK5U_BBJ (JPK50)" },
];

export default function ProdukContainer() {
    return (
        <div className="mx-auto px-4">
            <Header1 title="Produk Kami" center className="mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        title={product.title}
                        image={`https://placehold.co/400`}
                    />
                ))}
            </div>
        </div>
    );
}
