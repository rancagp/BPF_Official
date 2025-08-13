import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { pathname, asPath, query } = router;
  const [isClient, setIsClient] = useState(false);
  const currentLocale = i18n.language;

  useEffect(() => {
    // Pastikan komponen sudah di-mount di client
    setIsClient(true);
  }, []);

  const changeLanguage = async (newLocale: string) => {
    // Jangan lakukan apa-apa jika locale sama
    if (newLocale === currentLocale) return;
    
    // Dapatkan path saat ini tanpa locale prefix
    let cleanPath = asPath;
    if (currentLocale) {
      const localeRegex = new RegExp(`^\/${currentLocale}(\/|$)`);
      cleanPath = asPath.replace(localeRegex, '/') || '/';
    }
    
    // Buat path baru berdasarkan locale yang dipilih
    let newPath = cleanPath;
    
    // Tambahkan prefix locale untuk non-default language
    if (newLocale !== 'id') {
      newPath = `/${newLocale}${cleanPath === '/' ? '' : cleanPath}`;
    }
    
    // Pastikan path tidak diawali dengan double slash
    newPath = newPath.replace(/^\/\//, '/');
    
    try {
      // Update URL dengan locale baru
      await router.push(
        newPath,
        undefined,
        { locale: newLocale, scroll: false }
      );
      
      // Update bahasa di i18n
      await i18n.changeLanguage(newLocale);
    } catch (error) {
      console.error('Error changing language:', error);
    }
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
