import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'id', ['prosedur', 'common', 'footer'])),
    },
  };
};

interface RequirementItem {
  text?: string;
  link?: {
    url: string;
    text: string;
  };
}

export default function PetunjukTransaksi() {
  const { t } = useTranslation('prosedur');
  const requirements = t('petunjukTransaksi.requirements', { returnObjects: true }) as (string | RequirementItem)[];

  return (
    <PageTemplate title={t('petunjukTransaksi.title', 'Petunjuk Transaksi')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('petunjukTransaksi.title', 'Petunjuk Transaksi')}>
          <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
            <p>{t('petunjukTransaksi.description')}</p>
            <p>{t('petunjukTransaksi.description2')}</p>

            <ol className="list-decimal pl-5 sm:pl-8 space-y-3">
              {requirements.map((item, index) => {
                if (typeof item === 'string') {
                  return <li key={index}>{item}</li>;
                }
                
                return (
                  <li key={index}>
                    {item.text}{' '}
                    <a
                      href={item.link?.url}
                      className="text-green-600 hover:text-green-700 underline break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.link?.text}
                    </a>
                  </li>
                );
              })}
            </ol>

            <p className="font-semibold">
              {t('petunjukTransaksi.note')}
            </p>

            <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800">
              <p className="font-bold">{t('petunjukTransaksi.attention.title')}</p>
              <p className="mt-1">
                {t('petunjukTransaksi.attention.content')}
              </p>
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
