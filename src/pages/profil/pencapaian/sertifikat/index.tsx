import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import Image from "next/image";

export default function PenghargaanPage() {
    const penghargaanItems = [
        {
            image: "/assets/sertifikat-1.jpg",
            description: 'PT. KontakPerkasa Futures Mendapatkan Sertifikat "The Best Reliable Futures Company Of The Year" pada Tahun 2014',
        },
        {
            image: "/assets/sertifikat-kbi.jpg",
            description: "Sertifikat Keanggotaan Kliring Berjangka",
        },
        {
            image: "/assets/sertifikat-izin.png",
            description: "Sertifikat izin Usaha Pialang Berjangka",
        },
        {
            image: "/assets/sertifikat-apbi.png",
            description: "Sertifikat Keanggotaan Asosiasi Pialang Berjangka Indonesia",
        },
    ];

    return (
        <PageTemplate title="Sertifikat">
            <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-4xl mx-auto">
            <ProfilContainer title="Sertifikat Perusahaan">
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