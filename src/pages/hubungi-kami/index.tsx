import { FaMapMarkerAlt, FaPhone, FaFax, FaEnvelope, FaExternalLinkAlt, FaHeadset } from 'react-icons/fa';
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

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

export default function HubungiKami() {
  return (
    <PageTemplate title="Hubungi Kami | Kontakperkasa Futures">
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title="Hubungi Kami">
        
        {/* Kantor Pusat */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">KANTOR PUSAT</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="font-semibold mb-2">PT. Kontakperkasa Futures</p>
            <p className="whitespace-pre-line text-gray-700 mb-4">{kantorPusat.alamat}</p>
            <p className="text-gray-700">
              Telp : {kantorPusat.telepon}, Fax : {kantorPusat.fax}
            </p>
            <p className="text-gray-700">
              Email : <a href={`mailto:${kantorPusat.email}`} className="text-blue-600 hover:underline">{kantorPusat.email}</a>
            </p>
          </div>
        </div>



        {/* Kantor Cabang */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Kantor Cabang</h2>
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
                    Telp: {cabang.telepon}
                  </p>
                  <p className="text-gray-700">
                    Fax: {cabang.fax}
                  </p>
                  <a 
                    href={cabang.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:underline text-xs mt-1"
                  >
                    Lihat di Peta <FaExternalLinkAlt className="ml-1" size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keluhan Online */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4">PENYAMPAIAN KELUHAN ONLINE</h3>
          <p className="text-gray-700 mb-4">Kirimkan keluhan atau saran Anda melalui email resmi kami.</p>
          <a 
            href="mailto:customer.care@kontak-perkasa-futures.co.id"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            <FaEnvelope className="mr-2" /> Kirim Email
          </a>
        </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
