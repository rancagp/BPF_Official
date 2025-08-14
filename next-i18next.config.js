const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    localeDetection: true,
    localePath: path.resolve('./public/locales')
  },
  
  // Namespace yang digunakan
  ns: ['common', 'aboutus', 'footer'],
  defaultNS: 'aboutus',
  
  // Konfigurasi React
  react: {
    useSuspense: false
  },
  
  // Mode development
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
  
  // Konfigurasi dasar
  fallbackLng: 'id',
  
  // Pemisah untuk namespace dan key
  nsSeparator: '::',
  keySeparator: '.',
  
  // Pengaturan interpolation
  interpolation: {
    escapeValue: false
  },
  
  // Preload bahasa
  preload: ['id', 'en'],
  
  // Pengaturan tambahan
  saveMissing: false,
  returnObjects: false,
  
  // Nonaktifkan deteksi bahasa dari browser
  detection: {
    order: ['path'],
    lookupFromPathIndex: 0,
    caches: []
  }
};
