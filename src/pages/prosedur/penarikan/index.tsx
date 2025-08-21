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

export default function Penarikan() {
  const { t } = useTranslation('prosedur');
  const prosesSteps = t('penarikanDana.prosesSteps', { returnObjects: true }) as string[];

  return (
    <PageTemplate title={t('penarikanDana.title', 'Prosedur Penarikan')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('penarikanDana.title', 'Prosedur Penarikan')}>
          <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
            <div 
              className="text-justify"
              dangerouslySetInnerHTML={{ 
                __html: t('penarikanDana.description', 'Penarikan Dana (<span class="italic">Withdrawal</span>) dapat dilakukan kapan saja oleh Nasabah apabila diinginkan, dengan catatan dana yang ditarik tidak melebihi jumlah <span class="font-medium">Effective Margin</span> yang tercantum dalam laporan transaksi harian Nasabah (<span class="italic">Statement Report</span>).') 
              }} 
            />

            <div 
              className="font-semibold text-gray-800"
              dangerouslySetInnerHTML={{ 
                __html: t('penarikanDana.prosesTitle', 'Proses Penarikan Dana (<span class="italic">Withdrawal</span>)') 
              }} 
            />

            <ol className="list-decimal pl-5 sm:pl-8 space-y-4 text-justify">
              {prosesSteps.map((step: string, index: number) => (
                <li 
                  key={index} 
                  className="[&>span]:font-medium [&>span.italic]:not-italic"
                  dangerouslySetInnerHTML={{ __html: step }} 
                />
              ))}
            </ol>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
