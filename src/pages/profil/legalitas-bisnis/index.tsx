import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import Image from "next/image";

export default function LegalitasBisnis() {
    const legalitasItems = [
        {
            title: "Surat Persetujuan Anggota Bursa (SPAB)",
            description: "Surat Persetujuan Anggota Bursa (SPAB) di Bursa Berjangka Jakarta (Nomor: SPAB-002/BBJ/09/00).",
            icon: "📜"
        },
        {
            title: "Surat Persetujuan Pengalihan Keanggotaan Bursa (SPPKB)",
            description: "Surat Persetujuan Pengalihan Keanggotaan Bursa (SPPKB) di Bursa Berjangka Jakarta (Nomor: SPPKB-006/BBJ/12/00).",
            icon: "📋"
        },
        {
            title: "Izin Usaha Pialang Berjangka",
            description: "Keputusan Kepala Bappebti (Nomor: 41/BAPPEBTI/SI/XXI/2000).",
            icon: "🏛️"
        },
        {
            title: "Keanggotaan Kliring Berjangka Indonesia",
            description: "Keanggotaan Kliring Berjangka Indonesia (Nomor: 08/AK-KJBK/XII/2000).",
            icon: "🔗"
        },
        {
            title: "Pengesahan Departemen Kehakiman dan HAM",
            description: "Pengesahan Departemen Kehakiman dan HAM: C-16764 HT.01.04.TH.2002.",
            icon: "⚖️"
        },
        {
            title: "Akta Berita Acara Rapat",
            description: "Akta berita acara rapat: No. 161 Tanggal 19 Juli 2002 oleh Notaris Noor Irawati SH, PT Kontakperkasa Futures.",
            icon: "📄"
        },
        {
            title: "Peserta Sistem Perdagangan Alternatif (SPA)",
            description: "SK Bappebti (Nomor: 1145/BAPPEBTI/SP3/2007) tentang Pemberian Persetujuan sebagai peserta Sistem Perdagangan Alternatif (SPA) kepada PT Kontakperkasa Futures.",
            icon: "💼"
        },
        {
            title: "Keanggotaan ASPEBTINDO",
            description: "Keanggotaan ASPEBTINDO (Nomor: 0040/ASPEBTINDO/AANG-B/7/2015).",
            icon: "🏢"
        },
        {
            title: "Penerimaan Nasabah Elektronik On-Line",
            description: "Penetapan Sebagai Pialang Berjangka yang melakukan Kegiatan Penerimaan Nasabah secara Elektronik On-Line di Bidang Perdagangan Berjangka Komoditi kepada PT Kontakperkasa Futures (Nomor: 25/BAPPEBTI/KEP-PBK/08/2014).",
            icon: "💻"
        }
    ];

    return (
        <PageTemplate title="Legalitas Bisnis">
            

            <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-4xl mx-auto">
                <ProfilContainer title="Legalitas Bisnis">
                    {/* Introduction */}
                    <div className="bg-white rounded-xl shadow-md p-8 mb-12 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-100 rounded-full opacity-20"></div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tentang Legalitas Kami</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                PT Kontakperkasa Futures merupakan pialang berjangka yang telah mendapatkan izin usaha dari BAPPEBTI, sesuai dengan Undang-Undang RI No. 32 Tahun 1997 tentang Perdagangan Berjangka Komoditi yang telah diubah dengan Undang-Undang No. 10 Tahun 2011.
                            </p>
                            <div className="h-1 w-24 bg-green-500 my-6"></div>
                        </div>
                    </div>

                    {/* Legal Documents Grid */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-12 relative">
                            <span className="relative z-10 px-4 bg-white">Dokumen Legalitas</span>
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-0"></div>
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {legalitasItems.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                                >
                                    <div className="p-6">
                                        <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 text-2xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors duration-300">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Important Notice */}
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 mb-16">
                        <p className="font-bold">Informasi Penting:</p>
                        <p className="mt-1">
                            PT Kontakperkasa Futures berkomitmen untuk selalu beroperasi sesuai dengan peraturan perundang-undangan yang berlaku dan menjaga kepercayaan nasabah dengan menjunjung tinggi prinsip kehati-hatian dan profesionalisme.
                        </p>
                    </div>

                    {/* Supporting Documents */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-12 relative">
                            <span className="relative z-10 px-4 bg-white">Mitra & Lembaga Terkait</span>
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-0"></div>
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { name: "BAPPEBTI", logo: "/assets/logo-bappebti.png" },
                                { name: "Jakarta Futures Exchange", logo: "/assets/logo-jfx.png" },
                                { name: "Kliring Berjangka Indonesia", logo: "/assets/logo-kbi.png" },
                                { name: "ASPEBTINDO", logo: "/assets/logo-aspebtindo.png" }
                            ].map((org, index) => (
                                <div 
                                    key={index}
                                    className="group bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-green-100"
                                >
                                    <div className="h-20 flex items-center justify-center mb-4">
                                        <div className="relative w-full h-full">
                                            <Image 
                                                src={org.logo} 
                                                alt={org.name} 
                                                fill
                                                className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                                        {org.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}