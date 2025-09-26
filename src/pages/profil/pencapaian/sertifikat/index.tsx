import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import Image from "next/image";
import { GetStaticProps } from 'next';

type Certificate = {
  image: string;
};

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'sertifikat', 'footer'])),
    },
  };
};

export default function SertifikatPage() {
    const { t } = useTranslation('sertifikat');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const certificates = t('certificates', { returnObjects: true }) as Certificate[];
    const certificateList = Array.isArray(certificates) ? certificates : [];

    return (
        <PageTemplate title="Sertifikat">
            <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
                <ProfilContainer title="Sertifikat">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {certificateList.map((cert: Certificate, index: number) => (
                            <div 
                                key={index} 
                                className="relative aspect-[4/3] w-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-100 cursor-pointer"
                                onClick={() => setSelectedImage(cert.image)}
                            >
                                <Image 
                                    src={cert.image} 
                                    alt={`Sertifikat ${index + 1}`} 
                                    fill 
                                    className="object-cover hover:opacity-90 transition-opacity"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                />
                            </div>
                        ))}
                    </div>
                </ProfilContainer>
            </div>

            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute -top-12 right-0 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Tutup"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="bg-white p-1 rounded-lg shadow-xl inline-block">
                            <img 
                                src={selectedImage} 
                                alt="Sertifikat" 
                                className="block max-w-[90vw] max-h-[90vh] object-contain rounded-md" 
                            />
                        </div>
                    </div>
                </div>
            )}
        </PageTemplate>
    );
}