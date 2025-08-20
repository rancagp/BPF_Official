import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import Image from "next/image";
import { GetStaticProps } from 'next';

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
    const certificatesData = t('certificates', { returnObjects: true });
    const certificates = Array.isArray(certificatesData) ? certificatesData : [];

    return (
        <>
            <PageTemplate title={t('pageTitle')}>
            <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-4xl mx-auto">
            <ProfilContainer title={t('pageTitle')}>
                <div className="mb-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {certificates.map((item: { image: string; description: string }, idx: number) => (
                            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                                <div className="relative aspect-video w-full h-48 bg-gray-100 flex items-center justify-center cursor-pointer" onClick={() => setSelectedImage(item.image)}>
                                    <Image src={item.image} alt={item.description.slice(0,40)} fill className="object-contain" />
                                </div>
                                <div className="p-6 flex-1">
                                    <p className="text-gray-700 text-base leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ProfilContainer>
            </div>
            </PageTemplate>

            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-1 text-gray-700 hover:text-black shadow-lg"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <div className="bg-white p-1 rounded-lg shadow-xl inline-block">
                            <img 
                                src={selectedImage} 
                                alt="Sertifikat" 
                                className="block max-w-[85vw] max-h-[85vh] rounded-md" 
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}