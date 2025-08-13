const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    localeDetection: false,
    localePath: path.resolve('./public/locales'),
  },
  // Daftar namespace yang digunakan
  ns: ['common', 'aboutus'],
  defaultNS: 'common',
  
  // Konfigurasi React
  react: {
    useSuspense: true,
  },
  
  // Mode development
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
  
  // Konfigurasi dasar
  serializeConfig: true,
  preload: ['id', 'en'],
  fallbackLng: 'id',
  
  // Pemisah untuk namespace dan key
  nsSeparator: '.',
  keySeparator: '_',
  
  // Pengaturan loading
  load: 'all',
  
  // Pastikan semua namespace dimuat
  initImmediate: false,
  
  // Nonaktifkan debug untuk menghindari log yang berlebihan
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
  trailingSlash: false,
  localeExtension: 'json',
  localeStructure: '{{lng}}/{{ns}}',
  compatibilityJSON: 'v3',
  // Pastikan locale selalu ada di URL untuk non-default
  localeSubpaths: {
    en: 'en'
  },
  // Pastikan URL selalu memiliki locale untuk non-default
  defaultNS: 'common',
  localePath: path.resolve('./public/locales'),
  // Nonaktifkan deteksi browser language
  detection: {
    order: ['path', 'cookie', 'htmlTag'],
    caches: ['cookie'],
  },
  // Selalu gunakan subpath untuk bahasa non-default
  use: [],
  initImmediate: false,
  // Pastikan tidak ada redirect otomatis
  saveMissing: false,
  saveMissingTo: 'all',
  missingKeyHandler: false,
  // Nonaktifkan fallback ke default locale
  nonExplicitSupportedLngs: false,
  // Pastikan tidak ada redirect yang tidak diinginkan
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  // Pastikan URL selalu konsisten
  cleanCode: true,
  // Nonaktifkan deteksi bahasa dari browser
  ignoreRoutes: ['/_next/', '/static/', '/public/', '/api/'],
};
