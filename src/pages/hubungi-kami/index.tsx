import { FaMapMarkerAlt, FaPhone, FaFax, FaEnvelope, FaExternalLinkAlt, FaHeadset } from 'react-icons/fa';
import { useTranslation, TFunction } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'hubungi-kami', 'footer'])),
  },
});

interface Kantor {
  kota: string;
  alamat: string;
  telepon: string;
  fax: string;
  email?: string;
  mapLink: string;
}

const kantorPusat: Kantor = {
  kota: "Kantor Pusat",
  alamat: "Sudirman Plaza, Gedung Plaza Marein Lt. 7 & 19\nJl. Jend. Sudirman Kav. 76-78, Jakarta 12910",
  telepon: "(021) 5793 6555",
  fax: "(021) 5793 6550",
  email: "corporate@kontak-perkasa-futures.co.id",
  mapLink: "https://maps.google.com/?q=Sudirman+Plaza+Jakarta"
};

const kantorCabang: Kantor[] = [
  {
    kota: "Yogyakarta",
    alamat: "Jl. Urip Sumoharjo No. 111, Klitren,\nGondokusuman, Yogyakarta",
    telepon: "(0274) 5027070",
    fax: "(0274) 5027171",
    mapLink: "https://maps.google.com/?q=Jl.+Urip+Sumoharjo+No.+111,+Yogyakarta"
  },
  {
    kota: "Bali",
    alamat: "Jl. Jenderal Sudirman 10X, Dauh Puri Klod,\nDenpasar Barat, Kota Denpasar, Bali 80114",
    telepon: "(0361) 2107888",
    fax: "(0361) 2108107",
    mapLink: "https://maps.google.com/?q=Jl.+Jend.+Sudirman+10X,+Denpasar"
  },
  {
    kota: "Makassar",
    alamat: "Menara Bosowa Lt. 9\nJl. Jend. Sudirman No. 5 Makassar, Sulawesi Selatan 90115",
    telepon: "(0411) 368 1000",
    fax: "(0411) 368 1001",
    mapLink: "https://maps.google.com/?q=Menara+Bosowa+Makassar"
  },
  {
    kota: "Bandung",
    alamat: "Ruko Paskal Hypersquare\nJl. Pasir Kaliki Blok D 33, 35, 36 Bandung 40164",
    telepon: "(022) 87786162",
    fax: "(022) 87786178",
    mapLink: "https://maps.google.com/?q=Paskal+Hypersquare+Bandung"
  },
  {
    kota: "Semarang",
    alamat: "Jl. Sultan Agung No. 100 A-C\nKel. Wonotingal, Kec. Gajahmungkur, Semarang 50232",
    telepon: "(024) 76421717",
    fax: "(024) 76421713",
    mapLink: "https://maps.google.com/?q=Jl.+Sultan+Agung+No.+100+Semarang"
  }
];

interface OfficeProps {
  office: typeof kantorPusat | Kantor;
  isHeadOffice?: boolean;
  t: TFunction;
}

const OfficeCard = ({ office, isHeadOffice = false, t }: OfficeProps) => (
  <div className="bg-white p-6 rounded-lg shadow">
    {isHeadOffice && (
      <p className="font-semibold mb-2">{t('companyName')}</p>
    )}
    <div className="space-y-2">
      <div className="flex items-start">
        <FaMapMarkerAlt className="text-blue-600 mt-0.5 mr-1.5 flex-shrink-0" size={14} />
        <p className="whitespace-pre-line text-gray-700">{office.alamat}</p>
      </div>
      <p className="text-gray-700">
        <span className="font-medium">{t('phone')}:</span> {office.telepon}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">{t('fax')}:</span> {office.fax}
      </p>
      {office.email && (
        <p className="text-gray-700">
          <span className="font-medium">{t('email')}:</span>{' '}
          <a href={`mailto:${office.email}`} className="text-blue-600 hover:underline">
            {office.email}
          </a>
        </p>
      )}
    </div>
  </div>
);

export default function HubungiKami() {
  const { t } = useTranslation('hubungi-kami');
  
  return (
    <PageTemplate title={t('title')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('title')}>
        
        {/* Head Office */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t('headOffice')}
          </h2>
          <OfficeCard office={kantorPusat} isHeadOffice t={t} />
        </div>



        {/* Branch Offices */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            {t('branchOffice')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kantorCabang.map((cabang, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{cabang.kota}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-blue-600 mt-0.5 mr-1.5 flex-shrink-0" size={14} />
                    <p className="whitespace-pre-line text-gray-700">{cabang.alamat}</p>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-medium">{t('phone')}:</span> {cabang.telepon}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">{t('fax')}:</span> {cabang.fax}
                  </p>
                  <a 
                    href={cabang.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:underline text-xs mt-1"
                  >
                    {t('viewOnMap', 'Lihat di Peta')} <FaExternalLinkAlt className="ml-1" size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Online Complaint */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {t('complaintTitle')}
          </h3>
          <p className="text-gray-700 mb-4">
            {t('complaintDescription')}
          </p>
          <a 
            href="mailto:customer.care@kontak-perkasa-futures.co.id"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            <FaEnvelope className="mr-2" /> {t('sendEmail')}
          </a>
        </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
