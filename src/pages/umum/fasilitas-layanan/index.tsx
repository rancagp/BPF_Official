import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

type ServiceItem = {
  title: string;
  description: string;
  icon?: string;
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'id', ['fasilitas_layanan', 'common', 'footer'])),
    },
  };
}

export default function FasilitasLayanan() {
  const { t } = useTranslation('fasilitas_layanan');
  const services = t('services', { returnObjects: true }) as ServiceItem[];
  const servicesList = Array.isArray(services) ? services : [];

  return (
    <PageTemplate title={t('pageTitle')} description={t('pageDescription')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('pageTitle')}>
          <div className="space-y-12">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[#4C4C4C] leading-relaxed">
                {t('pageDescription')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {servicesList.map((service: ServiceItem, index: number) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg border border-[#E5E7EB] hover:shadow-md transition-shadow"
                >
                  {service.icon && (
                    <div className="w-12 h-12 rounded-full bg-[#F2AC59] bg-opacity-10 flex items-center justify-center text-xl text-[#F2AC59] mb-4">
                      {service.icon}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-[#4C4C4C] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#4C4C4C] text-opacity-80 text-sm">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-[#F9FAFB] p-8 rounded-lg mt-12">
              <h2 className="text-xl font-semibold text-[#4C4C4C] mb-6 text-center">
                {t('whyChooseUs', 'Mengapa Memilih Kami?')}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-[#F2AC59] bg-opacity-10 flex items-center justify-center text-2xl text-[#F2AC59] mx-auto mb-3">
                    🔒
                  </div>
                  <h3 className="font-medium text-[#4C4C4C] mb-2">{t('secure', 'Aman & Terpercaya')}</h3>
                  <p className="text-sm text-[#4C4C4C] text-opacity-80">
                    {t('secureDesc', 'Diawasi oleh BAPPEBTI')}
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-[#F2AC59] bg-opacity-10 flex items-center justify-center text-2xl text-[#F2AC59] mx-auto mb-3">
                    ⚡
                  </div>
                  <h3 className="font-medium text-[#4C4C4C] mb-2">{t('fast', 'Proses Cepat')}</h3>
                  <p className="text-sm text-[#4C4C4C] text-opacity-80">
                    {t('fastDesc', 'Transaksi dan penarikan dana yang cepat')}
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-[#F2AC59] bg-opacity-10 flex items-center justify-center text-2xl text-[#F2AC59] mx-auto mb-3">
                    👨‍💼
                  </div>
                  <h3 className="font-medium text-[#4C4C4C] mb-2">{t('support', 'Dukungan 24/7')}</h3>
                  <p className="text-sm text-[#4C4C4C] text-opacity-80">
                    {t('supportDesc', 'Tim profesional siap membantu')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}