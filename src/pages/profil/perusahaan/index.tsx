import { FaBullseye, FaChartLine, FaHandshake, FaUsers, FaShieldAlt, FaGraduationCap } from 'react-icons/fa';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import Image from "next/image";

const visiMisiItems = [
    {
        icon: <FaBullseye className="text-3xl text-blue-600" />,
        title: "Visi",
        description: "Mengembangkan dan memajukan Perdagangan Berjangka Komoditi serta memberikan dampak positif untuk perekonomian di Indonesia.",
        bgColor: "bg-gray-50"
    },
    {
        icon: <FaChartLine className="text-3xl text-green-600" />,
        title: "Misi",
        items: [
            "Menggiatkan program promosi dan edukasi tentang industri PBK",
            "Menyediakan sarana lindung nilai (hedging) dengan prinsip KYC",
            "Memperkenalkan industri PBK melalui pendidikan tinggi dan seminar",
            "Meningkatkan aspek kepatuhan peraturan yang berlaku",
            "Menyiapkan SDM berkualitas melalui program pelatihan"
        ],
        bgColor: "bg-gray-50"
    }
];

const nilaiPerusahaan = [
    {
        icon: <FaHandshake className="text-2xl text-yellow-600" />,
        title: "Integritas",
        description: "Menjunjung tinggi kejujuran dan profesionalisme dalam setiap layanan"
    },
    {
        icon: <FaUsers className="text-2xl text-purple-600" />,
        title: "Kepuasan Nasabah",
        description: "Memberikan pelayanan terbaik untuk kepuasan nasabah"
    },
    {
        icon: <FaShieldAlt className="text-2xl text-red-600" />,
        title: "Kepatuhan",
        description: "Selalu patuh terhadap peraturan dan perundang-undangan yang berlaku"
    },
    {
        icon: <FaGraduationCap className="text-2xl text-indigo-600" />,
        title: "Inovasi",
        description: "Terus berinovasi dalam pengembangan produk dan layanan"
    }
];

export default function ProfilPerusahaan() {
    const anggotaLogos = [
        { src: "/assets/logo-jfx.png", alt: "JFX" },
        { src: "/assets/logo-kbi.png", alt: "KBI" },
        { src: "/assets/logo-aspebtindo.png", alt: "ASPEBTINDO" },
        { src: "/assets/logo-bappebti.png", alt: "BAPPEBTI" },
    ];

    return (
        <PageTemplate title="Profil Perusahaan">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="PT. KONTAKPERKASA FUTURES">
                    {/* Tentang Kami */}
                    <section className="mb-16">
                        <div className="">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tentang Kami</h2>
                            <div className="prose max-w-none text-gray-700">
                                <p className="text-lg leading-relaxed">
                                    PT Kontak Perkasa Futures adalah perusahaan pialang berjangka yang telah berdiri sejak tahun 2000. Sebagai salah satu pelaku utama di industri perdagangan berjangka di Indonesia, kami berkomitmen untuk memberikan layanan terbaik di bidang transaksi derivatif, komoditi, dan indeks saham.
                                </p>
                                <p className="mt-4 text-lg leading-relaxed">
                                    Sebagai anggota PT Bursa Berjangka Jakarta (JFX) dan PT Kliring Berjangka Indonesia (KBI), serta diawasi langsung oleh BAPPEBTI, kami menjunjung tinggi profesionalisme dan kepatuhan terhadap regulasi yang berlaku dalam setiap aktivitas operasional perusahaan.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Visi & Misi */}
                    <section className="grid md:grid-cols-2 gap-8 mb-16">
                        {visiMisiItems.map((item, index) => (
                            <div key={index} className={`${item.bgColor} rounded-xl p-6 shadow-md`}>
                                <div className="flex items-center mb-4">
                                    <div className="mr-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                                </div>
                                {item.description && (
                                    <p className="text-gray-700 mt-2">{item.description}</p>
                                )}
                                {item.items && (
                                    <ul className="mt-4 space-y-2">
                                        {item.items.map((misi, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="text-green-500 mr-2">•</span>
                                                <span className="text-gray-700">{misi}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>

                    {/* Nilai-Nilai Perusahaan */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Nilai-Nilai Perusahaan</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {nilaiPerusahaan.map((nilai, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        {nilai.icon}
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{nilai.title}</h4>
                                    <p className="text-gray-600">{nilai.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Anggota & Afiliasi */}
                    <section className="bg-gray-50 rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Anggota & Afiliasi</h2>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                            {anggotaLogos.map((logo, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <div className="h-16 w-32 relative">
                                        <Image
                                            src={logo.src}
                                            alt={logo.alt}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
