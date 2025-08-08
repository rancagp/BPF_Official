const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    localePath: path.resolve('./public/locales'),
  },
  // Namespace yang digunakan
  ns: ['aboutus', 'common'],
  defaultNS: 'aboutus',
  // Konfigurasi React
  react: {
    useSuspense: false,
  },
  // Hanya reload di development
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  // Debug di development
  debug: process.env.NODE_ENV === 'development',
  // Opsi tambahan
  serializeConfig: false,
  // Preload bahasa yang diperlukan
  preload: ['id', 'en'],
  // Fallback ke bahasa default jika terjemahan tidak ditemukan
  fallbackLng: 'id',
  // Format namespace
  nsSeparator: '.',
  keySeparator: '.',
  // Load semua namespace secara default
  load: 'all',
  // Interpolasi
  interpolation: {
    escapeValue: false, // React sudah melakukan escape
  },
  // Nonaktifkan default locale dalam URL untuk bahasa default
  returnNull: false,
  // Nonaktifkan default locale dalam URL
  trailingSlash: false,
  // Nonaktifkan locale detection bawaan next-i18next
  // karena kita menggunakan bawaan Next.js
  localeDetection: false,
  // Pastikan path ke file terjemahan benar
  localeExtension: 'json',
  // Nonaktifkan default locale dalam path
  localeStructure: '{{lng}}/{{ns}}',
  // Nonaktifkan default locale dalam path
  defaultNS: 'common',
  // Pastikan konfigurasi kompatibel dengan Next.js
  compatibilityJSON: 'v3',
};
