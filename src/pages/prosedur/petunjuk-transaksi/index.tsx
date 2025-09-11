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
          <div className="space-y-6 text-[#4B5563] text-sm sm:text-base leading-relaxed">
            <p className="text-justify">{t('petunjukTransaksi.description')}</p>
            <p className="text-justify">{t('petunjukTransaksi.description2')}</p>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#4C4C4C]">
                {t('petunjukTransaksi.onlineRequirements')}
              </h3>
              
              <ul className="space-y-3 pl-2">
                {requirements.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-[#F2AC59] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      {typeof item === 'string' ? (
                        <span>{item}</span>
                      ) : (
                        <span>
                          {item.text}{' '}
                          <a
                            href={item.link?.url}
                            className="text-[#F2AC59] hover:underline break-all"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.link?.text}
                          </a>
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
