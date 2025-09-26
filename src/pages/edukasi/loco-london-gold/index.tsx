import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

interface LocoLondonGoldTranslations {
  title: string;
  pageTitle: string;
  intro: {
    p1: string;
    p2: string;
  };
  sejarah: {
    title: string;
    p1: string;
    p2: string;
    otc: {
      title: string;
      content: string;
    };
    investasi: {
      title: string;
      points: string[];
    };
  };
  mekanisme: {
    title: string;
    p1: string;
    p2: string;
    points: string[];
  };
  keuntungan: {
    title: string;
    points: string[];
  };
  resiko: {
    title: string;
    content: string;
    points: string[];
  };
  analisis: {
    title: string;
    intro: string;
    factors: Array<{
      title: string;
      content: string;
    }>;
  };
  derivatif: {
    title: string;
    content: string;
  };
  footerNote: string;
}

interface PageProps {
  _nextI18Next?: {
    initialI18nStore: any;
    initialLocale: string;
    ns: string[];
    userConfig: any;
  };
  ns: string;
}

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  const ns = 'loco-london-gold';
  const namespaces = [ns, 'common', 'footer'];
  
  try {
    return {
      props: {
        ...(await serverSideTranslations(locale, namespaces, null, ['id', 'en'])),
        ns,
      },
      revalidate: 60 * 60 * 24, // Revalidate every 24 hours
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'], null, ['id', 'en'])),
        ns,
        error: 'Failed to load translations',
      },
    };
  }
};

const LocoLondonGoldPage: React.FC<PageProps> = ({ ns }) => {
  const { t, i18n, ready } = useTranslation(ns);
  const router = useRouter();
  
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Handle translations loading and errors
  useEffect(() => {
    if (!router.isReady) return;
    
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        
        // Check if translations are available
        if (!i18n.hasResourceBundle(i18n.language, ns)) {
          throw new Error(`No translations found for namespace: ${ns}`);
        }
        
        // Check if required translations exist
        if (!t('title') || !t('intro.p1')) {
          throw new Error('Required translations are missing');
        }
        
        setError(null);
      } catch (err) {
        console.error('Error loading translations:', err);
        setError('Gagal memuat terjemahan. Silakan refresh halaman.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTranslations();
  }, [i18n, ns, router.isReady, t]);
  
  // Get translation with fallback
  const getTranslation = (key: string, fallback: string = '') => {
    try {
      return t(key) || fallback;
    } catch (err) {
      console.warn(`Translation error for key: ${key}`, err);
      return fallback;
    }
  };
  
  // Get array translation with fallback to empty array
  const getArrayTranslation = (key: string): any[] => {
    try {
      const result = t(key, { returnObjects: true });
      return Array.isArray(result) ? result : [];
    } catch (err) {
      console.warn(`Array translation error for key: ${key}`, err);
      return [];
    }
  };
  
  // Build data object with safe access to translations
  const data: LocoLondonGoldTranslations = {
    title: getTranslation('title', 'Loco London Gold'),
    pageTitle: getTranslation('pageTitle', 'Loco London Gold - PT. Kresna Berjangka Investama'),
    intro: {
      p1: getTranslation('intro.p1', 'Emas merupakan salah satu jenis komoditi yang paling banyak diminati untuk tujuan investasi.'),
      p2: getTranslation('intro.p2', 'Permintaan emas fisik mengalami peningkatan cukup signifikan dari tahun ke tahun.')
    },
    sejarah: {
      title: getTranslation('sejarah.title', 'A. Sejarah Perdagangan Emas'),
      p1: getTranslation('sejarah.p1', 'Di dalam pasar komoditas istilah "Loco" berarti "di".'),
      p2: getTranslation('sejarah.p2', 'Pasar emas fisik (spot gold) terbesar dunia adalah London dan Zurich.'),
      otc: {
        title: getTranslation('sejarah.otc.title', 'Perdagangan Over-the-Counter (OTC)'),
        content: getTranslation('sejarah.otc.content', 'Pasar emas London merupakan pasar Over-The-Counter yang berarti perdagangan dilakukan secara langsung antara dua pihak yang terlibat.')
      },
      investasi: {
        title: getTranslation('sejarah.investasi.title', 'Mengapa berinvestasi di emas (Spot OTC)'),
        points: getArrayTranslation('sejarah.investasi.points')
      }
    },
    mekanisme: {
      title: getTranslation('mekanisme.title', 'B. Mekanisme Perdagangan Emas Loco London'),
      p1: getTranslation('mekanisme.p1', 'Perdagangan emas Loco-London di Indonesia diatur oleh Bappebti.'),
      p2: getTranslation('mekanisme.p2', 'Berikut adalah mekanisme perdagangan emas Loco-London di Indonesia:'),
      points: getArrayTranslation('mekanisme.points')
    },
    keuntungan: {
      title: getTranslation('keuntungan.title', 'C. Keuntungan Berinvestasi di Emas Loco London'),
      points: getArrayTranslation('keuntungan.points')
    },
    resiko: {
      title: getTranslation('resiko.title', 'D. Resiko Investasi Emas Loco London'),
      content: getTranslation('resiko.content', 'Seperti halnya instrumen investasi lainnya, investasi emas Loco London juga memiliki resiko yang perlu diperhatikan, antara lain:'),
      points: getArrayTranslation('resiko.points')
    },
    analisis: {
      title: getTranslation('analisis.title', 'E. Analisis Harga Emas'),
      intro: getTranslation('analisis.intro', 'Pada kenyataannya, harga emas tidak hanya tergantung pada permintaan dan penawaran, tetapi juga dipengaruhi oleh situasi perekonomian secara keseluruhan.'),
      factors: getArrayTranslation('analisis.factors')
    },
    derivatif: {
      title: getTranslation('derivatif.title', 'F. Kontrak Derivatif Emas Loco London (SPA)'),
      content: getTranslation('derivatif.content', 'Kontrak derivatif emas Loco London menjadi objek transaksi melalui Sistem Perdagangan Alternatif (SPA).')
    },
    footerNote: getTranslation('footerNote', '') || ''
  };
  
  // Handle loading and error states
  if (!ready || isLoading) {
    return (
      <PageTemplate title="Loading...">
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF0000] mb-4"></div>
          <p className="text-gray-600">Memuat halaman...</p>
        </div>
      </PageTemplate>
    );
  }

  if (error) {
    return (
      <PageTemplate title="Error">
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full max-w-md">
            <p className="font-bold">Terjadi Kesalahan</p>
            <p className="mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#FF0000] hover:bg-[#E60000] text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      </PageTemplate>
    );
  }
  
  // Error state
  if (error || !data) {
    return (
      <PageTemplate title="Error">
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error loading content</h1>
          <p className="text-gray-700">Failed to load translations. Please try refreshing the page.</p>
          {error && <p className="mt-2 text-sm text-gray-500">Error: {error}</p>}
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate title={data.pageTitle}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={data.title}>
          <div className="space-y-10 text-[#000000]">
            {/* Intro Section */}
            <div className="bg-white p-8 rounded-xl border border-[#E5E7EB] text-[#000000] space-y-4 text-justify leading-relaxed shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="text-lg">{data.intro.p1}</p>
              <p className="text-lg">{data.intro.p2}</p>
            </div>

            {/* Sejarah Section */}
            <section>
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-[#000000] mr-2">{data.sejarah.title}</h2>
                <div className="w-10 h-1 bg-[#FF0000]"></div>
              </div>
              <div className="space-y-6 text-[#4C4C4D]">
                <p>{data.sejarah.p1}</p>
                <p>{data.sejarah.p2}</p>
                
                <div className="bg-white p-8 rounded-xl border border-[#E5E7EB] mt-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-[#000000] mb-4 flex items-center">{data.sejarah.otc.title}</h3>
                  <p>{data.sejarah.otc.content}</p>
                </div>

                <div className="bg-white p-8 rounded-xl border-2 border-[#FF0000] mt-8 shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-xl font-semibold text-[#000000] mb-4 flex items-center">{data.sejarah.investasi.title}</h3>
                  <ul className="list-disc list-inside space-y-3 text-[#000000] pl-5 text-justify">
                    {data.sejarah.investasi.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Mekanisme Section */}
            <section>
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-[#000000] mr-2">{data.mekanisme.title}</h2>
                <div className="w-10 h-1 bg-[#FF0000]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-[#000000]">{data.mekanisme.p1}</p>
                <p className="text-[#000000]">{data.mekanisme.p2}</p>
                <ul className="list-disc list-inside space-y-3 text-[#4C4C4D] pl-5 text-justify">
                  {data.mekanisme.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Keuntungan Section */}
            <section>
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-[#000000] mr-2">{data.keuntungan.title}</h2>
                <div className="w-10 h-1 bg-[#FF0000]"></div>
              </div>
              <ul className="list-disc list-inside space-y-3 text-[#4C4C4D] pl-5 text-justify">
                {data.keuntungan.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </section>

            {/* Resiko Section */}
            <section>
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-[#000000] mr-2">{data.resiko.title}</h2>
                <div className="w-10 h-1 bg-[#FF0000]"></div>
              </div>
              <div className="space-y-4">
                <p className="text-[#000000]">{data.resiko.content}</p>
                <ul className="list-disc list-inside space-y-3 text-[#4C4C4D] pl-5 text-justify">
                  {data.resiko.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Analisis Harga Emas Section */}
            <section>
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-[#000000] mr-2">{data.analisis.title}</h2>
                <div className="w-10 h-1 bg-[#FF0000]"></div>
              </div>
              <p className="text-[#4C4C4D] mb-6">{data.analisis.intro}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {data.analisis.factors.map((factor, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl border border-[#E5E7EB] hover:border-[#FF0000] hover:shadow-md transition-all duration-300 h-full flex flex-col">
                    <h4 className="font-bold text-lg mb-3 text-[#000000] flex items-center">{factor.title}</h4>
                    <p className="text-[#000000] flex-grow">{factor.content}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Kontrak Derivatif Section */}
            <section>
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-[#000000] mr-2">{data.derivatif.title}</h2>
                <div className="w-10 h-1 bg-[#FF0000]"></div>
              </div>
              <div className="bg-white p-8 rounded-xl border border-[#E5E7EB] hover:shadow-md transition-shadow duration-300">
                <p className="text-[#4C4C4D] leading-relaxed">{data.derivatif.content}</p>
              </div>
            </section>

            <p className="text-sm italic text-[#666666] text-center border-t border-[#E5E7EB] mt-12 pt-8">
              {data.footerNote}
            </p>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
};

export default LocoLondonGoldPage;
