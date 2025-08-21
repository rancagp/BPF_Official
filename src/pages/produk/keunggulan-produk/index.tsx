import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

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

type TranslationKey = keyof typeof translations;

const translations = {
  id: {
    productAdvantages: {} as ProductAdvantages
  },
  en: {
    productAdvantages: {} as ProductAdvantages
  }
};
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'produk', 'footer'])),
    },
  };
};

export default function KeunggulanProduk() {
    const { t } = useTranslation('produk');
    return (
        <PageTemplate title={t('productAdvantages.title')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('productAdvantages.title')}>
                    <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
                        <p>{t('productAdvantages.description')}</p>

                        <h2 className="text-lg font-semibold text-gray-800 pt-4">{t('productAdvantages.advantagesTitle')}</h2>
                        <ul className="list-disc pl-5 space-y-3">
                            {(t('productAdvantages.advantages', { returnObjects: true }) as Advantage[]).map((advantage, index) => (
                                <li key={index}>
                                    <span className="font-semibold">{advantage.title}:</span> {advantage.description}
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-lg font-semibold text-gray-800 pt-4">{t('productAdvantages.investmentTypes.title')}</h2>
                        <p>{t('productAdvantages.investmentTypes.description')}</p>
                        <div className="pl-5 space-y-4">
                            <div>
                                <h3 className="font-semibold">{t('productAdvantages.investmentTypes.fixedRate.title')}</h3>
                                <ul className="list-disc pl-6 space-y-1 mt-1">
                                    {(t('productAdvantages.investmentTypes.fixedRate.points', { returnObjects: true }) as string[]).map((point, index) => (
                                        <li key={`fixed-${index}`}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold">{t('productAdvantages.investmentTypes.floatingRate.title')}</h3>
                                <ul className="list-disc pl-6 space-y-1 mt-1">
                                    {(t('productAdvantages.investmentTypes.floatingRate.points', { returnObjects: true }) as string[]).map((point, index) => (
                                        <li key={`floating-${index}`}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
