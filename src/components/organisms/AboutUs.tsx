import { CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Organization = {
  name: string;
  logo: string;
  url?: string;
};

function AboutUs() {
    const { t, i18n, ready } = useTranslation('aboutus');
    const router = useRouter();
    const { locale } = router;
    
    useEffect(() => {
        if (i18n.language !== locale) {
            i18n.changeLanguage(locale);
        }
    }, [locale, i18n]);

    if (!ready) {
        return (
            <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-10 bg-[#9B9FA7]/20 rounded w-1/3 mx-auto"></div>
                        <div className="h-4 bg-[#9B9FA7]/20 rounded w-1/2 mt-4 mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

    const features = t('features', { returnObjects: true }) as string[];

    return (
        <section className="py-12 md:py-2">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#F2AC59] bg-[#F2AC59]/10 rounded-full mb-4">
                        {t('title')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#4C4C4C] mb-4">
                        <div className="block">{t('welcome')}</div>
                        <div className="text-[#4C4C4C]">{t('companyName')}</div>
                    </h2>
                    <div className="w-20 h-1 bg-[#F2AC59] mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* Image Section */}
                    <div className="relative h-80 md:h-auto -mx-4 md:mx-0">
                        <div className="relative w-full h-full md:rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/assets/gedung-kpf.png"
                                alt="Equityworld Futures Office"
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 bg-white p-4 rounded-lg shadow-md w-[calc(100%-3rem)] md:max-w-[280px] mx-4 md:mx-0">
                            <div className="flex items-center">
                                <div className="bg-[#F2AC59]/10 p-2 rounded-lg mr-3">
                                    <CheckCircle className="h-6 w-6 text-[#F2AC59]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#4C4C4C]">{t('since')}</p>
                                    <p className="text-xs text-[#4C4C4C]/70">{t('member')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-fsxl font-semibold text-[#4C4C4C]">
                                {t('trustedPartner')}
                            </h3>
                            <div className="space-y-4 text-[#4C4C4C]/90 leading-relaxed">
                                <p>{t('aboutText')}</p>
                                <p>{t('aboutText2')}</p>
                            </div>
                        </div>

                        <div className="bg-[#F9FAFB] p-5 rounded-xl">
                            <h4 className="font-medium text-[#4C4C4C] mb-3">
                                {t('featuresTitle')}
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-[#F2AC59] mt-0.5 mr-2 flex-shrink-0" />
                                        <span className="text-sm text-[#4C4C4C]">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-2 flex justify-center">
                            <Link 
                                href="/profil/perusahaan" 
                                className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-[#F2AC59] to-[#e09c4a] hover:from-[#e09c4a] hover:to-[#d08b3a] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                {t('learnMore')}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
                {/* Section 1: Berizin dan Diawasi */}
                <div className="mt-12">
                    <h2 className="text-xl font-bold text-center text-[#4C4C4C] mb-6 relative">
                        <span className="relative z-10 px-3 bg-white">
                            {t('supervisedTitle', 'Berizin dan Diawasi')}
                        </span>
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { name: "BAPPEBTI", logo: "/assets/logo-bappebti.png", url: "https://bappebti.go.id/" },
                            { name: "Otoritas Jasa Keuangan", logo: "/assets/OJK_Logo.png", url: "https://ojk.go.id/id/Default.aspx" },
                            { name: "Bank Indonesia", logo: "/assets/BI_Logo.png", url: "https://www.bi.go.id/id/default.aspx" }
                        ].map((org: Organization, index: number) => (
                            <a 
                                key={`supervised-${index}`}
                                href={org.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[#F2AC59]/30"
                            >
                                <div className="relative w-32 h-16 mb-2">
                                    <Image 
                                        src={org.logo} 
                                        alt={org.name}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Section 2: Anggota Dari */}
                <div className="mt-10 mb-6">
                    <h2 className="text-xl font-bold text-center text-[#4C4C4C] mb-6 relative">
                        <span className="relative z-10 px-3 bg-white">
                            {t('memberOfTitle', 'Anggota Dari')}
                        </span>
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { name: "Jakarta Futures Exchange", logo: "/assets/logo-jfx.png", url: "https://jfx.co.id/" },
                            { name: "Kliring Berjangka Indonesia", logo: "/assets/logo-kbi.png", url: "https://www.ptkbi.com/index.php" },
                            { name: "Asosiasi Perdagangan Berjangka Komoditi Indonesia", logo: "/assets/logo-aspebtindo.png", url: "https://aspebtindo.org/" }
                        ].map((org: Organization, index: number) => (
                            <a 
                                key={`member-${index}`}
                                href={org.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[#F2AC59]/30"
                            >
                                <div className="relative w-32 h-16">
                                    <Image 
                                        src={org.logo} 
                                        alt={org.name}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
        </section>
    );
}

export default AboutUs;
