export default function AboutUs() {
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center px-4 py-10">
            {/* Gambar */}
            <div className="w-full flex justify-center">
                <img
                    src="/assets/gedung-kpf.png"
                    alt="Rifan Financindo Berjangka"
                    className="w-full max-w-md md:max-w-[500px] rounded shadow-lg"
                />
            </div>

            {/* Konten */}
            <div className="space-y-4 text-justify">
            <h1 className="text-[clamp(1.25rem,2.5vw,2rem)] font-bold text-green-800 whitespace-nowrap">
            Selamat Datang di KONTAKPERKASA FUTURES
</h1>


                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                PT. Kontakperkasa Futures, selaku anggota dari Bursa Berjangka Jakarta dan anggota Kliring Berjangka Indonesia, berbekal pengalaman dan kemampuan dalam mengembangkan perdagangan berjangka komoditi di tanah air, dengan menyediakan layanan transaksi derivatif lainnya yang sangat diminati investor yaitu transaksi derivatif indeks saham selain transaksi derivatif komoditi yang telah ada.
                </p>
            </div>
        </div>
    );
}
