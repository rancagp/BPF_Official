import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { pathname, asPath, query } = router;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Pastikan komponen sudah di-mount di client
    setIsClient(true);
  }, []);

  const changeLanguage = (locale: string) => {
    // Update URL dengan locale baru
    router.push({ pathname, query }, asPath, { locale, scroll: false });
  };

  // Tampilkan loading sederhana di server
  if (!isClient) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-12 bg-gray-200 rounded-md animate-pulse"></div>
        <span className="text-gray-400">|</span>
        <div className="h-8 w-12 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => changeLanguage('id')}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          i18n.language === 'id' 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        disabled={i18n.language === 'id'}
      >
        ID
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          i18n.language === 'en' 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        disabled={i18n.language === 'en'}
      >
        EN
      </button>
    </div>
  );
}
