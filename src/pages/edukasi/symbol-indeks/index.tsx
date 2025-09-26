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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0000]"></div>
        </div>
      </PageTemplate>
    );
  }

  const { symbolIndexData, hangSengMonths, nikkeiMonths, futures } = data;

  return (
    <PageTemplate title={t('pageTitle')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('title')}>
          <div className="space-y-10 text-[#000000]">
            {/* Symbol Index Section */}
            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-[#000000] mr-2">
                  {t('symbolIndexTitle')}
                </h2>
                <div className="w-10 h-1 bg-[#FF0000]"></div>
              </div>
              <div className="space-y-3">
                {Array.isArray(symbolIndexData) && symbolIndexData.map((item: SymbolIndexItem) => (
                  <div key={item.symbol} className="flex items-start">
                    <span className="font-semibold text-[#080031] w-24 flex-shrink-0">{item.symbol}</span>
                    <span className="text-[#000000]">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract Month Symbol Section */}
            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-semibold text-[#000000] mr-2">
                  {t('contractMonthSymbol')}
                </h2>
                <div className="w-10 h-1 bg-[#FF0000]"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded-lg border border-[#E5E7EB] hover:border-[#FF0000] transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-[#000000] mb-4 pb-2 border-b-2 border-[#FF0000]">
                    {futures.hangSeng}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Array.isArray(hangSengMonths) && hangSengMonths.map((item: MonthItem) => (
                      <div key={item.code} className="flex items-center">
                        <span className="font-medium text-[#080031] w-12">{item.code}</span>
                        <span className="text-[#000000]">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#E5E7EB] hover:border-[#FF0000] transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-[#000000] mb-4 pb-2 border-b-2 border-[#FF0000]">
                    {futures.nikkei225}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Array.isArray(nikkeiMonths) && nikkeiMonths.map((item: MonthItem) => (
                      <div key={item.code} className="flex items-center">
                        <span className="font-medium text-[#080031] w-12">{item.code}</span>
                        <span className="text-[#000000]">{item.month}</span>
                      </div>
                    ))}
                  </div>
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
