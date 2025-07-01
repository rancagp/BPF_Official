import React from "react";

const Navbar = () => {
    return (
        <>
            <div className="sticky top-0 z-50">
                {/* Navbar */}
                <div className="w-full bg-zinc-800 text-white ">
                    {/* Menu Navbar */}
                    <div className="flex justify-between items-center text-base px-22 py-3">
                        {/* Logo */}
                        <div className="text-xl font-bold flex items-center gap-3">
                            <img src="/assets/logo-rfb.png" alt="Logo RFB" className="h-10" />
                            <span>Rifan Financinda Berjangka</span>
                        </div>

                        {/* Navbar Menu */}
                        <nav>
                            <ul className="flex space-x-6">
                                {/* Beranda */}
                                <li>
                                    <a
                                        href="/"
                                        className="hover:border-b-2 border-green-700 transition duration-300"
                                    >
                                        Beranda
                                    </a>
                                </li>

                                {/* Profil */}
                                <li className="relative group">
                                    <button className="flex items-center hover:border-b-2 border-green-700 transition duration-300">
                                        Profil <i className="fa-solid fa-chevron-down ml-2"></i>
                                    </button>
                                    <ul className="absolute left-0 bg-white text-black py-2 w-48 rounded mt-4 shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                                        <li>
                                            <a href="/profil/perusahaan" className="block px-4 py-2">
                                                Profil Perusahaan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/profil/wakil-pialang" className="block px-4 py-2">
                                                Wakil Pialang
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/profil/legalitas" className="block px-4 py-2">
                                                Legalitas
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                {/* Produk */}
                                <li className="relative group">
                                    <button className="flex items-center hover:border-b-2 border-green-700 transition duration-300">
                                        Produk <i className="fa-solid fa-chevron-down ml-2"></i>
                                    </button>
                                    <ul className="absolute left-0 bg-white text-black py-2 w-48 rounded mt-4 shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                                        <li>
                                            <a href="/produk/multilateral" className="block px-4 py-2">
                                                Produk Multilateral
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/produk/bilateral" className="block px-4 py-2">
                                                Produk Bilateral
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                {/* Analisis */}
                                <li className="relative group">
                                    <button className="flex items-center hover:border-b-2 border-green-700 transition duration-300">
                                        Analisis <i className="fa-solid fa-chevron-down ml-2"></i>
                                    </button>
                                    <ul className="absolute left-0 bg-white text-black py-2 w-48 rounded mt-4 shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                                        <li>
                                            <a href="/analisis/berita" className="block px-4 py-2">
                                                Berita
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/analisis/economic-calendar"
                                                className="block px-4 py-2"
                                            >
                                                Economic Calendar
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/analisis/historical-data"
                                                className="block px-4 py-2"
                                            >
                                                Historical Data
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/analisis/pivot-fibonacci"
                                                className="block px-4 py-2"
                                            >
                                                Pivot & Fibonacci
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                {/* Prosedur Investasi */}
                                <li className="relative group">
                                    <button className="flex items-center hover:border-b-2 border-green-700 transition duration-300">
                                        Prosedur Investasi{" "}
                                        <i className="fa-solid fa-chevron-down ml-2"></i>
                                    </button>
                                    <ul className="absolute left-0 bg-white text-black py-2 w-48 rounded mt-4 shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                                        <li>
                                            <a
                                                href="/prosedur/registrasi-online"
                                                className="block px-4 py-2"
                                            >
                                                Prosedur Registrasi Online
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/prosedur/penarikan" className="block px-4 py-2">
                                                Prosedur Penarikan
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/prosedur/petunjuk-transaksi"
                                                className="block px-4 py-2"
                                            >
                                                Petunjuk Transaksi
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                {/* Informasi */}
                                <li className="relative group">
                                    <button className="flex items-center hover:border-b-2 border-green-700 transition duration-300">
                                        Informasi <i className="fa-solid fa-chevron-down ml-2"></i>
                                    </button>
                                    <ul className="absolute left-0 bg-white text-black py-2 w-48 rounded mt-4 shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                                        <li>
                                            <a href="/informasi/umum" className="block px-4 py-2">
                                                Umum
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/informasi/video-umum" className="block px-4 py-2">
                                                Video Umum
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                {/* Hubungi Kami */}
                                <li>
                                    <a
                                        href="/hubungi-kami"
                                        className="hover:border-b-2 border-green-700 transition duration-300"
                                    >
                                        Hubungi Kami
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Market Update */}
                <div className="w-full bg-zinc-800 text-white overflow-hidden">
                    <div className="flex items-center h-12">
                        <div className="bg-red-600 px-4 h-full flex items-center font-bold text-sm sm:text-base whitespace-nowrap">
                            Market Update
                        </div>
                        <div className="relative overflow-hidden w-full bg-green-600 h-full flex items-center">
                            <div className="animate-marquee whitespace-nowrap px-4 text-sm sm:text-base">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium rerum at architecto, deserunt magni tempora amet vitae magnam sit, enim quam nihil saepe fugiat dolor quod, laudantium et ipsum molestias.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
