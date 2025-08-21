import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import ModalPopup from './ModalPopup';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('welcome');
  return (
    <ModalPopup isOpen={isOpen} onClose={onClose}>
      <div className="relative p-1 text-center max-w-2xl w-full">
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full -z-10 opacity-30"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full -z-10 opacity-30"></div>
        
        {/* Logo with gradient border */}
        <div className="mb-6">
          <div className="mx-auto w-32 h-32 p-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-lg">
            <div className="bg-white p-4 rounded-xl h-full flex items-center justify-center">
              <Image 
                src="/assets/logo-kpf.png" 
                alt="KontakPerkasa Futures" 
                width={128}
                height={128}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        
        <p className="text-black text-lg mb-8 max-w-lg mx-auto">
          {t('description')}
        </p>
        
        <div className="space-y-4">
          <a 
            href="https://regol.kontak-perkasa-futures.co.id/" 
            className="inline-block w-full max-w-xs mx-auto bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('registerButton')}
          </a>
          <button 
            onClick={onClose}
            className="w-full max-w-xs mx-auto text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200 block"
          >
            {t('laterButton')}
          </button>
        </div>
      </div>
    </ModalPopup>
  );
};

export default WelcomeModal;
