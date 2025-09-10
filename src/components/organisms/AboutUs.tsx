import { CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
        <section className="py-12 md:py-18">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#F2AC59] bg-[#F2AC59]/10 rounded-full mb-4">
                        {t('title')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#4C4C4C] mb-4">
                        {t('welcome')} <span className="text-[#F2AC59]">{t('companyName')}</span>
                    </h2>
                    <div className="w-20 h-1 bg-[#F2AC59] mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Image Section */}
                    <div className="relative h-full">
                        <div className="relative h-full rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/assets/gedung-kpf.png"
                                alt="Equityworld Futures Office"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-md max-w-[280px] w-full">
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
                            <h3 className="text-xl font-semibold text-[#4C4C4C]">
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
        </section>
    );
}

export default AboutUs;
