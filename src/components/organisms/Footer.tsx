import React from "react";

const Footer = () => {
    return (
        /* Footer */
        <footer className="flex flex-col justify-between items-center gap-10 bg-zinc-800 text-white px-10 md:px-22 py-10">
            <div className="flex flex-col md:flex-row gap-10 md:gap-20 w-full">
                {/* Section 1 - Attention */}
                <div className="flex-1 text-center space-y-5">
                    <div className="w-full h-1 bg-green-500"></div>
                    <h1 className="text-3xl font-bold">PERHATIAN!</h1>
                    <p className="text-sm md:text-base">
                        Manajemen PT. Rifan Financindo Berjangka (PT RFB) menghimbau kepada
                        seluruh masyarakat untuk lebih berhati-hati terhadap beberapa bentuk
                        penipuan yang berkedok investasi mengatasnamakan PT RFB dengan
                        menggunakan media elektronik ataupun sosial media. Untuk itu harus
                        dipastikan bahwa transfer dana ke rekening tujuan (Segregated
                        Account) guna melaksanakan transaksi Perdagangan Berjangka adalah
                        atas nama PT Rifan Financindo Berjangka, bukan atas nama individu.
                    </p>
                </div>

                {/* Section 2 - Useful Links */}
                <div className="flex-1 space-y-5">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-xl font-bold">USEFUL LINKS</h1>
                        <div className="flex flex-col gap-3 text-sm md:text-base">
                            <a
                                href=""
                                className="flex items-center gap-2 hover:text-green-500"
                            >
                                <i className="fa-solid fa-chevron-right"></i> Beranda
                            </a>
                            <a
                                href=""
                                className="flex items-center gap-2 hover:text-green-500"
                            >
                                <i className="fa-solid fa-chevron-right"></i> Lihat Produk
                            </a>
                            <a
                                href=""
                                className="flex items-center gap-2 hover:text-green-500"
                            >
                                <i className="fa-solid fa-chevron-right"></i> Kontak
                            </a>
                        </div>
                    </div>

                    {/* Section 3 - Download Links */}
                    <div className="flex flex-col gap-5">
                        <h1 className="text-xl font-bold">Download Aplikasi Pro Trader</h1>
                        <div className="flex items-center gap-5">
                            <a href="">
                                <img
                                    src="/assets/download-on-the-app-store.svg"
                                    alt="Download on the App Store"
                                    className="h-12 transition-transform duration-300 hover:scale-110"
                                />
                            </a>
                            <a href="">
                                <img
                                    src="/assets/en_badge_web_generic.png"
                                    alt="Get it on Google Play"
                                    className="h-18 transition-transform duration-300 hover:scale-110"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Section 4 - Company Info */}
                <div className="flex-1 space-y-3">
                    <h1 className="font-bold">PT RIFAN FINANCINDO BERJANGKA</h1>
                    <p className="text-sm md:text-base">
                        AXA Tower Kuningan City Lt. 23, 25, 30 & 35 Jl. Prof. DR. Satrio
                        Kav. 18, Kuningan Setiabudi, Jakarta 12940
                    </p>
                    <p className="text-sm md:text-base">
                        <strong>Email: </strong>
                        corporate@rifan-financindo-berjangka.co.id
                    </p>
                    <p className="text-sm md:text-base">
                        <strong>Telepn: </strong>(021) 30056300
                    </p>
                    <p className="text-sm md:text-base">
                        <strong>Whatsapp: </strong>+6281210697841
                    </p>
                    <p className="text-sm md:text-base">
                        <strong>Layanan pengaduan: </strong>
                        corporate@rifan-financindo-berjangka.co.id
                    </p>
                </div>
            </div>

            {/* Footer Divider */}
            <div className="w-full h-1 bg-green-500"></div>

            <div>
                © Copyright 2025, PT Rifan Financindo Berjangka. All Rights Reserved
            </div>
        </footer>
    );
};

export default Footer;
