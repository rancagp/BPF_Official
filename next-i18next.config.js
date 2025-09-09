const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  // Disable i18next debug logs
  debug: false,
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    localeDetection: true,
    localePath: path.resolve('./public/locales'),
    localeSubpaths: {
      en: 'en',
      id: 'id'
    }
  },
  
  // Namespace yang digunakan di seluruh aplikasi
  ns: [
    'common', 
    'aboutus', 
    'footer', 
    'produk', 
    'berita',
    'informasi',
    'profil_perusahaan', 
    'market', 
    'pengumuman', 
    'welcome', 
    'legalitas_bisnis', 
    'wakil_pialang', 
    'badan_regulasi', 
    'fasilitas_layanan', 
    'penghargaan', 
    'sertifikat',
    'video', 
    'symbol-indeks',
    'loco-london-gold',
    'hubungi-kami',
    'summer-winter',
    'economic-calendar',
    'historical-data',
    'mekanisme-perdagangan',
    'pivot-fibonacci',
    'prosedur',
    'header',
    'analisis'
  ],
  
  defaultNS: 'common',
  
  // Konfigurasi React
  react: {
    useSuspense: true,
    bindI18n: 'languageChanged loaded',
    bindI18nStore: 'added removed',
    nsMode: 'default'
  },
  
  // Mode development
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  
  // Debug mode
  debug: process.env.NODE_ENV === 'development',
  
  // Interpolation configuration
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  debug: process.env.NODE_ENV === 'development',
  
  // Konfigurasi dasar
  fallbackLng: 'id',
  
  // Pemisah untuk namespace dan key
  nsSeparator: ':',
  keySeparator: '.',
  
  // Pengaturan interpolation
  interpolation: {
    escapeValue: false
  },
  
  // Preload bahasa
  preload: ['id', 'en'],
  
  // Pengaturan tambahan
  saveMissing: true, // Enable missing key logging
  returnObjects: true, // Enable returning objects from translation
  
  // Nonaktifkan deteksi bahasa dari browser
  detection: {
    order: ['path', 'cookie', 'htmlTag'],
    lookupFromPathIndex: 0,
    caches: ['cookie']
  },
  
  // Enable compatibility JSON mode
  compatibilityJSON: 'v3',
  
  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',
  
  // Custom error handling
  react: {
    useSuspense: false,
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'b', 'em']
  }
};
