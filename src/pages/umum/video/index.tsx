import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import VideoSection from "@/components/organisms/VideoSection";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'video', 'footer'])),
    },
  };
};

export default function Video() {
    const { t } = useTranslation('video');
    
    return (
        <PageTemplate title={t('pageTitle')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('sectionTitle')}>
                    <VideoSection />
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
