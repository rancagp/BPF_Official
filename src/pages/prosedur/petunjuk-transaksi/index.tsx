import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function PetunjukTransaksi() {
    return (
        <PageTemplate title="Petunjuk Transaksi">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Petunjuk Transaksi">
                    <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed text-justify">

                        <p>
                            Nasabah dapat memberi atau menyampaikan amanat dengan cara online dan atau bisa juga melalui telephone seperti yang di anjurkan kepada nasabah ketika melakukan simulasi trading melalui akun Demo terlebih dahulu sebelum memakai Real online trading.
                        </p>

                        <p>
                            Nasabah yang memberikan atau menyampaikan pesan dengan cara online akan mendapatkan USER ID beserta password nya dari PT. KONTAKPERKASA FUTURES. Dan untuk melakukan transaksi dengan cara online, syarat yang harus Anda penuhi ialah:
                        </p>

                        <ol className="list-decimal pl-5 sm:pl-8 space-y-3">
                            <li>Adanya jaringan internet</li>
                            <li>
                                Akses ke link berikut:{" "}
                                <a
                                    href="http://etrade.kontakperkasafutures.com/login.php"
                                    className="text-green-600 hover:text-green-700 underline break-all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    http://etrade.kontakperkasafutures.com/login.php
                                </a>
                            </li>
                            <li>
                                Nasabah sudah memiliki user ID beserta passwordnya dari PT. Kontakperkasa Futures (password ini bisa diganti oleh nasabah dengan sendirinya).
                            </li>
                        </ol>

                        <p className="font-semibold">
                            Catatan: Untuk setiap transaksi, nasabah hanya dapat membeli atau menjual maksimum 50 lot.
                        </p>

                        <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800">
                            <p className="font-bold">Perhatian:</p>
                            <p className="mt-1">
                                Nasabah wajib membaca dan memahami beberapa ketentuan di dalam online trading yang dipaparkan di halaman pembuka. Jika nasabah masuk ke dalam sistem online (login) dan melakukan transaksi, berarti nasabah bersangkutan menerima seluruh konsekuensi yang ada berkaitan dengan transaksi tersebut.
                            </p>
                        </div>

                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
