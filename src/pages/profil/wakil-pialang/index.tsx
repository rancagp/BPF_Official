import { useEffect, useState } from "react";
import CardCategoryPialang from "@/components/atoms/CardCategoryPialang";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

interface Category {
    id: number;
    nama_kategori: string;
    slug: string;
}

export default function WakilPialang() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/kategori-pialang"); // panggil API Next.js
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Gagal memuat kategori:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <PageTemplate title="Wakil Pialang">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Wakil Pialang">
                    {loading ? (
                        <p>Memuat data kategori...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {categories.map((item) => (
                                <CardCategoryPialang
                                    key={item.id}
                                    title={item.nama_kategori}
                                    slug={item.slug}
                                />
                            ))}
                        </div>
                    )}
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
