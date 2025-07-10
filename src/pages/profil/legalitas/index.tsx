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
                    <div className="space-y-12">
                        {legalitasData.map((item) => (
                            <div key={item.id} className="mb-12">
                                <h3 className="text-xl font-semibold mb-4 text-center">{item.title}</h3>
                                <div className="flex flex-col items-center">
                                    <div className="max-w-2xl w-full mb-4">
                                        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-contain p-4"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-center max-w-3xl">
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
