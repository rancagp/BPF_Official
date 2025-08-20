import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CardFasilitas from "@/components/moleculs/CardFasilitas";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

type ServiceItem = {
  id: number;
  icon: string;
};

const serviceIcons: ServiceItem[] = [
  { id: 1, icon: "👨‍💼" },
  { id: 2, icon: "💻" },
  { id: 3, icon: "🔒" },
  { id: 4, icon: "📊" },
  { id: 5, icon: "📧" },
  { id: 6, icon: "💸" },
  { id: 7, icon: "🏦" },
  { id: 8, icon: "🔄" },
  { id: 9, icon: "⚖️" },
  { id: 10, icon: "👁️" },
];

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'id', ['fasilitas_layanan', 'common', 'footer'])),
    },
  };
}

export default function FasilitasLayanan() {
  const { t } = useTranslation('fasilitas_layanan');
  const services = t('services', { returnObjects: true });
  
  // Ensure services is an array before mapping
  const servicesList = Array.isArray(services) ? services : [];

  return (
    <PageTemplate title={t('pageTitle')} description={t('pageDescription')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('pageTitle')}>
          <div className="space-y-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 text-center">
                {t('pageDescription')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {servicesList.map((service: { title: string; description: string }, index: number) => (
                <div 
                  key={serviceIcons[index].id}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                >
                  <div className="text-4xl mb-4">{serviceIcons[index].icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
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