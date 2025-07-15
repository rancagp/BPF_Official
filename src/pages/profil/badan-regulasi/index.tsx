import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import Image from "next/image";

const legalitasData = [
    {
        id: 1,
        title: "BADAN PENGAWAS PERDAGANGAN BERJANGKA KOMODITI (BAPPEBTI)",
        image: "/assets/logo-kemendag.png", 
        description: "BAPPEBTI atau Badan Pengawas Perdagangan Berjangka Komoditi dibentuk berdasarkan Undang-Undang Nomor 32 Tahun 1997, BAPPEBTI merupakan salah satu unit eselon I berada di bawah Departemen Perdagangan. BAPPEBTI mempunyai tugas melaksanakan pembinaan, pengaturan, dan pengawasan kegiatan perdagangan berjangka berdasarkan kebijakan yang ditetapkan oleh Menteri dan peraturan perundang-undangan yang berlaku."
    },
    {
        id: 2,
        title: "BURSA BERJANGKA JAKARTA (BBJ)",
        image: "/assets/logo-jfx.png", 
        description: "PT. Bursa Berjangka Jakarta merupakan bursa pertama yang didirikan dengan Undang-Undang ini. Ia didirikan pada tanggal 19 Agustus 1999 oleh 4 perkebunan sawit, 7 penyulingan sawit, 8 eksportir kopi, 8 perusahaan pialang pasar modal dan 2 perusahaan dagang. Modal disetor hanya sebesar 11,4 milyar Rupiah dari 40 milyar modal yang disetujui. Bursa Berjangka Jakarta memenuhi semua persyaratan yang ditulis dalam UU 32/1997 tersebut dan mendapat lisensi Bappebti pada semester kedua tahun 2000. ",
    },
    {
        id: 3,
        title: "KLIRING BERJANGKA INDONESIA (KBI)",
        image: "/assets/logo-kbi.png", 
        description: "PT KLIRING BERJANGKA INDONESIA (Persero) merupakan suatu Badan Usaha Milik Negara yang bercita-cita untuk menjadi suatu perusahaan domestik yang efektif dan pada akhirnya menjadi suatu perusahaan global yang berstandar international. Didirikan untuk mengkliringkan dan menjamin penyelesaian transaksi kontrak Berjangka/Derivatif/Spot & Forward dan Resi Gudang secara teratur, wajar, dan efisien sehingga mampu memelihara Integritas Finansial Pasar.",
    },
];

export default function Legalitas() {
    return (
        <PageTemplate title="Badan Regulasi">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Badan Regulasi">
                    <div className="space-y-16">
                        {legalitasData.map((item, index) => (
                            <div key={item.id} className="flex flex-col md:flex-row items-center gap-8">
                                {/* Image Container */}
                                <div className="md:w-1/3 flex-shrink-0 w-full">
                                    <div className="relative aspect-video bg-white rounded-lg overflow-hidden shadow-md p-4">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                {/* Text Content */}
                                <div className="md:w-2/3">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 text-base leading-relaxed text-justify">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
