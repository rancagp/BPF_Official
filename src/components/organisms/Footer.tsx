import React from "react";
import { useTranslation } from 'next-i18next';

// Ikon SVG inline
interface IconProps extends React.SVGProps<SVGSVGElement> {}

const Icons = {
    Warning: (props: IconProps) => (
        <svg {...props} className="h-6 w-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    Home: (props: IconProps) => (
        <svg {...props} className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    ),
    Cube: (props: IconProps) => (
        <svg {...props} className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    ),
    Envelope: (props: IconProps) => (
        <svg {...props} className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    MapPin: (props: IconProps) => (
        <svg {...props} className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    Phone: (props: IconProps) => (
        <svg {...props} className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
    ),
    Document: (props: IconProps) => (
        <svg {...props} className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    )
};

const Footer = () => {
    const { t } = useTranslation('footer');
    const [isClient, setIsClient] = React.useState(false);
    const currentYear = new Date().getFullYear();
    
    React.useEffect(() => {
        setIsClient(true);
    }, []);

    // Fallback values untuk semua terjemahan
    const warningTitle = t('warningTitle', 'PERHATIAN');
    const warningMessage = t('warningMessage', 'Managemen PT. Kontakperkasa Futures menghimbau kepada seluruh masyarakat untuk lebih berhati-hati terhadap beberapa bentuk penipuan yang berkedok investasi mengatasnamakan PT. Kontakperkasa Futures.');
    const quickLinks = t('quickLinks', 'Tautan Cepat');
    const contactUs = t('contactUs', 'Kontak Kami');
    const legal = t('legal', 'Legalitas');
    const headOffice = t('headOffice', 'Kantor Pusat');
    const address = t('address', 'Sudirman Plaza, Gedung Plaza Marein Lt. 7 & 19, Jl. Jend. Sudirman Kav. 76-78, Jakarta 12910');
    const komdigiDesc = t('komdigiDesc', 'Terdaftar dan diawasi oleh Kementerian Komunikasi dan Informatika Republik Indonesia');
    const isoDesc = t('isoDesc', 'Bersertifikat ISO 9001:2015');
    const copyright = t('copyright', '&copy; {{year}} PT. Kontakperkasa Futures. All rights reserved.');
    const termsConditions = t('termsConditions', 'Syarat & Ketentuan');
    const privacyPolicy = t('privacyPolicy', 'Kebijakan Privasi');
    const disclaimer = t('disclaimer', 'Disclaimer');

    // Tampilkan loading sederhana di server
    if (!isClient) {
        return (
            <footer className="bg-white">
                <div className="animate-pulse h-64 bg-gray-100"></div>
            </footer>
        );
    }

    return (
        <footer className="bg-white border-t border-gray-100">
            {/* Warning Banner */}
            <div className="bg-yellow-50 py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex">
                    <Icons.Warning />
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">{warningTitle}</h3>
                        <p className="text-xs text-yellow-700 mt-1">
                            {warningMessage}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">{quickLinks}</h3>
                        <ul className="space-y-2">
                            {[
                                { icon: <Icons.Home />, text: 'Beranda', href: '/' },
                                { icon: <Icons.Cube />, text: 'Lihat Produk', href: '/products' },
                                { icon: <Icons.Envelope />, text: 'Kontak', href: '/contact' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <a href={item.href} className="flex items-center text-sm text-gray-600 hover:text-green-600">
                                        {item.icon}
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">{contactUs}</h3>
                        <div className="space-y-3">
                            <div className="flex">
                                <Icons.MapPin />
                                <div>
                                    <p className="text-xs font-medium text-gray-900">{headOffice}</p>
                                    <p className="text-xs text-gray-600">{address}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Icons.Phone />
                                <a href="tel:+62215705777" className="text-sm text-gray-600 hover:text-green-600">(021) 570-5777</a>
                            </div>
                            <div className="flex items-center">
                                <Icons.Envelope />
                                <a href="mailto:info@kontakperkasa.net" className="text-sm text-gray-600 hover:text-green-600">info@kontakperkasa.net</a>
                            </div>
                        </div>
                    </div>

                    {/* Legal Info */}
                    <div className="md:col-span-2">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">{legal}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                {
                                    src: "/assets/BrandLogo.org-KOMDIGI-Logo-2024.png",
                                    alt: "Kementerian Komunikasi dan Informatika",
                                    description: komdigiDesc
                                },
                                {
                                    src: "/assets/iso.png",
                                    alt: "ISO 9001:2015 Certified",
                                    description: isoDesc
                                }
                            ].map((item, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <img 
                                        src={item.src} 
                                        alt={item.alt} 
                                        className="h-12 w-auto object-contain mb-2"
                                    />
                                    <p className="text-xs text-gray-600">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p 
                            className="text-xs text-gray-500 mb-4 md:mb-0"
                            dangerouslySetInnerHTML={{ 
                                __html: copyright.replace('{{year}}', currentYear.toString())
                            }} 
                        />
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="/syarat-ketentuan" className="text-xs text-gray-500 hover:text-green-600">
                                {termsConditions}
                            </a>
                            <a href="/kebijakan-privasi" className="text-xs text-gray-500 hover:text-green-600">
                                {privacyPolicy}
                            </a>
                            <a href="/disclaimer" className="text-xs text-gray-500 hover:text-green-600">
                                {disclaimer}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
