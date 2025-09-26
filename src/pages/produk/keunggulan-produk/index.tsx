import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { FaCheckCircle, FaExchangeAlt, FaChartLine, FaDollarSign } from 'react-icons/fa';
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

interface Advantage {
  title: string;
  description: string;
}

interface InvestmentType {
  title: string;
  points: string[];
}

interface InvestmentTypes {
  title: string;
  description: string;
  fixedRate: InvestmentType;
  floatingRate: InvestmentType;
}

interface ProductAdvantages {
  title: string;
  description: string;
  advantagesTitle: string;
  advantages: Advantage[];
  investmentTypes: InvestmentTypes;
}

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'produk', 'footer'])),
    },
  };
};

const AdvantageCard = ({ title, description, icon: Icon }: { 
  title: string; 
  description: string; 
  icon: React.ComponentType<{ className?: string }> 
}) => (
  <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 group">
    <div className="w-12 h-12 bg-[#080031]/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FF0000] group-hover:text-white transition-colors">
      <Icon className="w-6 h-6 text-[#FF0000] group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-lg font-bold text-[#080031] mb-3 group-hover:text-[#FF0000] transition-colors">{title}</h3>
    <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
  </div>
);

const InvestmentTypeCard = ({ title, points }: { title: string; points: string[] }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow h-full">
    <h3 className="text-lg font-bold text-[#080031] mb-4 pb-3 border-b border-gray-100">
      {title}
    </h3>
    <ul className="space-y-3">
      {points.map((point, index) => (
        <li key={index} className="flex items-start">
          <span className="text-[#FF0000] mr-3 mt-1">•</span>
          <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function KeunggulanProduk() {
  const { t } = useTranslation('produk');
  
  // Define the content directly since we have the exact content
  const content = {
    description: "Dalam bertransaksi menggunakan Margin Trading (dana jaminan), dengan demikian para investor dapat melakukan transaksi yang besar dengan modal yang relatif kecil. Dengan dana minimal sebesar 10% dari nilai total transaksi, tidak perlu dana 100%.",
    advantages: [
      {
        title: "Efisiensi Modal",
        description: "Dalam bertransaksi menggunakan Margin Trading (dana jaminan), dengan demikian para investor dapat melakukan transaksi yang besar dengan modal yang relatif kecil. Dengan dana minimal sebesar 10% dari nilai total transaksi, tidak perlu dana 100%."
      },
      {
        title: "Fleksibilitas Transaksi",
        description: "Transaksi dua arah yang memungkinkan para investor untuk mendapatkan peluang pada saat pasar bergerak naik maupun turun."
      },
      {
        title: "Pergerakan Harga Sangat Fluktuatif",
        description: "Pergerakan harga harian yang besar dengan range berkisar 100 - 500 poin memberikan peluang keuntungan yang besar dengan kontrak size US $ 5 / point dan hanya dibebankan biaya transaksi / Fee sebesar 3 (Tiga) poin ditambah PPN 11%."
      },
      {
        title: "Likuiditas Tinggi",
        description: "Produk ini memiliki tingkat likuiditas yang sangat tinggi, dengan begitu para investor dapat melakukan transaksi beli dan jual kapan saja selama market berjalan, tanpa harus ada antrian di harga pasar."
      }
    ],
    investmentTypes: {
      title: "Jenis Investasi",
      description: "Ada dua jenis investasi yaitu:",
      fixedRate: {
        title: "Fixed Rate / Kurs Tetap",
        points: [
          "US $ 1 = Rp. 10.000 (kurs tetap)",
          "Terhindar dari resiko kerugian akibat fluktuasi USD/Rp"
        ]
      },
      floatingRate: {
        title: "Floating Rate / Kurs Berjalan",
        points: [
          "US $ 1 = US $ 1 (sesuai kurs USD terhadap Rupiah)",
          "Tidak dikenakan fee dari pembukaan dan penarikan dana USD baik sebagian/seluruh"
        ]
      }
    }
  };

  const advantageIcons = [FaDollarSign, FaExchangeAlt, FaChartLine, FaCheckCircle];

  return (
    <PageTemplate title="Keunggulan Produk">
      <div className="max-w-4xl mx-auto px-4 sm:px-4 my-6">
        <ProfilContainer title="Keunggulan Produk">
          <div className="space-y-6">
            <div className="bg-[#080031]/5 rounded-lg p-4 border border-[#080031]/10">
              <p className="text-[#080031] text-sm leading-relaxed text-justify">
                {content.description}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#080031] border-b-2 border-[#FF0000] pb-1.5 inline-block">
                Keunggulan Kami
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.advantages.map((advantage, index) => (
                  <AdvantageCard
                    key={index}
                    title={advantage.title}
                    description={advantage.description}
                    icon={advantageIcons[index % advantageIcons.length]}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#080031] border-b-2 border-[#FF0000] pb-1.5 inline-block">
                {content.investmentTypes.title}
              </h2>
              <div className="bg-[#080031]/5 rounded-lg p-4 border border-[#080031]/10">
                <p className="text-[#080031] text-sm leading-relaxed text-justify mb-4">
                  {content.investmentTypes.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InvestmentTypeCard
                    key="fixed-rate"
                    title={content.investmentTypes.fixedRate.title}
                    points={content.investmentTypes.fixedRate.points}
                  />
                  <InvestmentTypeCard
                    key="floating-rate"
                    title={content.investmentTypes.floatingRate.title}
                    points={content.investmentTypes.floatingRate.points}
                  />
                </div>
              </div>
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}