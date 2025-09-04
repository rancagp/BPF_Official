import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { KategoriWakilPialang, fetchKategoriWakilPialang } from '@/services/kategoriWakilPialangService';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface WakilPialangSectionProps {
  limit?: number;
  showHeader?: boolean;
  className?: string;
}

export default function WakilPialangSection({
  className = '',
  limit = 6,
  showHeader = true
}: WakilPialangSectionProps) {
  const { t } = useTranslation('wakil_pialang');
  const router = useRouter();
  const [kota, setKota] = useState<KategoriWakilPialang[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadKota = async () => {
      try {
        setIsLoading(true);
        const data = await fetchKategoriWakilPialang();
        // Batasi jumlah data yang ditampilkan sesuai dengan limit
        setKota(data.slice(0, limit));
        setError(null);
      } catch (err) {
        console.error('Error loading kategori wakil pialang:', err);
        setError(t('errorText', 'Gagal memuat data. Silakan coba lagi nanti.'));
      } finally {
        setIsLoading(false);
      }
    };

    loadKota();
  }, [limit]);

  if (isLoading) {
    return (
      <div className={`${className} py-12`}>
        {showHeader && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-1 bg-gray-200 rounded w-24 mx-auto mb-6"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-1/3 mx-auto"></div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-40 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} py-12 text-center`}>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('pageTitle', 'Wakil Pialang')}
            </h2>
            <div className="w-24 h-1 bg-green-600 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('pageDescription', 'Daftar wakil pialang berjangka PT Kontakperkasa Futures di berbagai kota di Indonesia')}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kota.map((item) => (
            <Link 
              key={item.id} 
              href={`/profil/wakil-pialang/${item.slug}`}
              className="block group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-green-100 hover:bg-gradient-to-br hover:from-white hover:to-green-50 transition-all duration-300 h-full">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 mr-4 group-hover:bg-green-100 group-hover:scale-110 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                    {item.nama_kategori}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-600 transition-colors">
                    {t('viewAllText', 'Lihat Semua')}
                  </p>
                </div>
                <div className="ml-4 text-gray-300 group-hover:text-green-500 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
