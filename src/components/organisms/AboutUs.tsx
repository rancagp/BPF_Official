import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Daftar fitur sudah tidak digunakan karena akan ditulis langsung

function AboutUs() {
    const { t, i18n, ready } = useTranslation('aboutus');
    const router = useRouter();
    const { locale } = router;
    
    // Sinkronkan i18n.language dengan locale dari router
    useEffect(() => {
        if (i18n.language !== locale) {
            i18n.changeLanguage(locale);
        }
    }, [locale, i18n]);

    // Dapatkan semua terjemahan dengan fallback
    const getTranslation = (key: string, fallback: string) => {
        return t(key, { ns: 'aboutus', defaultValue: fallback });
    };

    // Tampilkan loading jika i18n belum siap
    if (!ready) {
        return (
            <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mt-4 mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Dapatkan terjemahan
    const translations = {
      title: getTranslation('title', 'Tentang Kami'),
      description: getTranslation('description', 'Kami adalah perusahaan terkemuka di industri ini'),
      welcome: getTranslation('welcome', 'Selamat Datang di'),
      companyName: getTranslation('companyName', 'KONTAKPERKASA FUTURES'),
      aboutText: getTranslation('aboutText', 'PT. Kontakperkasa Futures, selamat anggota dari Bursa Berjangka Jakarta dan anggota Kliring Berjangka Indonesia, berbekal pengalaman dan kemampuan dalam mengembangkan perdagangan berjangka komoditi di tanah air.'),
      learnMore: getTranslation('learnMore', 'Pelajari Lebih Lanjut'),
      features: {
        derivative: getTranslation('features.derivative', 'Layanan transaksi derivatif indeks saham yang lengkap'),
        team: getTranslation('features.team', 'Didukung oleh tim profesional yang berpengalaman'),
        platform: getTranslation('features.platform', 'Platform trading yang canggih dan aman')
      }
    };
    
    // Destructure untuk memudahkan penggunaan
    const { title, description, welcome: welcomeText, companyName, aboutText, learnMore, features } = translations;

    return (
        <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        {title}
                    </h2>
                    <div className="mt-2 h-1 w-24 bg-green-600 mx-auto"></div>
                </div>
                
                <div className="text-center mb-8">
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative rounded-lg overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105">
                        <img
                            src="/assets/gedung-kpf.png"
                            alt="Kontakperkasa Futures"
                            className="w-full h-auto rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <p className="text-white text-sm">{t('headOffice', 'Kantor Pusat Kontakperkasa Futures')}</p>
                        </div>
                    </div>

                    {/* Konten */}
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {welcomeText} <span className="text-green-600">{companyName}</span>
                        </h1>
                        
                        <p className="text-gray-600 leading-relaxed">
                            {aboutText}
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="ml-3 text-gray-700">
                                    {features.derivative}
                                </p>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="ml-3 text-gray-700">
                                    {features.team}
                                </p>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="ml-3 text-gray-700">
                                    {features.platform}
                                </p>
                            </div>
                        </div>
                        
                        <div className="pt-4">
                            <Link 
                                href="/profil/perusahaan" 
                                className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-800"
                                locale={router.locale}
                            >
                                {learnMore}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
