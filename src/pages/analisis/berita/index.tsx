import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageTemplate from '@/components/templates/PageTemplate';
import Container from '@/components/templates/PageContainer/Container';
import NewsCard from '@/components/moleculs/Newscard';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import beritaList from '@/data/BeritaList';

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
        <Container title={t('title', 'Berita Terbaru')}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaList.map((berita, index) => (
              <div 
                key={index}
                className="transform transition-transform duration-300 hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={`${(index % 3) * 100}`}
              >
                <NewsCard
                  title={berita.title}
                  date={berita.date}
                  content={berita.content}
                  slug={berita.slug}
                  img={berita.img}
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </PageTemplate>
  );
}
