import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import Image from "next/image";

export default function PenghargaanPage() {
    const penghargaanItems = [
        {
            image: "/assets/penghargaan-majalahinvestor.jpg",
            description: "PT. KontakPerkasa Futures Mendapatkan Penghargaan dari Majalah Investor untuk Kategori Pialang Berjangka Terbaik 2013 - Teraktif untuk Kontrak Emas",
        },
        {
            image: "/assets/penghargaan-kompetisi-tbbj.jpg",
            description: "Partisipasi dalam Kompetisi Trading BBJ produk OLE01 & GOL10 - 2022",
        },
        {
            image: "/assets/penghargaan-bumn.jpg",
            description: "Ketaatan Penempatan Margin 2024 - Terbaik ke 4",
        },
    ];

    return (
        <PageTemplate title="Penghargaan">
            <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-4xl mx-auto">
            <ProfilContainer title="Penghargaan Perusahaan">
                <div className="mb-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {penghargaanItems.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                                <div className="relative aspect-video w-full h-48 bg-gray-100 flex items-center justify-center">
                                    <Image src={item.image} alt={item.description.slice(0,40)} fill className="object-contain" />
                                </div>
                                <div className="p-6 flex-1">
    <p className="text-gray-700 text-base leading-relaxed">{item.description}</p>
</div>
                            </div>
                        ))}
                    </div>
                </div>
            </ProfilContainer>
            </div>
        </PageTemplate>
    );
}