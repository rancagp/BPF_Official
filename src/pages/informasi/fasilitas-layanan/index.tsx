import CardFasilitas from "@/components/moleculs/CardFasilitas";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function FasilitasLayanan() {
    const items = [
        {
            title: "Wakil Pialang Berjangka Profesional",
            content:
                "Perusahaan memiliki Wakil Pialang Berjangka profesional yang selalu siap memberikan pelayanan kepada calon nasabah / nasabah berupa edukasi, prosedur administrasi dan mekanisme transaksi Sistem Perdagangan Alternatif di Bursa Berjangka Jakarta.",
        },
        {
            title: "Fasilitas Online Trading & Demo Account",
            content:
                "Fasilitas ini akan memberikan kemudahan bagi setiap nasabah dalam bertransaksi melalui jaringan internet. Perusahaan juga menyediakan akun demo untuk melakukan simulasi transaksi agar calon nasabah dapat lebih memahami dan menguasai fungsi-fungsi transaksi dengan cukup menghubungi customer care kami.",
        },
        {
            title: "Pelaporan Transaksi Setiap Hari",
            content:
                "Setiap hari nasabah akan mendapat laporan transaksi yang berisikan catatan dan perkembangan transaksi yang telah dilakukan oleh nasabah. Catatan atau rekam transaksi tersebut juga dapat diakses langsung melalui online trading platform dengan memilih menu utama Temporary Statement/Daily Statement.",
        },
        {
            title: "Penarikan Dana (Withdrawal) Secara Online",
            content:
                "Penarikan dana dapat dilakukan sewaktu-waktu oleh nasabah apabila menghendakinya. PT Rifan Financindo Berjangka menyediakan fitur penarikan dana online yang disematkan pada platform transaksi dan mengupayakan agar penarikan dana dapat diproses satu hari kerja (T+1).",
        },
        {
            title: "Rekening Terpisah (Segregated Account)",
            content:
                "Semua dana investor ditempatkan pada Segregated Account pialang yang ada di Bank Penyimpanan yang disetujui oleh Bappebti yaitu Bank BCA, Bank CIMB Niaga, Bank BNI, Bank Mandiri dan Bank Artha Graha yang terpisah dengan aset-aset perusahaan. Dana tersebut hanya dipergunakan untuk keperluan transaksi nasabah bersangkutan seperti perpindahan dana ke Segregated Account kliring sebagai jaminan margin atas posisi terbuka nasabah.",
        },
        {
            title: "Fleksibilitas Transaksi",
            content:
                "Transaksi dua arah memungkinkan bagi para nasabah untuk mendapatkan peluang keuntungan pada saat market bergerak naik maupun turun. Tingkat likuiditas produk dan pergerakan harga yang cukup tinggi memungkinkan nasabah untuk mengambil peluang keuntungan dengan optimal.",
        },
        {
            title: "Sarana Penyelesaian Perselisihan",
            content: (
                <ul className="list-disc pl-5 space-y-1">
                    <li>Musyawarah untuk Mufakat adalah suatu bentuk penyelesaian yang dilandasi azas kekeluargaan,</li>
                    <li>Mediasi yang difasilitasi oleh PT Bursa Berjangka Jakarta,</li>
                    <li>Badan Arbitrase Perdagangan Berjangka Komoditi (BAKTI), atau</li>
                    <li>Pengadilan Negeri.</li>
                </ul>
            ),
        },
        {
            title: "SITNa",
            content:
                "Fasilitas yang disediakan oleh PT KBI (Persero) sebagai bentuk transparansi transaksi. SITNa memungkinkan setiap nasabah untuk melihat transaksi apakah transaksinya terdaftar di Bursa Berjangka Jakarta (BBJ) dan Kliring Berjangka Indonesia atau tidak.",
        },
    ];

    return (
        <PageTemplate title="Fasilitas & Layanan">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Fasilitas & Layanan">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {items.map((item, index) => (
                            <CardFasilitas key={index} title={item.title} content={item.content} />
                        ))}
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    )
}