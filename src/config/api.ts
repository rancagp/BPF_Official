// Konfigurasi API
const API_CONFIG = {
  // Gunakan URL lengkap ke backend Laravel
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  // Timeout untuk request (dalam milidetik)
  TIMEOUT: 10000,
};

export default API_CONFIG;
