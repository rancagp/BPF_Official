import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function IlustrasiTransaksi() {
    return (
        <PageTemplate title="Ilustrasi Transaksi">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Ilustrasi Transaksi">
                    <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">

                        <p>
                            Untuk Anda yang ingin melakukan investasi dengan produk-produk dari PT. KONTAKPERKASA FUTURES, Anda dapat melihat ilustrasi transaksi dibawah ini, guna untuk mempertimbangkan lebih dalam lagi apakah Anda yakin dalam hal ini:
                        </p>

                        {/* Rumus Perhitungan */}
                        <section className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Rumus Perhitungan Transaksi</h3>
                            <div className="p-4 mb-4 font-mono text-center text-white bg-gray-800 rounded-md text-xs sm:text-sm">
                                [(Selling Price – Buying Price) x Contract Size x n Lot] – [(Facility Fee + VAT) x n Lot]
                            </div>
                            <h4 className="font-semibold mb-2">Keterangan:</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Contract Size (nilai kontrak):</strong> sebesar US $5 per poin untuk kontrak gulir berkala indeks saham dan 100 troy ounce untuk kontak gulir harian emas Loco London.</li>
                                <li><strong>n Lot:</strong> n adalah banyaknya lot yang ditransaksikan.</li>
                                <li><strong>Facility Fee (biaya komisi):</strong> sebesar US $15 per lot per sisi (beli atau jual). Total biaya komisi sebesar US $30 untuk 1 lot settlement.</li>
                                <li><strong>VAT (Pajak Pertambahan Nilai):</strong> sebesar 11% dari biaya komisi yaitu US $1.65 / lot/side. Total biaya VAT sebesar US $3.3 untuk 1 lot settlement.</li>
                                <li>Apabila penyelesaian transaksi dilakukan lebih dari satu hari (overnight) maka setiap lot transaksi akan dikenakan <strong>biaya inap / roll over</strong>.</li>
                            </ul>
                            <h4 className="font-semibold mt-4 mb-2">Roll over fee / storage (biaya inap):</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li>HKK5U dan HKK50 sebesar US $3 / malam.</li>
                                <li>JPK5U dan JPK50 sebesar US $2 / malam.</li>
                                <li>XULF dan XUL10 sebesar US $5 / malam.</li>
                                <li>XAGF dan XAG10 sebesar US $5 / malam.</li>
                            </ul>
                        </section>

                        {/* Contoh Transaksi */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Contoh Transaksi</h2>
                            <div className="w-20 h-1 bg-green-500 mb-6"></div>
                            <div className="space-y-6">
                                <div className="p-6 border rounded-lg">
                                    <h4 className="font-bold mb-2">Contoh 1: Day Trade (Profit)</h4>
                                    <p className="mb-4">Seorang nasabah mengambil posisi beli HKK5U pada level 24.600 poin sebanyak 2 lot. Kemudian investor menutup/melikuidasi posisi beli 2 lot tersebut ketika indeks berada pada level 24.700 poin.</p>
                                    <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                                        P/L = [(24.700 – 24.600) x US$5 x 2] – [(US$30 + US$3.3) x 2]<br />
                                        P/L = (100 x US$5 x 2) – (US$33.3 x 2)<br />
                                        P/L = US$1000 – US$66.6<br />
                                        <strong className="text-green-600">P/L = US$933.4 (laba bersih)</strong>
                                    </div>
                                </div>
                                <div className="p-6 border rounded-lg">
                                    <h4 className="font-bold mb-2">Contoh 2: Day Trade (Loss)</h4>
                                    <p className="mb-4">Seorang Investor membuka posisi beli HKK5U pada level 24.600 poin sebanyak 1 lot. Akan tetapi pergerakan indeks tidak sesuai, maka investor melikuidasi posisi pada level 24.550 poin.</p>
                                    <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                                        P/L = [(24.550 – 24.600) x US$5 x 1] – [(US$30 + US$3.3) x 1]<br />
                                        P/L = (–50 x US$5 x 1) – US$33.3<br />
                                        P/L = –US$250 – US$33.3<br />
                                        <strong className="text-red-600">P/L = –US$283.3 (rugi bersih)</strong>
                                    </div>
                                </div>
                                <div className="p-6 border rounded-lg">
                                    <h4 className="font-bold mb-2">Contoh 3: Transaksi Perak Loco London</h4>
                                    <p className="mb-4">Nasabah mengambil posisi beli XAGF pada harga $24,175/troy ounce sebanyak 1 lot dan melikuidasi pada harga $24,200.</p>
                                    <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                                        P/L = [($24,200 – $24,175) x 5.000 x 1] – [($30 + $3.3) x 1]<br />
                                        P/L = (0.025 x 5.000) - $33.3<br />
                                        <strong className="text-green-600">P/L = US$91.70 (laba bersih)</strong>
                                    </div>
                                </div>
                                <div className="p-6 border rounded-lg">
                                    <h4 className="font-bold mb-2">Contoh 4: Overnight (Profit)</h4>
                                    <p className="mb-4">Investor membuka posisi jual JPK5U di 14.850 (2 lot) pada 10 Juni. Dua hari kemudian (12 Juni), posisi ditutup di 14.650.</p>
                                    <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                                        P/L = [(14.850 – 14.650) x US$5 x 2] – [(US$30 + US$3.3) x 2]<br />
                                        P/L = (200 x US$5 x 2) – US$66.6 = US$1933.4 (laba kotor)<br />
                                        Roll over fee = US$2 x 2 lot x 2 malam = US$8 (-)<br />
                                        <strong className="text-green-600">Keuntungan bersih = US$1925.4</strong>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Kode & Jenis Kontrak */}
                        <section>
                             <h2 className="text-2xl font-bold text-gray-800 mb-2">Kode & Jenis Kontrak</h2>
                            <div className="w-20 h-1 bg-green-500 mb-6"></div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-collapse text-xs sm:text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-2 px-4 border-b border-r">Kode Kontrak</th>
                                            <th className="py-2 px-4 border-b border-r">Dasar</th>
                                            <th className="py-2 px-4 border-b border-r">Kategori</th>
                                            <th className="py-2 px-4 border-b">Jenis Kontrak</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="py-2 px-4 border-b border-r">GU1010_BBJ</td><td className="py-2 px-4 border-b border-r">GBP/USD</td><td className="py-2 px-4 border-b border-r">DIRECT</td><td className="py-2 px-4 border-b">Kontrak Gulir Harian Harga Spot GBP/USD</td></tr>
                                        <tr><td className="py-2 px-4 border-b border-r">EU1010_BBJ</td><td className="py-2 px-4 border-b border-r">EUR/USD</td><td className="py-2 px-4 border-b border-r">DIRECT</td><td className="py-2 px-4 border-b">Kontrak Gulir Harian Harga Spot EUR/USD</td></tr>
                                        <tr><td className="py-2 px-4 border-b border-r">AU1010_BBJ</td><td className="py-2 px-4 border-b border-r">AUD/USD</td><td className="py-2 px-4 border-b border-r">DIRECT</td><td className="py-2 px-4 border-b">Kontrak Gulir Harian Harga Spot AUD/USD</td></tr>
                                        <tr><td className="py-2 px-4 border-b border-r">UC1010_BBJ</td><td className="py-2 px-4 border-b border-r">USD/CHF</td><td className="py-2 px-4 border-b border-r">INDIRECT</td><td className="py-2 px-4 border-b">Kontrak Gulir Harian Harga Spot USD/CHF</td></tr>
                                        <tr><td className="py-2 px-4 border-b border-r">UJ1010_BBJ</td><td className="py-2 px-4 border-b border-r">USD/JPY</td><td className="py-2 px-4 border-b border-r">INDIRECT</td><td className="py-2 px-4 border-b">Kontrak Gulir Harian Harga Spot USD/JPY</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Ilustrasi Perhitungan Transaksi */}
                        <section>
                             <h2 className="text-2xl font-bold text-gray-800 mb-2">Ilustrasi Perhitungan Transaksi</h2>
                            <div className="w-20 h-1 bg-green-500 mb-6"></div>
                            <div className="space-y-6">
                                <div className="p-6 border rounded-lg">
                                    <h4 className="font-bold mb-2">Direct Rates (Contoh: EU1010_BBJ)</h4>
                                    <div className="p-4 mb-4 font-mono text-center text-white bg-gray-800 rounded-md text-xs sm:text-sm">
                                        P/L = (Harga Jual - Harga Beli) x Contract Size x Jumlah Lot – [(Facility Fee + VAT) x n Lot]
                                    </div>
                                    <p className="mb-4">Nasabah mengambil posisi beli EU1010_BBJ pada harga 1.3530 (2 lot), kemudian melikuidasi pada harga 1.3540.</p>
                                    <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                                        P/L = (1.3540 - 1.3530) x 100.000 x 2 - [(US$30 + US$3.3) x 2]<br />
                                        P/L = 0,0010 x 100.000 x 2 - (US$33.3 x 2)<br />
                                        <strong className="text-green-600">P/L = US$133.4 (laba bersih)</strong>
                                    </div>
                                    <p className="my-4">Namun apabila dilikuidasi pada harga 1.3525:</p>
                                     <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                                        P/L = (1.3525 - 1.3530) x 100.000 x 2 - [(US$30 + US$3.3) x 2]<br />
                                        P/L = -0,0005 x 100.000 x 2 - (US$33.3 x 2)<br />
                                        <strong className="text-red-600">P/L = -US$166.6 (rugi bersih)</strong>
                                    </div>
                                </div>
                                <div className="p-6 border rounded-lg">
                                    <h4 className="font-bold mb-2">Indirect Rates (Contoh: UJ1010_BBJ)</h4>
                                     <div className="p-4 mb-4 font-mono text-center text-white bg-gray-800 rounded-md text-xs sm:text-sm">
                                        P/L = ((Harga Jual - Harga Beli) / Harga Likuidasi) x Contract Size x Jumlah Lot
                                    </div>
                                    <p className="mb-4">Nasabah mengambil posisi jual UJ1010_BBJ pada harga 102.20 (1 lot), kemudian melikuidasi pada harga 102.12.</p>
                                    <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                                        P/L = ((102.20 - 102.12) / 102.12) x 100.000 x 1 - [(US$30 + US$3.3) x 1]<br />
                                        P/L = (0.0007834 x 100.000) - US$33.3<br />
                                        <strong className="text-green-600">P/L = US$45.04 (laba bersih)</strong>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
