import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
}

interface FasilitasLayananTranslations {
  pageTitle: string;
  pageDescription: string;
  services: ServiceItem[];
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'id', ['fasilitas_layanan', 'common', 'footer'])),
    },
  };
}

export default function FasilitasLayanan() {
  const { t } = useTranslation('fasilitas_layanan');
  
  // Get services array directly from translations
  const services = t('services', { returnObjects: true }) as ServiceItem[];

  return (
    <PageTemplate 
      title={t('pageTitle')} 
      description={t('pageDescription')}
    >
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('pageTitle')}>
          <div className="space-y-12">
            <div className="text-center">
              <p className="text-[#000000] leading-relaxed max-w-4xl mx-auto text-left">
                {t('pageDescription')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="group bg-white p-6 rounded-xl border border-gray-100 hover:border-[#FF0000]/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="h-8 w-1 bg-[#FF0000] rounded-full mr-3 mt-1 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-bold text-[#080031] group-hover:text-[#FF0000] transition-colors duration-300 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-[#000000]/90 text-justify whitespace-pre-line">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}