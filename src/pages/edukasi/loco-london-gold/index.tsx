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
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-4"></div>
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
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
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
          <div className="space-y-16">
            {/* Intro Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-700 space-y-4">
              <p>{data.intro.p1}</p>
              <p>{data.intro.p2}</p>
            </div>

            {/* Sejarah Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.sejarah.title}</h2>
              <div className="w-20 h-1 bg-green-500 mb-6"></div>
              <div className="space-y-4 text-gray-700">
                <p>{data.sejarah.p1}</p>
                <p>{data.sejarah.p2}</p>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{data.sejarah.otc.title}</h3>
                  <p>{data.sejarah.otc.content}</p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200 mt-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">{data.sejarah.investasi.title}</h3>
                  <ul className="list-disc list-inside space-y-2 text-green-900 pl-5">
                    {data.sejarah.investasi.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Mekanisme Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.mekanisme.title}</h2>
              <div className="w-20 h-1 bg-green-500 mb-6"></div>
              <div className="space-y-6">
                <p className="text-gray-700">{data.mekanisme.p1}</p>
                <p className="text-gray-700">{data.mekanisme.p2}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 pl-5">
                  {data.mekanisme.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Keuntungan Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.keuntungan.title}</h2>
              <div className="w-20 h-1 bg-green-500 mb-6"></div>
              <ul className="list-disc list-inside space-y-2 text-gray-700 pl-5">
                {data.keuntungan.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </section>

            {/* Resiko Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.resiko.title}</h2>
              <div className="w-20 h-1 bg-green-500 mb-6"></div>
              <div className="space-y-4">
                <p className="text-gray-700">{data.resiko.content}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 pl-5">
                  {data.resiko.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Analisis Harga Emas Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.analisis.title}</h2>
              <div className="w-20 h-1 bg-green-500 mb-6"></div>
              <p className="text-gray-700">{data.analisis.intro}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {data.analisis.factors.map((factor, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md border">
                    <h4 className="font-bold text-lg mb-2">{factor.title}</h4>
                    <p className="text-sm text-gray-600">{factor.content}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Kontrak Derivatif Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.derivatif.title}</h2>
              <div className="w-20 h-1 bg-green-500 mb-6"></div>
              <p className="text-gray-700">{data.derivatif.content}</p>
            </section>

            <p className="text-sm italic text-gray-500 text-center pt-8">
              {data.footerNote}
            </p>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
};

export default LocoLondonGoldPage;
