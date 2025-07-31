import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AboutUs() {
    return (
        <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Tentang Kami
                    </h2>
                    <div className="mt-2 h-1 w-24 bg-green-600 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Gambar */}
                    <div className="relative rounded-lg overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105">
                        <img
                            src="/assets/gedung-kpf.png"
                            alt="Kontakperkasa Futures"
                            className="w-full h-auto rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <p className="text-white text-sm">Kantor Pusat Kontakperkasa Futures</p>
                        </div>
                    </div>

                    {/* Konten */}
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Selamat Datang di <span className="text-green-600">KONTAKPERKASA FUTURES</span>
                        </h1>
                        
                        <p className="text-gray-600 leading-relaxed">
                            PT. Kontakperkasa Futures, selaku anggota dari Bursa Berjangka Jakarta dan anggota Kliring Berjangka Indonesia, berbekal pengalaman dan kemampuan dalam mengembangkan perdagangan berjangka komoditi di tanah air.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="ml-3 text-gray-700">
                                    Layanan transaksi derivatif indeks saham yang lengkap
                                </p>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="ml-3 text-gray-700">
                                    Didukung oleh tim profesional yang berpengalaman
                                </p>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="ml-3 text-gray-700">
                                    Platform trading yang canggih dan aman
                                </p>
                            </div>
                        </div>
                        
                        <div className="pt-4">
                            <Link 
                                href="/profil/perusahaan" 
                                className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-800"
                            >
                                Pelajari Lebih Lanjut
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
