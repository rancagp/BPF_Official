import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import Image from "next/image";

const MekanismePerdaganganPage = () => {
    const tableData = [
        { multilateral: 'Dalam bursa', bilateral: 'Luar bursa (SPA)' },
        { multilateral: 'Aturan bursa', bilateral: 'Aturan penyelenggara SPA' },
        { multilateral: 'Sistem bursa (JAFeTS,J-Trader)', bilateral: 'Sistem penyelenggara' },
        { multilateral: 'Lawan tidak tetap', bilateral: 'Lawan tetap' },
        { multilateral: 'Umumnya Order Driven', bilateral: 'Semuanya Quote Driven' },
        { multilateral: 'Bisa tidak ada harga', bilateral: 'Pasti ada harga' },
        { multilateral: 'Bisa antri', bilateral: 'Harus makan harga yang ada' },
        { multilateral: 'Harga sama untuk satu kontrak', bilateral: 'Spread berbeda-beda' },
        { multilateral: 'Bursa netral', bilateral: 'Motivasi untung' },
    ];

    return (
        <PageTemplate title="Mekanisme Perdagangan - PT. Kresna Berjangka Investama">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
            <ProfilContainer title="Mekanisme Perdagangan">
                <div className="space-y-12">
                    {/* Explanation Section */}
                    <div className="grid md:grid-cols-2 gap-8 text-base">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Multilateral</h2>
                            <p className="text-gray-700">
                                Mekanisme transaksi antara banyak pihak dengan sistem tawar-menawar terbuka di bursa. Bertujuan untuk pembentukan harga (price discovery), lindung nilai (hedging), dan dapat melibatkan serah terima fisik komoditi.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Bilateral (SPA)</h2>
                            <p className="text-gray-700">
                                Transaksi antara dua pihak di luar bursa (OTC). Dikenal sebagai Sistem Perdagangan Alternatif (SPA), diselenggarakan murni untuk tujuan spekulasi dengan penyelesaian tunai.
                            </p>
                        </div>
                    </div>

                    {/* Unchanged Table Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Tabel Perbandingan</h2>
                        <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
                        <div className="overflow-x-auto max-w-4xl mx-auto">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 p-2 font-bold text-center">MULTILATERAL</th>
                                        <th className="border border-gray-300 p-2 font-bold text-center">BILATERAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 p-2">{row.multilateral}</td>
                                            <td className="border border-gray-300 p-2">{row.bilateral}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Flowchart Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Alur Perdagangan</h2>
                        <div className="w-20 h-1 bg-green-500 mx-auto mb-8"></div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Alur Multilateral</h3>
                                <Image src="/assets/alur-perdagangan-multi.jpg" alt="Alur Perdagangan Multilateral" width={800} height={600} layout="responsive" className="rounded-md" />
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Alur Bilateral</h3>
                                <Image src="/assets/alur-perdagangan-bila.jpg" alt="Alur Perdagangan Bilateral" width={800} height={600} layout="responsive" className="rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
            </ProfilContainer>
            </div>
        </PageTemplate>
    );
};

export default MekanismePerdaganganPage;
