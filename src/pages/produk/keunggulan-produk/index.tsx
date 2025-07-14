import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function KeunggulanProduk() {
    return (
        <PageTemplate title="Keunggulan Produk">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="KEUNGGULAN PRODUK PT. KONTAKPERKASA FUTURES">
                    <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed text-justify">

                        <p>
                            PT. KONTAKPERKASA FUTURES adalah salah satu perusahaan pialang berjangka yang bergerak dibidang perdagangan komoditi dan konsisten dalam misi pengembangan iklim investasi di Indonesia. Perusahaan juga memberikan pelayanan terbaik bagi setiap nasabah termasuk layanan informasi pasar dan edukasi tentang Perdagangan Berjangka Komoditi, peluang dan risikonya serta fasilitas dalam bertransaksi secara online.
                        </p>

                        <h2 className="text-lg font-semibold text-gray-800 pt-4">Keunggulan Produk PT. KONTAKPERKASA FUTURES:</h2>
                        <ul className="list-disc pl-5 space-y-3">
                            <li>
                                <span className="font-semibold">Efisiensi Modal:</span> Di dalam kegiatan bertransaksi memakai dana jaminan atau dengan nama lain yaitu margin tranding, dengan begitu para investor dapat melakukan transaksi yang cukup besar dengan mengeluarkan dana yang relatif kecil, dalam hal ini anda tidak memerlukan dana sampai sebesar 100% sebagaimana yang tertera di saham.
                            </li>
                            <li>
                                <span className="font-semibold">Fleksibilitas Transaksi:</span> Transaksi yang memanfaatkan dua arah trend yang sangat memungkinkan para investor untuk mendapatkan suatu peluang keuntungan di saat trend harga bergerak naik maupun bergerak turun.
                            </li>
                            <li>
                                <span className="font-semibold">Pergerakan Harga Sangat Fluktuatif:</span> Pergerak harga harian yang cukup besar dengan kisaran 20 hingga 500 point akan memberikan peluang keuntungan yang cukup besar dengan contract size atau nilai kontrak sebesar US $ 5 / point dan juga nasabah hanya dibebankan biaya transaksi atau fee yang sangat kecil, yang setara dengan 6 point saja.
                            </li>
                            <li>
                                <span className="font-semibold">Likuiditas Tinggi:</span> Produk produk finansial ini mempunyai tingkat likuiditas yang begitu tinggi, dengan demikian para nasabah bisa melakukan transaksi jual dan juga beli di mana saja dan kapan saja selama market berjalan dengan lancar, hal ini akan didukung dengan sejumlah layanan dan fasilitas dengan sistem online atau online system.
                            </li>
                            <li>
                                <span className="font-semibold">Tanpa Batasan Waktu Untuk Posisi Terbuka:</span> Semua nasabah dengan bebas dan leluasa bisa menentukan sendiri berapa lama waktu untuk melakukan transaksi tanpa adanya pinalti atau biaya administrasi di saat penutupan akun atau saat penarikan dana.
                            </li>
                        </ul>

                        <h2 className="text-lg font-semibold text-gray-800 pt-4">Jenis Investasi PT. Kontakperkasa Futures</h2>
                        <p>
                            Didalam kegiatan bisnis investasi di PT. KONTAKPERKASA FUTURES ini memiliki 2 jenis investasi, dan jenis investasi tersebut ialah sebagai berikut:
                        </p>
                        <div className="pl-5 space-y-4">
                            <div>
                                <h3 className="font-semibold">a. Fixed Rate atau Kurs Tetap</h3>
                                <ul className="list-disc pl-6 space-y-1 mt-1">
                                    <li>US $ 1 = Rp. 10.000 hal ini merupakan kurs tetap.</li>
                                    <li>Di dalam kurs tetap atau fixed rate ini anda akan terhindar dari resiko kerugian akibat adanya fluktuasi USD atau Rp.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold">b. Floating Rate atau Kurs Berjalan</h3>
                                <ul className="list-disc pl-6 space-y-1 mt-1">
                                    <li>US $ 1 = US $ 1 hal ini sesuai dengan kurs USD terhadap nilai rupiah.</li>
                                    <li>Di dalam kurs berjalan atau floating rate ini tidak ada fee yang berasal dari pembukaan dan juga penarikan dana USD seluruh maupun sebagian.</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
