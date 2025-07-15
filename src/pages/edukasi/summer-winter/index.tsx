import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

const SummerWinterPage = () => {
    return (
        <PageTemplate title="Summer & Winter - Waktu Inggris & Amerika Utara">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Summer & Winter">
                    <div className="space-y-12 text-gray-700">

                        {/* UK Time Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Waktu Inggris / UK Time / British Time</h2>
                            <div className="w-20 h-1 bg-green-500 mb-6"></div>
                            <p className="mb-4">UK Time - Inggis, Wales, Skotlandia, Irlandia Utara</p>
                            <p className="mb-4">Waktu Inggris di zona waktu Eropa Barat (Zona Waktu Eropa Barat). Sama seperti negara-negara Eropa lainnya, Waktu Musim Panas diberlakukan di Inggris, dimana waktu maju satu jam (GMT + 1). Setelah Musim Panas, ketika Waktu Inggis bergeser mundur satu jam ke Waktu Eropa Barat (WET) atau (GMT).</p>

                            <div className="grid md:grid-cols-2 gap-8 mt-8">
                                {/* Summer Begin */}
                                <div className="bg-white p-6 rounded-lg shadow-md border">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Waktu Musim Panas Dimulai (25 Mar)</h3>
                                    <img src="/assets/musim-panas-mulai.png" alt="Musim Panas Mulai" className="w-64 h-auto rounded-md mb-4 mx-auto"/>
                                    <p>Ketika waktu standar lokal akan mencapai Minggu, 25 Maret 2012, 01:00:00 dimajukan 1 jam menjadi Minggu, 25 Maret 2012, 02:00:00 waktu siang hari setempat sebagai gantinya.</p>
                                </div>

                                {/* Summer End */}
                                <div className="bg-white p-6 rounded-lg shadow-md border">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Waktu Musim Panas Berakhir (28 Okt)</h3>
                                    <img src="/assets/musim-panas-berakhir.png" alt="Musim Panas Berakhir" className="w-64 h-auto rounded-md mb-4 mx-auto"/>
                                    <p>Ketika waktu siang hari setempat akan segera tiba Minggu, 28 Oktober 2012, 02:00:00 jam diputar mundur 1 jam menjadi Minggu, 28 Oktober 2012, 01:00:00 waktu standar setempat sebagai gantinya.</p>
                                </div>
                            </div>

                            <div className="mt-8 overflow-x-auto">
                                <h4 className="font-bold text-lg mb-2">Detik sebelum dan sesudah perubahan waktu maju</h4>
                                <table className="min-w-full bg-white border">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-2 px-4 border-b">Tanggal Setempat</th>
                                            <th className="py-2 px-4 border-b">Waktu Setempat</th>
                                            <th className="py-2 px-4 border-b">DST</th>
                                            <th className="py-2 px-4 border-b">UTC Offset</th>
                                            <th className="py-2 px-4 border-b">Zona Waktu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="py-2 px-4 border-b">Minggu, 25 Maret 2012</td><td className="py-2 px-4 border-b">00:59:59</td><td className="py-2 px-4 border-b">No</td><td className="py-2 px-4 border-b">UTC</td><td className="py-2 px-4 border-b">GMT</td></tr>
                                        <tr className="bg-green-100 font-bold"><td className="py-2 px-4 border-b">01:00:00 → 02:00:00</td><td className="py-2 px-4 border-b">+1h</td><td className="py-2 px-4 border-b">+1h</td><td className="py-2 px-4 border-b">UTC+1h</td><td className="py-2 px-4 border-b">BST</td></tr>
                                        <tr><td className="py-2 px-4 border-b">Minggu, 25 Maret 2012</td><td className="py-2 px-4 border-b">02:00:01</td><td className="py-2 px-4 border-b">+1h</td><td className="py-2 px-4 border-b">UTC+1h</td><td className="py-2 px-4 border-b">BST</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 overflow-x-auto">
                                <h4 className="font-bold text-lg mb-2">Detik sebelum dan sesudah perubahan waktu mundur</h4>
                                <table className="min-w-full bg-white border">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-2 px-4 border-b">Tanggal Setempat</th>
                                            <th className="py-2 px-4 border-b">Waktu Setempat</th>
                                            <th className="py-2 px-4 border-b">DST</th>
                                            <th className="py-2 px-4 border-b">UTC Offset</th>
                                            <th className="py-2 px-4 border-b">Zona Waktu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="py-2 px-4 border-b">Minggu, 28 Oktober 2012</td><td className="py-2 px-4 border-b">01:59:59</td><td className="py-2 px-4 border-b">+1h</td><td className="py-2 px-4 border-b">UTC+1h</td><td className="py-2 px-4 border-b">BST</td></tr>
                                        <tr className="bg-red-100 font-bold"><td className="py-2 px-4 border-b">02:00:00 → 01:00:00</td><td className="py-2 px-4 border-b">No</td><td className="py-2 px-4 border-b">No</td><td className="py-2 px-4 border-b">UTC</td><td className="py-2 px-4 border-b">GMT</td></tr>
                                        <tr><td className="py-2 px-4 border-b">Minggu, 28 Oktober 2012</td><td className="py-2 px-4 border-b">01:00:01</td><td className="py-2 px-4 border-b">No</td><td className="py-2 px-4 border-b">UTC</td><td className="py-2 px-4 border-b">GMT</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
                                <h4 className="font-semibold text-lg mb-3">Rumus Waktu Musim Panas Eropa</h4>
                                <p className="mb-2"><b>Mulai:</b> Minggu (31 - ((((5 * y) / 4) + 4) mod 7)) Maret pukul 01:00 GMT</p>
                                <p><b>Berakhir:</b> Minggu (31 - ((((5 * y) / 4) + 1) mod 7)) Oktober pukul 01:00 GMT</p>
                                <p className="text-sm mt-4"><i>Catatan: Rumus berlaku hingga 2099. y adalah tahun.</i></p>
                            </div>

                            <div className="mt-8 overflow-x-auto">
                                <h4 className="font-bold text-lg mb-2">Jadwal BST (2010-2015)</h4>
                                <table className="min-w-full bg-white border">
                                    <thead className="bg-gray-100">
                                        <tr><th className="py-2 px-4 border-b">Tahun</th><th className="py-2 px-4 border-b">BST Mulai</th><th className="py-2 px-4 border-b">BST Berakhir</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="py-2 px-4 border-b">2010</td><td className="py-2 px-4 border-b">Minggu, 28 Maret</td><td className="py-2 px-4 border-b">Minggu, 31 Oktober</td></tr>
                                        <tr><td className="py-2 px-4 border-b">2011</td><td className="py-2 px-4 border-b">Minggu, 27 Maret</td><td className="py-2 px-4 border-b">Minggu, 30 Oktober</td></tr>
                                        <tr><td className="py-2 px-4 border-b">2012</td><td className="py-2 px-4 border-b">Minggu, 25 Maret</td><td className="py-2 px-4 border-b">Minggu, 28 Oktober</td></tr>
                                        <tr><td className="py-2 px-4 border-b">2013</td><td className="py-2 px-4 border-b">Minggu, 31 Maret</td><td className="py-2 px-4 border-b">Minggu, 27 Oktober</td></tr>
                                        <tr><td className="py-2 px-4 border-b">2014</td><td className="py-2 px-4 border-b">Minggu, 30 Maret</td><td className="py-2 px-4 border-b">Minggu, 26 Oktober</td></tr>
                                        <tr><td className="py-2 px-4 border-b">2015</td><td className="py-2 px-4 border-b">Minggu, 29 Maret</td><td className="py-2 px-4 border-b">Minggu, 25 Oktober</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <hr className="my-12 border-gray-300"/>

                        {/* North America Time Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Waktu Musim Panas - Amerika Utara</h2>
                            <div className="w-20 h-1 bg-blue-500 mb-6"></div>
                            <p className="mb-4">USA - Amerika Serikat, Kanada, Meksiko</p>
                            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                <h4 className="font-semibold text-lg mb-3">Aturan DST Amerika Utara (sejak 2007)</h4>
                                <p><b>Mulai:</b> Minggu kedua di bulan Maret, Pukul 2 Pagi waktu setempat.</p>
                                <p><b>Akhir:</b> Minggu pertama di bulan November, Pukul 2 Pagi waktu setempat.</p>
                            </div>

                            <div className="mt-8 overflow-x-auto">
                                <h4 className="font-bold text-lg mb-2">Jadwal DST (USA) 2007 - 2015</h4>
                                <table className="min-w-full bg-white border">
                                    <thead className="bg-gray-100">
                                        <tr><th className="py-2 px-4 border-b">Tahun</th><th className="py-2 px-4 border-b">DST Dimulai</th><th className="py-2 px-4 border-b">DST Berakhir</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="py-2 px-4 border-b">2007</td><td className="py-2 px-4 border-b">Maret 11</td><td className="py-2 px-4 border-b">November 4</td></tr>
                                        <tr><td className="py-2 px-4 border-b">2008</td><td className="py-2 px-4 border-b">Maret 9</td><td className="py-2 px-4 border-b">November 2</td></tr>
                                        <tr><td className="py-2 px-4 border-b">2009</td><td className="py-2 px-4 border-b">Maret 8</td><td className="py-2 px-4 border-b">November 1</td></tr>
                                        <tr><td className="py-2 px-4 border-b">2010</td><td className="py-2 px-4 border-b">Maret 14</td><td className="py-2 px-4 border-b">November 7</td></tr>
                                        <tr><td className="py-2 px-4 border-b">2011</td><td className="py-2 px-4 border-b">Maret 13</td><td className="py-2 px-4 border-b">November 6</td></tr>
                                        <tr><td className="py-2 px-4 border-b">2012</td><td className="py-2 px-4 border-b">Maret 11</td><td className="py-2 px-4 border-b">November 4</td></tr>
                                        <tr><td className="py-2 px-4 border-b">2013</td><td className="py-2 px-4 border-b">Maret 10</td><td className="py-2 px-4 border-b">November 3</td></tr>
                                        <tr><td className="py-2 px-4 border-b">2014</td><td className="py-2 px-4 border-b">Maret 9</td><td className="py-2 px-4 border-b">November 2</td></tr>
                                        <tr><td className="py-2 px-4 border-b">2015</td><td className="py-2 px-4 border-b">Maret 8</td><td className="py-2 px-4 border-b">November 1</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <footer className="text-sm italic text-gray-500 text-center pt-8">
                            <p>Disusun Oleh: Research Team</p>
                            <p>Sumber:</p>
                            <ul className="list-none">
                                <li>[1] <a href="http://wwp.greenwich-mean-time.eu/time-zone/europe/uk/time/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Greenwich Mean Time</a></li>
                                <li>[2] <a href="http://en.wikipedia.org/wiki/European_Summer_Time" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Wikipedia - European Summer Time</a></li>
                            </ul>
                        </footer>

                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
};

export default SummerWinterPage;
