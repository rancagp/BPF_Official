// Konfigurasi API
const API_CONFIG = {
  // Gunakan URL lengkap ke backend Laravel
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://ewf-admin.newsmaker.id',
  // Timeout untuk request (dalam milidetik)
  TIMEOUT: 10000,
  // Endpoints
  ENDPOINTS: {
    SPA: '/api/spa',
    JFX: '/api/jfx',
    BANNERS: '/api/banners',
    ANNOUNCEMENTS: '/api/announcements',
  },
};

export default API_CONFIG;
