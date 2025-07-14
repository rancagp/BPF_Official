import React from "react";

// Ikon SVG inline
const Icons = {
    Warning: () => (
        <svg className="h-6 w-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    Home: () => (
        <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    ),
    Cube: () => (
        <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    ),
    Envelope: () => (
        <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    MapPin: () => (
        <svg className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    Phone: () => (
        <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
    ),
    Document: () => (
        <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    )
};

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] bg-repeat"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                {/* Top Section - Warning */}
                <div className="bg-gradient-to-r from-yellow-900/40 to-amber-900/20 border-l-4 border-yellow-500 p-6 mb-12 rounded-r-lg transform transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            
                        </div>
                        <div className="ml-3">
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                            <Icons.Warning /> PERHATIAN!
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-200">
                                Managemen PT. Kontakperkasa Futures menghimbau kepada seluruh masyarakat untuk lebih berhati-hati terhadap beberapa bentuk penipuan yang berkedok investasi mengatasnamakan PT. Kontakperkasa Futures dengan menggunakan media elektronik ataupun sosial media. Untuk itu harus dipastikan bahwa transfer dana ke rekening tujuan (Segregated Account) guna melaksanakan transaksi Perdagangan Berjangka adalah atas nama PT Kontakperkasa Futures, bukan atas nama individu.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Useful Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white border-l-4 border-green-500 pl-3 py-1">Tautan Cepat</h3>
                        <ul className="space-y-3">
                            {[
                                { icon: <Icons.Home />, text: 'Beranda', href: '/' },
                                { icon: <Icons.Cube />, text: 'Lihat Produk', href: '/produk' },
                                { icon: <Icons.Envelope />, text: 'Kontak', href: '/hubungi-kami' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <a 
                                        href={item.href} 
                                        className="flex items-center group transition-all duration-300 hover:translate-x-1"
                                    >
                                        <span className="text-green-500 group-hover:text-green-400 transition-colors mr-3">
                                            {item.icon}
                                        </span>
                                        <span className="text-gray-300 group-hover:text-white transition-colors">
                                            {item.text}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Download App */}
                        <div className="pt-6">
                            <h3 className="text-lg font-semibold text-white mb-4 border-l-4 border-green-500 pl-3 py-1">Unduh Aplikasi</h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        href: "https://apps.apple.com/id/app/pro-trader-royalassetindo/id6502900138?l=id",
                                        src: "/assets/download-on-the-app-store.svg",
                                        alt: "Download on App Store",
                                        className: "h-12"
                                    },
                                    {
                                        href: "https://play.google.com/store/apps/details?id=com.royalassetindo.protrader&hl=id",
                                        src: "/assets/en_badge_web_generic.png",
                                        alt: "Get it on Google Play",
                                        className: "h-16"
                                    }
                                ].map((app, index) => (
                                    <a 
                                        key={index} 
                                        href={app.href} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="block w-full max-w-[180px] transform transition-transform duration-300 hover:scale-105"
                                    >
                                        <img 
                                            src={app.src}
                                            alt={app.alt}
                                            className={`w-full object-contain ${app.className}`}
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Company Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white border-l-4 border-green-500 pl-3 py-1">Kontak Kami</h3>
                        <div className="space-y-5">
                            {[
                                {
                                    icon: <Icons.MapPin />,
                                    content: (
                                        <p className="text-sm text-gray-200">
                                            <span className="font-medium text-white">Kantor Pusat</span><br />
                                            Sudirman Plaza, Gedung Plaza Marein Lt. 7 & 19<br />
                                            Jl. Jend. Sudirman Kav. 76-78, Jakarta 12910
                                        </p>
                                    )
                                },
                                {
                                    icon: <Icons.Envelope />,
                                    content: (
                                        <a 
                                            href="mailto:corporate@rifan-financindo-berjangka.co.id" 
                                            className="text-sm text-gray-300 hover:text-white transition-colors duration-200 group"
                                        >
                                            <span className="block group-hover:underline">corporate@rifan-financindo-berjangka.co.id</span>
                                        </a>
                                    )
                                },
                                // Phone numbers section
                                {
                                    icon: <Icons.Phone />,
                                    content: (
                                        <a 
                                            href="tel:02157936555" 
                                            className="text-sm text-gray-300 hover:text-white transition-colors duration-200 group"
                                        >
                                            <span className="group-hover:underline">(021) 5793 6555</span>
                                        </a>
                                    )
                                },
                                // Document number section
                                {
                                    icon: <Icons.Document />,
                                    content: (
                                        <span className="text-sm text-gray-300">
                                            (021) 5793 6550
                                        </span>
                                    )
                                },
                                {
                                    icon: <Icons.Envelope />,
                                    content: (
                                        <a 
                                            href="mailto:corporate@kontak-perkasa-futures.co.id" 
                                            className="text-sm text-gray-300 hover:text-white transition-colors duration-200 group"
                                        >
                                            <span className="font-medium text-white">Layanan Pengaduan:</span><br />
                                            <span className="group-hover:underline">corporate@kontak-perkasa-futures.co.id</span>
                                        </a>
                                    )
                                }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start group">
                                    <div className="text-green-500 group-hover:text-green-400 transition-colors mt-1 mr-3">
                                        {item.icon}
                                    </div>
                                    {item.content}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legal & Certifications */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white border-l-4 border-green-500 pl-3 py-1">Legalitas</h3>
                        <div className="grid grid-cols-1 gap-5">
                            {[
                                {
                                    href: "https://www.komdigi.go.id/",
                                    src: "/assets/BrandLogo.org-KOMDIGI-Logo-2024.png",
                                    alt: "Kementerian Komunikasi dan Informatika",
                                    description: "Terdaftar dan diawasi oleh Kementerian Komunikasi dan Informatika Republik Indonesia",
                                    className: "h-16"
                                },
                                {
                                    src: "/assets/iso.png",
                                    alt: "ISO Certification",
                                    description: "Bersertifikat ISO 9001:2015",
                                    className: "h-16"
                                }
                            ].map((item, index) => (
                                <div 
                                    key={index} 
                                    className="bg-gradient-to-br from-white/5 to-white/[0.02] p-5 rounded-xl border border-white/5 hover:border-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5"
                                >
                                    {item.href ? (
                                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                                            <img 
                                                src={item.src} 
                                                alt={item.alt} 
                                                className={`mx-auto ${item.className} transition-transform duration-300 hover:scale-105`}
                                            />
                                        </a>
                                    ) : (
                                        <img 
                                            src={item.src} 
                                            alt={item.alt} 
                                            className={`mx-auto ${item.className} transition-transform duration-300 hover:scale-105`}
                                        />
                                    )}
                                    <p className="text-xs text-center mt-4 text-gray-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700/50 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-500 text-center md:text-left mb-6 md:mb-0">
                            &copy; {currentYear} PT Kontak Perkasa Futures. All Rights Reserved
                        </p>
                        <div className="flex items-center space-x-1">
                            {[
                                { icon: 'facebook-f', label: 'Facebook', href: '#' },
                                { icon: 'twitter', label: 'Twitter', href: '#' },
                                { icon: 'instagram', label: 'Instagram', href: '#' },
                                { icon: 'linkedin-in', label: 'LinkedIn', href: '#' },
                                { icon: 'youtube', label: 'YouTube', href: '#' }
                            ].map((social, index) => (
                                <a 
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <i className={`fab fa-${social.icon} text-lg`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
