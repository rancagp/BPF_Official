import CardFasilitas from "@/components/moleculs/CardFasilitas";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

const fasilitasLayanan = [
  {
    id: 1,
    title: "Wakil Pialang Berjangka (WPB)",
    icon: "👨‍💼",
    description: "Perusahaan didukung oleh Wakil Pialang Berjangka Profesional yang telah disertifikasi oleh Bappebti.",
  },
  {
    id: 2,
    title: "Fasilitas Registrasi Online",
    icon: "💻",
    description: "Kami menyediakan fasilitas bagi Calon Nasabah yang ingin bergabung pada PT. Kontakperkasa Futures dengan melakukan registrasi secara online dengan mengakses website: www.kp-futures.com.",
  },
  {
    id: 3,
    title: "Sistem Keamanan Autentifikasi Dua Faktor (2FA)",
    icon: "🔒",
    description: "Penerapan One Time Password (OTP) pada saat login ke dalam sistem transaksi online trading.",
  },
  {
    id: 4,
    title: "Online Trading & Demo Account",
    icon: "📊",
    description: "Portal khusus untuk bertransaksi secara online melalui internet. Dilengkapi dengan spread price real-time, tampilan chart, dan informasi market. Juga tersedia fasilitas Demo Account untuk simulasi transaksi.",
  },
  {
    id: 5,
    title: "Pelaporan Transaksi Harian",
    icon: "📧",
    description: "Laporan transaksi harian dikirim melalui email nasabah, selain bisa dipantau langsung melalui sistem online trading.",
  },
  {
    id: 6,
    title: "Penarikan Dana (Withdrawal)",
    icon: "💸",
    description: "Formulir penarikan dana dapat dilakukan secara online. Dana dapat diproses dalam satu hari kerja (T+1) setelah semua ketentuan terpenuhi.",
  },
  {
    id: 7,
    title: "Rekening Terpisah (Segregated Account)",
    icon: "🏦",
    description: "Seluruh dana nasabah ditempatkan di dalam Rekening Terpisah yang telah disetujui oleh Bappebti dan terpisah dari aset perusahaan.",
  },
  {
    id: 8,
    title: "Fleksibilitas Transaksi",
    icon: "🔄",
    description: "Transaksi dua arah memungkinkan investor mendapatkan keuntungan baik saat market naik maupun turun, dengan likuiditas produk yang tinggi.",
  },
  {
    id: 9,
    title: "Sarana Penyelesaian Perselisihan",
    icon: "⚖️",
    description: "Penanganan pengaduan nasabah mengacu pada Peraturan Bappebti Nomor 4 Tahun 2020 tentang Pedoman Penyelesaian Perselisihan Nasabah di Bidang Perdagangan Berjangka Komoditi.",
  },
  {
    id: 10,
    title: "Program Sitna",
    icon: "👁️",
    description: "Program transparansi transaksi yang memungkinkan nasabah memantau transaksi pada Bursa Berjangka Jakarta (BBJ) dan Kliring Berjangka Indonesia.",
  },
];

export default function FasilitasLayanan() {
  return (
    <PageTemplate title="Fasilitas & Layanan">
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title="Fasilitas & Layanan">
          <div className="space-y-12">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Layanan Unggulan untuk Kenyamanan Anda</h2>
              <p className="text-lg text-gray-600">
                PT. Kontakperkasa Futures menyediakan berbagai fasilitas dan layanan terbaik untuk mendukung aktivitas trading Anda dengan aman dan nyaman.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {fasilitasLayanan.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}