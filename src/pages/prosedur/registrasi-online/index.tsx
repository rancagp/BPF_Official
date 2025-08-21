import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import RegistrationFlow from "@/components/organisms/RegistrationFlow";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'prosedur', 'footer'])),
    },
  };
};

export default function RegistrasiOnline() {
  const { t } = useTranslation('prosedur');
  
  return (
    <PageTemplate title={t('registrasiOnline.title')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('registrasiOnline.title')}>
          <div className="space-y-8">
            <p className="text-gray-700">
              {t('registrasiOnline.description')}
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">
                {t('registrasiOnline.documentsRequired.title')}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {(t('registrasiOnline.documentsRequired.items', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">
                {t('registrasiOnline.title')}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {(t('registrasiOnline.steps', { returnObjects: true }) as string[]).map((step, index) => (
                  <li key={index} className="mb-2">{step}</li>
                ))}
              </ol>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <h4 className="font-semibold mb-2">
                {t('common:note')}:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {(t('registrasiOnline.notes', { returnObjects: true }) as string[]).map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>

            <RegistrationFlow />
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
