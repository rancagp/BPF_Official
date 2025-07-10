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
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Top Section - Warning */}
                <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-6 mb-10 rounded-r-lg">
                    <div className="flex items-start">
                        <Icons.Warning />
                        <div>
                            <h3 className="text-xl font-bold text-white mb-3">PERHATIAN!</h3>
                            <p className="text-sm leading-relaxed">
                            Managemen PT. Kontakperkasa Futures menghimbau kepada seluruh masyarakat untuk lebih berhati-hati terhadap beberapa bentuk penipuan yang berkedok investasi mengatasnamakan PT. Kontakperkasa Futures dengan menggunakan media elektronik ataupun sosial media. Untuk itu harus dipastikan bahwa transfer dana ke rekening tujuan (Segregated Account) guna melaksanakan transaksi Perdagangan Berjangka adalah atas nama PT Kontakperkasa Futures, bukan atas nama individu.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {/* Useful Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Tautan Cepat</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="flex items-center hover:text-white transition-colors duration-200">
                                    <Icons.Home />
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center hover:text-white transition-colors duration-200">
                                    <Icons.Cube />
                                    Lihat Produk
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center hover:text-white transition-colors duration-200">
                                    <Icons.Envelope />
                                    Kontak
                                </a>
                            </li>
                        </ul>

                        {/* Download App */}
                        <div className="pt-4">
                            <h3 className="text-lg font-semibold text-white mb-3 border-b border-gray-700 pb-2">Unduh Aplikasi</h3>
                            <div className="flex flex-col space-y-3">
                                <a href="https://apps.apple.com/id/app/pro-trader-royalassetindo/id6502900138?l=id" className="block w-full max-w-[180px]">
                                    <img 
                                        src="/assets/download-on-the-app-store.svg" 
                                        alt="Download on App Store" 
                                        className="h-12 w-full object-contain hover:opacity-90 transition-opacity"
                                    />
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=com.royalassetindo.protrader&hl=id" className="block w-full max-w-[180px]">
                                    <img 
                                        src="/assets/en_badge_web_generic.png" 
                                        alt="Get it on Google Play" 
                                        className="h-16 w-full object-contain hover:opacity-90 transition-opacity"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Company Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Kontak Kami</h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Icons.MapPin />
                                <p className="text-sm">
                                Sudirman Plaza, Gedung Plaza Marein Lt. 7 & 19<br />
                                Jl. Jend. Sudirman Kav. 76-78, Jakarta 12910
                                </p>
                            </div>
                            <div className="flex items-center">
                                <Icons.Envelope />
                                <a href="mailto:corporate@rifan-financindo-berjangka.co.id" className="hover:text-white transition-colors duration-200 text-sm">
                                    corporate@rifan-financindo-berjangka.co.id
                                </a>
                            </div>
                            <div className="flex items-center">
                                <Icons.Phone />
                                <a href="tel:02157936555" className="hover:text-white transition-colors duration-200 text-sm">
                                (021) 5793 6555
                                </a>
                            </div>
                            <div className="flex items-center">
                                <Icons.Document />
                                <span className="text-sm">(021) 5793 6550</span>
                            </div>
                            <div className="flex items-start">
                                <Icons.Envelope />
                                <a href="mailto:corporate@kontak-perkasa-futures.co.id" className="hover:text-white transition-colors duration-200 text-sm">
                                    Layanan pengaduan: corporate@kontak-perkasa-futures.co.id
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Legalitas</h3>
                        <div className="space-y-4">
                            <div className="bg-white/5 p-4 rounded-lg">
                                <a href="https://www.komdigi.go.id/" target="_blank" rel="noopener noreferrer">
                                    <img 
                                        src="/assets/BrandLogo.org-KOMDIGI-Logo-2024.png" 
                                        alt="Kementerian Komunikasi dan Informatika" 
                                        className="h-16 mx-auto hover:opacity-90 transition-opacity"
                                    />
                                </a>
                                <p className="text-xs text-center mt-3 text-gray-400">
                                    Terdaftar dan diawasi oleh Kementerian Komunikasi dan Informatika Republik Indonesia
                                </p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg">
                                <img
                                    src="/assets/iso.png"
                                    alt="ISO Certification"
                                    className="h-16 mx-auto hover:opacity-90 transition-opacity"
                                />
                                <p className="text-xs text-center mt-3 text-gray-400">
                                    Bersertifikat ISO 9001:2015
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-500 text-center md:text-left mb-4 md:mb-0">
                            &copy; {new Date().getFullYear()} PT Kontak Perkasa Futures. All Rights Reserved
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <span className="sr-only">Facebook</span>
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <span className="sr-only">Twitter</span>
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <span className="sr-only">Instagram</span>
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <span className="sr-only">LinkedIn</span>
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
