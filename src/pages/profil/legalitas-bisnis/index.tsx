import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import Image from "next/image";

export default function LegalitasBisnis() {
    const legalitasItems = [
        {
            title: "Dasar Hukum",
            description: "Berdasarkan Undang-Undang RI No. 32 Tahun 1997 tentang Perdagangan Berjangka Komoditi yang telah diubah dengan Undang-Undang No. 10 Tahun 2011.",
            icon: "📜"
        },
        {
            title: "Izin Usaha",
            description: "Keputusan Kepala Bappebti No. 41/BAPPEBTI/SI/XXI/2000 tentang Izin Usaha Pialang Berjangka.",
            icon: "🏛️"
        },
        {
            title: "Keanggotaan Bursa",
            description: "Surat Persetujuan Anggota Bursa (SPAB) di Bursa Berjangka Jakarta No. SPAB-002/BBJ/09/00.",
            icon: "📋"
        },
        {
            title: "Pengakuan Hukum",
            description: "Pengesahan Departemen Kehakiman dan HAM No. C-16764 HT.01.04.TH.2002.",
            icon: "⚖️"
        },
        {
            title: "Perdagangan Elektronik",
            description: "Penetapan sebagai Pialang Berjangka yang melakukan Penerimaan Nasabah secara Elektronik On-Line No. 25/BAPPEBTI/KEP-PBK/08/2014.",
            icon: "💻"
        },
        {
            title: "Keanggotaan Asosiasi",
            description: "Anggota ASPEBTINDO No. 0040/ASPEBTINDO/AANG-B/7/2015.",
            icon: "🤝"
        }
    ];

    const dokumenPendukung = [
        {
            nomor: "SPPKB-006/BBJ/12/00",
            judul: "Surat Persetujuan Pengalihan Keanggotaan Bursa"
        },
        {
            nomor: "1145/BAPPEBTI/SP3/2007",
            judul: "Persetujuan sebagai Peserta Sistem Perdagangan Alternatif (SPA)"
        },
        {
            nomor: "No. 161",
            tanggal: "19 Juli 2002",
            judul: "Akta Berita Acara Rapat oleh Notaris Noor Irawati SH"
        },
        {
            nomor: "08/AK-KJBK/XII/2000",
            judul: "Keanggotaan Kliring Berjangka Indonesia"
        }
    ];

    return (
        <PageTemplate title="Legalitas Bisnis">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Legalitas Bisnis">
                    <div className="space-y-8 text-justify">
                        <div className="space-y-5">
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    PT Kontakperkasa Futures merupakan pialang berjangka yang telah mendapatkan izin usaha sebagai pialang berjangka dari BAPPEBTI, sesuai dengan Undang-Undang RI No. 32 Tahun 1997 tentang Perdagangan Berjangka Komoditi yang telah diubah dengan Undang-Undang No. 10 Tahun 2011.
                                </p>
                            </div>
                        </div>

                        {/* Daftar Legalitas */}
                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            {legalitasItems.map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <span className="text-3xl">{item.icon}</span>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                                            <p className="text-gray-700">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Daftar Dokumen */}
                        <div className="mt-12">
                            <h3 className="text-xl font-semibold mb-6 text-center">Daftar Dokumen Pendukung</h3>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Dokumen</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {dokumenPendukung.map((doc, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{idx + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {doc.nomor}
                                                    {doc.tanggal && (
                                                        <span className="block text-xs text-gray-500">{doc.tanggal}</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{doc.judul}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Dokumen Pendukung */}
                        <div className="mt-12">
                            <h3 className="text-xl font-semibold mb-6 text-center">Dokumen Pendukung</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
                                <div className="text-center">
                                    <div className="bg-gray-100 p-4 rounded-lg h-32 flex items-center justify-center">
                                        <Image 
                                            src="/assets/logo-bappebti.png" 
                                            alt="BAPPEBTI" 
                                            width={120} 
                                            height={80}
                                            className="object-contain h-full"
                                        />
                                    </div>
                                    <p className="mt-2 text-sm">BAPPEBTI</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-gray-100 p-4 rounded-lg h-32 flex items-center justify-center">
                                        <Image 
                                            src="/assets/logo-jfx.png" 
                                            alt="JFX" 
                                            width={120} 
                                            height={80}
                                            className="object-contain h-full"
                                        />
                                    </div>
                                    <p className="mt-2 text-sm">Jakarta Futures Exchange</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-gray-100 p-4 rounded-lg h-32 flex items-center justify-center">
                                        <Image 
                                            src="/assets/logo-kbi.png" 
                                            alt="KBI" 
                                            width={120} 
                                            height={80}
                                            className="object-contain h-full"
                                        />
                                    </div>
                                    <p className="mt-2 text-sm">Kliring Berjangka Indonesia</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-gray-100 p-4 rounded-lg h-32 flex items-center justify-center">
                                        <Image 
                                            src="/assets/logo-aspebtindo.png" 
                                            alt="ASPEBTINDO" 
                                            width={120} 
                                            height={80}
                                            className="object-contain h-full"
                                        />
                                    </div>
                                    <p className="mt-2 text-sm">ASPEBTINDO</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}