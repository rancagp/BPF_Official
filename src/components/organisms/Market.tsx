import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const LastUpdatedTime = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const { t } = useTranslation('market');
  
  useEffect(() => {
    // Update waktu hanya di sisi klien
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID'));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (!currentTime) return null;
  
  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-500">
        {t('lastUpdated')} {currentTime}
      </p>
    </div>
  );
};

type Direction = 'up' | 'down' | 'neutral';

interface MarketItem {
  symbol: string;
  last: number;
  percentChange: number;
  direction?: Direction;
}

const MarketCard = ({ item, index }: { item: MarketItem; index: number }) => {
  const isPositive = item.percentChange >= 0;
  const [currentTime, setCurrentTime] = useState<string>('');
  
  useEffect(() => {
    // Update waktu hanya di sisi klien
    setCurrentTime(new Date().toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }));
    
    // Update waktu setiap menit
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatPrice = (symbol: string, price: number): string => {
    if (symbol.includes('IDR')) return `Rp${price.toLocaleString('id-ID')}`;
    if (symbol.includes('USD')) return `$${price.toLocaleString('en-US')}`;
    return price.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className={`relative bg-white rounded-xl p-5 border ${
        isPositive ? 'border-green-100' : 'border-red-100'
      } overflow-hidden transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-sm font-medium text-gray-500">{item.symbol}</span>
          <h3 className="text-xl font-bold text-gray-900 mt-1">
            {formatPrice(item.symbol, item.last)}
          </h3>
        </div>
        
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
          isPositive ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <svg
            className={`w-5 h-5 ${isPositive ? 'text-green-500' : 'text-red-500'} ${
              isPositive ? 'rotate-0' : 'rotate-180'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isPositive ? '↑' : '↓'} {Math.abs(item.percentChange).toFixed(2)}%
        </span>
        
        {currentTime && (
          <span className="text-xs text-gray-400">
            {currentTime}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default function Market() {
  const [marketData, setMarketData] = useState<MarketItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const prevDataRef = useRef<MarketItem[]>([]);
  const { t } = useTranslation('market');

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const res = await fetch('/api/market');
        
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error ${res.status}: ${res.statusText || t('errorFetching')}`);
        }

        const data = await res.json();
        
        // Pastikan data adalah array
        if (!Array.isArray(data)) {
          throw new Error(t('invalidDataFormat'));
        }

        // Proses data
        const processedData = data.map((item: any) => ({
          symbol: item.symbol || '',
          last: Number(item.last) || 0,
          percentChange: Number(item.percentChange) || 0
        }));

        // Tambahkan arah berdasarkan data sebelumnya
        const dataWithDirection = processedData.map((item: MarketItem) => {
          const prevItem = prevDataRef.current.find(prev => prev.symbol === item.symbol);
          let direction: Direction = 'neutral';
          
          if (prevItem) {
            if (item.last > prevItem.last) direction = 'up';
            else if (item.last < prevItem.last) direction = 'down';
          }
          
          return { ...item, direction };
        });
        
        setMarketData(dataWithDirection);
        prevDataRef.current = dataWithDirection;
        setErrorMessage('');
      } catch (error: any) {
        console.error('Error:', error);
        setErrorMessage(error.message || t('error'));
      } finally {
        setIsLoading(false);
      }
    };

    // Ambil data pertama kali
    fetchMarketData();
    
    // Atur polling setiap 5 detik
    const intervalId = setInterval(fetchMarketData, 5000);
    
    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {t('title')}
          </h2>
          <div className="mt-2 h-1 w-16 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : errorMessage ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{errorMessage}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {t('reload', 'Muat Ulang')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <AnimatePresence>
              {marketData.map((item, index) => (
                <MarketCard key={`${item.symbol}-${index}`} item={item} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}
        
        <LastUpdatedTime />
      </div>
    </section>
  );
}
