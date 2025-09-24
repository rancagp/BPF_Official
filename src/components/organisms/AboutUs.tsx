import { Building, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
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

    const features = [
        'Registered with BAPPEBTI since 2004',
        'Member of Jakarta Futures Exchange',
        '12 operational offices across Indonesia',
        'Professional trading services'
    ] as string[];

    const organizations = [
        { name: "BAPPEBTI", logo: "/assets/logo-bappebti.png", url: "https://bappebti.go.id/" },
        { name: "Otoritas Jasa Keuangan", logo: "/assets/OJK_Logo.png", url: "https://ojk.go.id/id/Default.aspx" },
        { name: "Bank Indonesia", logo: "/assets/BI_Logo.png", url: "https://www.bi.go.id/id/default.aspx" },
        { name: "Jakarta Futures Exchange", logo: "/assets/logo-jfx.png", url: "https://jfx.co.id/" },
        { name: "Kliring Berjangka Indonesia", logo: "/assets/logo-kbi.png", url: "https://www.ptkbi.com/index.php" },
        { name: "Asosiasi Perdagangan Berjangka Komoditi Indonesia", logo: "/assets/logo-aspebtindo.png", url: "https://aspebtindo.org/" }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 text-sm font-semibold text-[#FF0000] bg-[#FF0000]/10 rounded-full mb-4">
                        ABOUT US
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#080031] mb-6">
                        Welcome to <span className="text-[#FF0000]">Bestprofit Futures</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-[#FF0000] mx-auto rounded-full"></div>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12">
                    {/* Mobile Image Section */}
                    <div className="lg:hidden relative h-96 w-full rounded-xl overflow-hidden shadow-xl border-4 border-white">
                        <Image
                            src="/assets/gedung-kpf.png"
                            alt="Bestprofit Futures Office"
                            fill
                            className="object-cover object-center"
                            sizes="100vw"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080031] to-transparent opacity-70"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <div className="bg-[#FF0000] p-3 rounded-lg inline-flex items-center">
                                <CheckCircle className="h-5 w-5 text-white mr-2" />
                                <div>
                                    <p className="text-sm font-semibold">Registered & Supervised</p>
                                    <p className="text-xs opacity-90">BAPPEBTI Member since 2004</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section - Dipindah ke kanan */}
                    <div className="space-y-8 order-2">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-[#080031]">
                                Your Trusted Futures Trading Partner
                            </h3>
                            <div className="space-y-4 text-[#080031]/90 leading-relaxed text-lg">
                                <p>
                                    PT Bestprofit Futures ("BPF") is an official futures brokerage company registered with the Badan Pengawas Perdagangan Berjangka Komoditi (BAPPEBTI) since 2004. Members of PT Bursa Berjangka Jakarta and PT Kliring Berjangka Indonesia (Persero), PT Bestprofit Futures has 12 operational offices in Indonesia.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <h4 className="text-lg font-semibold text-[#080031] mb-4 flex items-center">
                                <Building className="h-5 w-5 text-[#FF0000] mr-2" />
                                Our Presence
                            </h4>
                            <p className="text-[#080031]/80 mb-4">
                                We have established our presence across Indonesia with operational offices in:
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {['Jakarta (2 offices)', 'Bandung', 'Semarang', 'Surabaya', 'Malang', 'Medan', 'Banjarmasin', 'Pontianak', 'Jambi', 'Pekanbaru', 'Bandar Lampung'].map((location, index) => (
                                    <div key={index} className="flex items-start">
                                        <MapPin className="h-5 w-5 text-[#FF0000] mt-0.5 mr-2 flex-shrink-0" />
                                        <span className="text-[#080031]/90">{location}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-2">
                            <Link
                                href="/profil/perusahaan"
                                className="flex items-center justify-center px-8 py-3.5 bg-[#FF0000] hover:bg-[#FF3333] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg lg:inline-flex lg:justify-start"
                            >
                                Learn More About Us
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Image Section - Dipindah ke kiri */}
                    <div className="hidden lg:block order-1">
                        <div className="relative h-full rounded-xl overflow-hidden shadow-xl border-4 border-white">
                            <Image
                                src="/assets/gedung-kpf.png"
                                alt="Bestprofit Futures Office"
                                width={800}
                                height={600}
                                className="object-cover w-full h-full"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080031] to-transparent opacity-70"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <div className="bg-[#FF0000] p-4 rounded-lg inline-flex items-center">
                                    <CheckCircle className="h-6 w-6 text-white mr-3" />
                                    <div>
                                        <p className="font-semibold">Registered & Supervised</p>
                                        <p className="text-sm opacity-90">BAPPEBTI Member since 2004</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Organizations Section */}
                <div className="mt-20 pt-12 border-t border-gray-100">
                    <h2 className="text-2xl font-bold text-center text-[#080031] mb-8 relative">
                        <span className="relative z-10 px-6 py-1 bg-white">
                            Our Partners & Regulators
                        </span>
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {organizations.map((org, index) => (
                            <a 
                                key={index}
                                href={org.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#FF0000]/50 hover:-translate-y-1"
                            >
                                <div className="relative w-48 h-16 mb-4">
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
            </div>
        </section>
    );
}

export default AboutUs;
