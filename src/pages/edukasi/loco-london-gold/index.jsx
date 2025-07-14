import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

const LocoLondonGoldPage = () => {
    return (
        <PageTemplate title="Loco London Gold - PT. Kresna Berjangka Investama">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Loco London Gold">
                    <div className="space-y-16">
                        {/* Intro Section */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-700 space-y-4">
                            <p>
                                Emas merupakan salah satu jenis komoditi yang paling banyak diminati untuk tujuan investasi. Di samping itu, emas juga digunakan sebagai standar keuangan atau ekonomi, cadangan devisa dan alat pembayaran yang paling utama di beberapa negara. Para investor umumnya membeli emas untuk hedge atau safe haven terhadap beberapa krisis termasuk ekonomi, politik, sosial atau krisis yang berbasis mata uang.
                            </p>
                            <p>
                                Permintaan emas fisik mengalami peningkatan cukup signifikan dari tahun ke tahun. Padahal cadangan emas dunia sangatlah terbatas. Oleh karena itu, dibeberapa negara maju telah menyediakan investasi alternatif berupa produk derivatif emas dengan menarik sejumlah margin sebagai jaminan transaksinya (margin trading). Ini karena adanya faktor harga, dimana harga emas juga dapat berfluktuasi sebagaimana komoditas lainnya.
                            </p>
                        </div>

                        {/* Sejarah Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">A. Sejarah Perdagangan Emas</h2>
                            <div className="w-20 h-1 bg-green-500 mb-6"></div>
                            <div className="space-y-4 text-gray-700">
                                <p>Di dalam pasar komoditas istilah "Loco" berarti "di". Berasal dari bahasa latin Locus yang berarti tempat. Loco London merepresentasikan basis perdagangan dan penyelesaian emas dan perak internasional di London. Pelaksanaan pasar ini di bawah naungan London Bullion Market Association (LBMA), namun bukan bursa.</p>
                                <p>Pasar emas fisik (spot gold) terbesar dunia adalah London dan Zurich, akan tetapi London yang paling menonjol. London tumbuh mendominasi pasar emas pada saat emas menjadi mata uang utama. Penemuan signifikan di Ural (Rusia) telah meningkatkan produksi emas global di abad 18. Pertengahan abad 19 menjadi momen bagi Inggris untuk mendominasi perdagangan dan keuangan dunia, sebagai sumber modal untuk pertambangan emas, dan menjadi standar emas mata uang lokal, British Pound. Sehingga London menjadi pusat perdagangan dan penyelesaian emas dunia.</p>
                                
                                <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Perdagangan Over-the-Counter (OTC)</h3>
                                    <p>Pasar emas London merupakan pasar Over-The-Counter yang berarti perdagangan dilakukan secara langsung antara dua pihak yang terlibat, dan tidak melalui pihak ketiga yang mengatur perdagangan, seperti bursa. Pasar OTC berlangsung selama 24 jam sehari dan tidak mempunyai struktur formal dan tidak ada tempat pertemuan sentral. Sebagian besar perdagangan dilakukan melalui telpon atau sistem dealing elektronik. Di pasar finansial global saat ini, perdagangan emas di London hampir terselenggara sepanjang waktu diseluruh dunia.</p>
                                </div>

                                <div className="bg-green-50 p-6 rounded-lg border border-green-200 mt-6">
                                    <h3 className="text-xl font-semibold text-green-800 mb-3">Mengapa berinvestasi di emas (Spot OTC)</h3>
                                    <ul className="list-disc list-inside space-y-2 text-green-900 pl-5">
                                        <li>Harga biasanya dikuotasikan dan diperdagangkan terhadap dolar AS.</li>
                                        <li>Dapat melayani beberapa tujuan transaksi seperti hedging, investasi dan spekulasi.</li>
                                        <li>Investor dapat mempertahankan posisi mereka selama waktu yang mereka inginkan tanpa ada jatuh tempo.</li>
                                        <li>Menerima bunga saat menjual emas atau perak Loco-London pada suku bunga terakhir.</li>
                                        <li>Transaksi leverage pada margin.</li>
                                        <li>Diversifikasi portfolio investasi.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Pasar Emas Dunia Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">B. Pasar Emas Dunia</h2>
                            <div className="w-20 h-1 bg-green-500 mb-6"></div>
                            <div className="space-y-6">
                                <div className="p-6 border rounded-lg bg-white shadow-sm">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Loco London Gold Market</h3>
                                    <p className="text-gray-700">Di London, emas dan perak diperdagangkan oleh anggota-anggota London Bullion Market Association (LBMA), diawasi oleh Bank of England. Perdagangan emas di pasar London memiliki sejarah panjang selama 3 abad, dan Gold Fixing (penetapan harga emas) dilakukan 2 kali sehari oleh 5 Anggota Fixing.</p>
                                </div>
                                <div className="p-6 border rounded-lg bg-white shadow-sm">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Pasar Emas Amerika</h3>
                                    <p className="text-gray-700">Sejak 1975, COMEX di New York menjadi sentral perdagangan forward emas dunia, dan kini pasar berjangka New York menggantikan London dalam mengatur harga emas dunia karena keunggulannya dalam metode transaksi, supply, dan waktu.</p>
                                </div>
                                <div className="p-6 border rounded-lg bg-white shadow-sm">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Pasar Emas Hong Kong</h3>
                                    <p className="text-gray-700">Dikenal sebagai pasar emas Loco (Local) London, pasar Hong Kong dikuotasikan dalam US dollar per troy ounce. Selain itu, Chinese Gold and Silver Exchange Society mengoperasikan salah satu pasar emas fisik terbesar di dunia dengan satuan tael dan mata uang dolar Hong Kong.</p>
                                </div>
                            </div>
                        </section>

                        {/* Analisis Harga Emas Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">C. Analisis Harga Emas</h2>
                            <div className="w-20 h-1 bg-green-500 mb-6"></div>
                            <p className="text-gray-700">Pada kenyataannya, harga emas tidak hanya tergantung pada permintaan dan penawaran, tetapi juga dipengaruhi oleh situasi perekonomian secara keseluruhan. Berikut adalah beberapa faktor utamanya:</p>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                <div className="bg-white p-6 rounded-lg shadow-md border"> 
                                    <h4 className="font-bold text-lg mb-2">Perubahan Kurs</h4>
                                    <p className="text-sm text-gray-600">Melemahnya Dolar AS biasanya mendorong kenaikan harga emas, karena investor beralih ke emas sebagai aset safe haven.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md border"> 
                                    <h4 className="font-bold text-lg mb-2">Situasi Politik Dunia</h4>
                                    <p className="text-sm text-gray-600">Ketidakpastian politik global, seperti perang, membuat pelaku pasar beralih ke emas, sehingga permintaan dan harga melonjak.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md border"> 
                                    <h4 className="font-bold text-lg mb-2">Penawaran & Permintaan</h4>
                                    <p className="text-sm text-gray-600">Aksi jual oleh bank sentral atau penjualan forward oleh perusahaan tambang dapat menekan harga emas.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md border"> 
                                    <h4 className="font-bold text-lg mb-2">Situasi Ekonomi Global</h4>
                                    <p className="text-sm text-gray-600">Inflasi tinggi mendorong investor menggunakan emas sebagai lindung nilai, sementara pertumbuhan ekonomi dapat meningkatkan permintaan perhiasan.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md border"> 
                                    <h4 className="font-bold text-lg mb-2">Suku Bunga</h4>
                                    <p className="text-sm text-gray-600">Kenaikan suku bunga membuat deposito lebih menarik daripada emas (non-interest), sehingga menekan harga emas, dan sebaliknya.</p>
                                </div>
                            </div>
                        </section>

                        {/* Kontrak Derivatif Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">D. Kontrak Derivatif Emas Loco London (SPA)</h2>
                            <div className="w-20 h-1 bg-green-500 mb-6"></div>
                            <p className="text-gray-700">Kini kontrak derivatif emas Loco London menjadi objek transaksi melalui Sistem Perdagangan Alternatif (SPA), berdasarkan Peraturan Kepala Bappebti No. 72/BAPPEBTI/Per/9/2009. Selain emas, produk lainnya adalah kontrak derivatif antar mata uang asing (cross currencies) dan indeks.</p>
                        </section>

                        <p className="text-sm italic text-gray-500 text-center pt-8">
                            *) Diolah dari beberapa sumber
                        </p>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
};

export default LocoLondonGoldPage;
