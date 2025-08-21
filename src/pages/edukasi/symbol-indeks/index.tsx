import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

// Define types for our data
interface SymbolIndexItem {
  symbol: string;
  description: string;
}

interface MonthItem {
  code: string;
  month: string;
}

interface SymbolIndexData {
  title: string;
  pageTitle: string;
  contractMonthSymbol: string;
  symbolIndexData: SymbolIndexItem[];
  hangSengMonths: MonthItem[];
  nikkeiMonths: MonthItem[];
  futures: {
    hangSeng: string;
    nikkei225: string;
  };
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'id', ['symbol-indeks', 'common', 'footer'])),
  },
});

const SymbolIndeksPage = () => {
  const { t, i18n } = useTranslation('symbol-indeks');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<SymbolIndexData>({
    title: '',
    pageTitle: '',
    contractMonthSymbol: '',
    symbolIndexData: [],
    hangSengMonths: [],
    nikkeiMonths: [],
    futures: { hangSeng: '', nikkei225: '' }
  });

  useEffect(() => {
    try {
      // Pastikan terjemahan sudah dimuat
      if (i18n.isInitialized) {
        const translatedData = {
          title: t('title'),
          pageTitle: t('pageTitle'),
          contractMonthSymbol: t('contractMonthSymbol'),
          symbolIndexData: t('symbolIndexData', { returnObjects: true }) as SymbolIndexItem[],
          hangSengMonths: t('hangSengMonths', { returnObjects: true }) as { code: string; month: string }[],
          nikkeiMonths: t('nikkeiMonths', { returnObjects: true }) as { code: string; month: string }[],
          futures: t('futures', { returnObjects: true }) as { hangSeng: string; nikkei225: string }
        };
        setData(translatedData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error loading translations:', error);
      console.log('Current language:', i18n.language);
      console.log('Available namespaces:', i18n.options.ns);
      setIsLoading(false);
    }
  }, [i18n, t]);

  if (isLoading) {
    return (
      <PageTemplate title="Loading...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </PageTemplate>
    );
  }

  const { symbolIndexData, hangSengMonths, nikkeiMonths, futures } = data;

  return (
    <PageTemplate title={t('pageTitle')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('title')}>
          <div className="space-y-12">
            {/* Symbol Index Section */}
            <div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {Array.isArray(symbolIndexData) && symbolIndexData.map((item: SymbolIndexItem) => (
                  <li key={item.symbol}>
                    <span className="font-semibold text-gray-800">{item.symbol}</span>: {item.description}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contract Month Symbol Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('contractMonthSymbol')}
              </h2>
              <div className="w-20 h-1 bg-green-500 mb-6"></div>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {futures.hangSeng}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {Array.isArray(hangSengMonths) && hangSengMonths.map((item: MonthItem) => (
                      <li key={item.code}>
                        <span className="font-semibold text-gray-800">{item.code}</span>: {item.month}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {futures.nikkei225}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {Array.isArray(nikkeiMonths) && nikkeiMonths.map((item: MonthItem) => (
                      <li key={item.code}>
                        <span className="font-semibold text-gray-800">{item.code}</span>: {item.month}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
};

export default SymbolIndeksPage;
