import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import Image from "next/image";
import { GetStaticProps } from 'next';

type Certificate = {
  image: string;
  description: string;
};

type Section = {
  title: string;
  certificates: Certificate[];
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
    const sectionsData = t('sections', { returnObjects: true }) as Section[];
    const sections = Array.isArray(sectionsData) ? sectionsData : [];

    return (
        <PageTemplate title={t('pageTitle')}>
            <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
                <ProfilContainer title={t('pageTitle')}>
                    <div className="space-y-10">
                        {sections.map((section: Section, sectionIndex: number) => (
                            <div key={sectionIndex} className="space-y-8">
                                <h2 className="text-xl font-semibold text-[#4C4C4C] border-b border-[#F2AC59] pb-2">
                                    {section.title}
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                                    {section.certificates.map((cert: Certificate, certIndex: number) => (
                                        <div key={certIndex} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col">
                                            <div 
                                                className="relative aspect-[4/3] w-full bg-white flex items-center justify-center cursor-pointer" 
                                                onClick={() => setSelectedImage(cert.image)}
                                            >
                                                <Image 
                                                    src={cert.image} 
                                                    alt={cert.description} 
                                                    fill 
                                                    className="object-contain p-3" 
                                                />
                                            </div>
                                            <div className="p-3 border-t border-gray-100">
                                                <p className="text-[#4C4C4C] text-xs leading-relaxed">{cert.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ProfilContainer>
            </div>

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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="bg-white p-1 rounded-lg shadow-xl inline-block">
                            <img 
                                src={selectedImage} 
                                alt="Certificate" 
                                className="block max-w-[85vw] max-h-[85vh] rounded-md" 
                            />
                        </div>
                    </div>
                </div>
            )}
        </PageTemplate>
    );
}