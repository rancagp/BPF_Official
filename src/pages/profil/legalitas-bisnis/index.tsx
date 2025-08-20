import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import Image from "next/image";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'id', ['legalitas_bisnis', 'common', 'footer'])),
    },
  };
}

type LegalitasItem = {
  title: string;
  description: string;
  icon: string;
};

type Organization = {
  name: string;
  logo: string;
};

export default function LegalitasBisnis() {
  const { t } = useTranslation('legalitas_bisnis');
  const legalitasItems = t('legalitasItems', { returnObjects: true }) as LegalitasItem[];
  
  const organizations: Organization[] = [
    { name: "BAPPEBTI", logo: "/assets/logo-bappebti.png" },
    { name: "Jakarta Futures Exchange", logo: "/assets/logo-jfx.png" },
    { name: "Kliring Berjangka Indonesia", logo: "/assets/logo-kbi.png" },
    { name: "ASPEBTINDO", logo: "/assets/logo-aspebtindo.png" }
  ];

  return (
    <PageTemplate 
      title={t('pageTitle')}
      description={t('pageDescription')}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-4xl mx-auto">
        <ProfilContainer title={t('pageTitle')} description={t('pageDescription')}>
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-12 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-100 rounded-full opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {t('aboutTitle')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t('aboutDescription')}
              </p>
              <div className="h-1 w-24 bg-green-500 my-6"></div>
            </div>
          </div>

          {/* Legalitas Items */}
          <div className="space-y-8 mb-16">
            {Array.isArray(legalitasItems) && legalitasItems.map((item: LegalitasItem, index: number) => (
              <div 
                key={index}
                className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-green-100"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-2xl">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Important Notice */}
          <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 mb-16">
            <p className="font-bold">{t('importantNotice.title')}</p>
            <p className="mt-1">
              {t('importantNotice.description')}
            </p>
          </div>

          {/* Supporting Documents */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-12 relative">
              <span className="relative z-10 px-4 bg-white">
                {t('partnersTitle')}
              </span>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-0"></div>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {organizations.map((org, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-green-100"
                >
                  <div className="h-20 flex items-center justify-center mb-4">
                    <div className="relative w-full h-full">
                      <Image 
                        src={org.logo} 
                        alt={org.name} 
                        fill
                        className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                    {org.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}