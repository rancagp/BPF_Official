import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

type ServiceItem = {
  title: string;
  description: string;
};

const services: ServiceItem[] = [
  {
    title: 'Wakil Pialang Berjangka Profesional',
    description: 'Perusahaan memiliki Wakil Pialang Berjangka profesional yang selalu siap memberikan pelayanan kepada calon nasabah / nasabah, berupa edukasi, prosedur administrasi dan mekanisme transaksi Sistem Perdagangan Alternatif di Bursa Berjangka Jakarta.'
  },
  {
    title: 'Fasilitas Online Trading & Demo Account',
    description: 'Fasilitas ini akan memberikan kemudahan bagi setiap nasabah dalam bertransaksi secara tersedia jaringan internet. Kami juga menyediakan Demo Account atau Simulasi Transaksi agar calon nasabah dapat lebih memahami dan menguasai fungsi-fungsi transaksi Anda cukup menghubungi customer care kami.'
  },
  {
    title: 'Pelaporan Transaksi Setiap Hari',
    description: 'Setiap hari nasabah akan mendapat Laporan Transaksi Nasabah yang berisikan catatan transaksi dan perkembangan investasi yang telah dilakukan oleh nasabah, baik via e-mail, fax, maupun melalui surat/pos. Catatan atau rekam transaksi tersebut juga dapat diakses langsung melalui online trading platform dengan memilih menu utama Temporary Statement / Daily Statement.'
  },
  {
    title: 'Penarikan Dana (Withdrawal)',
    description: 'Penarikan dana dapat dilakukan sewaktu-waktu oleh nasabah apabila nasabah menghendakinya. PT. Bestprofit Futures mengupayakan agar penarikan dana dapat diproses satu hari kerja (T+1).'
  },
  {
    title: 'Rekening Terpisah (Segregated Account)',
    description: 'Semua dana investor ditempatkan pada Segregated Account pialang yang ada di Bank Penyimpanan yang disetujui oleh Bappebti yaitu Bank BCA, Bank CIMB Niaga, Bank Mandiri, Bank BNI dan Artha Graha dan terpisah dengan aset-aset perusahaan. Dana tersebut hanya dipergunakan untuk keperluan transaksi nasabah bersangkutan seperti perpindahan dana ke Segregated Account KBI sebagai margin atas posisi terbuka nasabah.'
  },
  {
    title: 'Fleksibilitas Transaksi',
    description: 'Transaksi dua arah memungkinkan bagi para investor untuk mendapatkan keuntungan pada saat market bergerak naik maupun turun. Apalagi likuiditas produk ini sangat tinggi, sehingga memungkinkan mengambil keuntungan optimal.'
  },
  {
    title: 'Sarana Penyelesaian Perselisihan',
    description: 'Sarana penyelesaian yang dipergunakan apabila terjadi perselisihan dalam kegiatan perdagangan berjangka:\n1. Musyawarah untuk Mufakat, adalah suatu bentuk penyelesaian yang dilandasi rasa kekeluargaan,\n2. Badan Arbitrase Perdagangan Berjangka Komoditi (BAKTI), atau\n3. Pengadilan Negeri Jakarta Selatan'
  },
  {
    title: 'Program Sitna',
    description: 'Dalam rangka transparansi transaksi kami menyediakan program Sitna kepada setiap nasabah untuk melihat transaksi tersebut pada Bursa Berjangka Jakarta (BBJ) dan Kliring Berjangka Indonesia.'
  }
];

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'id', ['fasilitas_layanan', 'common', 'footer'])),
    },
  };
}

export default function FasilitasLayanan() {
  const { t } = useTranslation('fasilitas_layanan');

  return (
    <PageTemplate title="Fasilitas & Layanan" description="Fasilitas dan layanan terbaik dari PT Bestprofit Futures">
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title="Fasilitas & Layanan">
          <div className="space-y-12">
            <div className="text-center">
              <p className="text-[#000000] leading-relaxed max-w-4xl mx-auto text-left">
                {t('pageDescription')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="group bg-white p-6 rounded-xl border border-gray-100 hover:border-[#FF0000]/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="h-8 w-1 bg-[#FF0000] rounded-full mr-3 mt-1 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-bold text-[#080031] group-hover:text-[#FF0000] transition-colors duration-300 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-[#000000]/90 text-justify whitespace-pre-line">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}