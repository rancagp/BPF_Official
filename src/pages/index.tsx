// Home

import { useState, useEffect } from "react";
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageTemplate from "@/components/templates/PageTemplate";
import CarouselWithContent from "@/components/organisms/CarouselWithContent";
import ProdukContainer from "@/components/organisms/ProdukContainer";
import BeritaSection from "@/components/organisms/BeritaSection";
import AboutUs from "@/components/organisms/AboutUs";
import Iso from "@/components/organisms/Market";
import Pengumuman from "@/components/organisms/Pengumuman";
import ModalPopup from "@/components/moleculs/ModalPopup";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'id', ['aboutus', 'common', 'footer'])),
    },
  };
};


export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Buka modal otomatis saat halaman load
    setShowModal(true);
  }, []);

  const handleCloseModal = () => setShowModal(false);

  return (
    <PageTemplate>
      <div className="fixed top-4 right-4 z-50">
      </div>
      
      <ModalPopup isOpen={showModal} onClose={handleCloseModal}>
        <div className="relative p-1 text-center max-w-2xl w-full">
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full -z-10 opacity-30"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full -z-10 opacity-30"></div>
          
          {/* Logo with gradient border */}
          <div className="mb-6">
            <div className="mx-auto w-32 h-32 p-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-lg">
              <div className="bg-white p-4 rounded-xl h-full flex items-center justify-center">
                <img 
                  src="/assets/logo-kpf.png" 
                  alt="KontakPerkasa Futures" 
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to PT KontakPerkasa Futures
          </h1>
          
          <p className="text-black text-lg mb-8 max-w-lg mx-auto">
            Join thousands of traders and start your journey in the world of futures trading with Indonesia's trusted broker.
          </p>
          
          <div className="space-y-4">
            <a 
              href="https://regol.kontak-perkasa-futures.co.id/" 
              className="inline-block w-full max-w-xs mx-auto bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              Register Now
            </a>
            <button 
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
            >
              Maybe later
            </button>
          </div>
        </div>
      </ModalPopup>

      {/* Carousel */}
      <CarouselWithContent />

      {/* Content */}
      <div className="py-10 bg-gray-50 space-y-10">
        <div className="space-y-10 mb-20">
          <div className="sm:px-6 md:px-10 lg:px-20 xl:px-36 2xl:px-52">
            <AboutUs />
          </div>

          <hr className="border-gray-200" />

          <div className="sm:px-6 md:px-10 lg:px-20 xl:px-36 2xl:px-52">
            <ProdukContainer />
          </div>

          <hr className="border-gray-200" />

          <div className="sm:px-6 md:px-10 lg:px-20 xl:px-36 2xl:px-52">
            <BeritaSection limit={3} className="mx-auto flex flex-col gap-7 px-4  lg:px-16" />
          </div>
        </div>

        <hr className="border-gray-200 " />

        <Iso />

        <hr className="border-gray-200" />

        <div className="sm:px-6 md:px-10 lg:px-20 xl:px-36 2xl:px-52 my-5">
          <Pengumuman showHeader={true} className="mx-auto px-4" />
        </div>
      </div>
    </PageTemplate>
  );
}
