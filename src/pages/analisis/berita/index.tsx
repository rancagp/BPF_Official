import BeritaSection from "@/components/organisms/BeritaSection";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'id', ['berita', 'common', 'footer'])),
    },
  };
};

export default function Berita() {
  const { t } = useTranslation('berita');
  
  return (
    <PageTemplate title={t('title', 'Berita Terbaru')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('title', 'Berita Terbaru')}>
          <div className="space-y-10">
            <BeritaSection showHeader={false} />

            <div className="flex justify-center">
              <a 
                href="https://www.newsmaker.id/index.php/id/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white transition-all duration-300 font-medium"
              >
                {t('viewAllNews', 'Lihat Semua Berita')}
              </a>
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
