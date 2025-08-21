'use client';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentLang = i18n.language === 'id' ? 'ID' : 'EN';
  
  // Toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  
  // Handle klik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const changeLanguage = async (newLocale: string) => {
    if (newLocale === i18n.language) {
      closeDropdown();
      return;
    }
    
    const { asPath } = router;
    const currentLocale = i18n.language;
    
    // Dapatkan path saat ini tanpa locale prefix
    let cleanPath = asPath;
    if (currentLocale) {
      const localeRegex = new RegExp(`^\/${currentLocale}(\/|$)`);
      cleanPath = asPath.replace(localeRegex, '/') || '/';
    }
    
    // Buat path baru berdasarkan locale yang dipilih
    let newPath = cleanPath;
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
      closeDropdown();
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  // Tampilkan loading sederhana di server
  if (typeof window === 'undefined') {
    return (
      <div className="relative w-16">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-16 px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500"
      >
        {currentLang}
        <svg 
          className={`w-3 h-3 ml-1 text-green-600 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 20 20"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-[60] w-32 mt-1 bg-white rounded-md shadow-lg border border-gray-200">
          <div className="py-1">
            <button
              onClick={() => changeLanguage('id')}
              className={`w-full text-left px-3 py-2 text-sm ${
                i18n.language === 'id' 
                  ? 'bg-green-50 text-green-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Indonesian
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`w-full text-left px-3 py-2 text-sm ${
                i18n.language === 'en' 
                  ? 'bg-green-50 text-green-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              English
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
