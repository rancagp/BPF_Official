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
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
    <div className="text-[#F2AC59] mb-4">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-semibold text-[#4C4C4C] mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const InvestmentTypeCard = ({ title, points }: { title: string; points: string[] }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
    <h3 className="text-lg font-semibold text-[#4C4C4C] mb-3">{title}</h3>
    <ul className="space-y-2">
      {points.map((point, index) => (
        <li key={index} className="flex items-start">
          <span className="text-[#F2AC59] mr-2 mt-1">•</span>
          <span className="text-gray-600 text-sm">{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function KeunggulanProduk() {
  const { t } = useTranslation('produk');
  const productAdvantages = t('productAdvantages', { returnObjects: true }) as ProductAdvantages;
  const advantages = productAdvantages.advantages as Advantage[];
  const investmentTypes = productAdvantages.investmentTypes as InvestmentTypes;

  const advantageIcons = [FaDollarSign, FaExchangeAlt, FaChartLine, FaCheckCircle];

  return (
    <PageTemplate title={t('productAdvantages.title')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('productAdvantages.title')}>
          <div className="space-y-8">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
              {t('productAdvantages.description')}
            </p>

            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 pt-4">
                {t('productAdvantages.advantagesTitle')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
              <h2 className="text-lg font-semibold text-gray-800 pt-4">
                {investmentTypes.title}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
                {investmentTypes.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InvestmentTypeCard
                  key="fixed-rate"
                  title={investmentTypes.fixedRate.title}
                  points={investmentTypes.fixedRate.points}
                />
                <InvestmentTypeCard
                  key="floating-rate"
                  title={investmentTypes.floatingRate.title}
                  points={investmentTypes.floatingRate.points}
                />
              </div>
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}