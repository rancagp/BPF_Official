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

interface ProductAdvantage {
  title: string;
  description: string;
}

interface ProductAdvantages {
  title: string;
  description: string;
  advantagesTitle: string;
  advantages: ProductAdvantage[];
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
  
  // Get translations from the productAdvantages namespace
  const content = t('productAdvantages', { returnObjects: true }) as ProductAdvantages;
  
  // Get the advantages array with fallback to empty array
  const advantages: ProductAdvantage[] = Array.isArray(content.advantages) ? content.advantages : [];
  
  // Get the advantage icons
  const advantageIcons = [FaDollarSign, FaExchangeAlt, FaChartLine, FaCheckCircle];

  return (
    <PageTemplate title={t('pageTitle')}>
      <div className="max-w-4xl mx-auto px-4 sm:px-4 my-6">
        <ProfilContainer title={content.title}>
          <div className="space-y-6">
            <div className="bg-[#080031]/5 rounded-lg p-4 border border-[#080031]/10">
              <p className="text-[#080031] text-sm leading-relaxed text-justify">
                {content.description}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#080031] border-b-2 border-[#FF0000] pb-1.5 inline-block">
                {content.advantagesTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advantages.map((advantage, index) => (
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