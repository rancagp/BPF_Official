import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import Image from "next/image";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'id', ['mekanisme-perdagangan', 'common', 'footer'])),
  },
});

const MekanismePerdaganganPage = () => {
    const { t } = useTranslation('mekanisme-perdagangan');
    const tableData = t('comparison.rows', { returnObjects: true });

    return (
        <PageTemplate title={`${t('title')} - PT. Kresna Berjangka Investama`}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('title')}>
                    <div className="space-y-12">
                        {/* Explanation Section */}
                        <div className="grid md:grid-cols-2 gap-8 text-base">
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                    {t('multilateral.title')}
                                </h2>
                                <p className="text-gray-700">
                                    {t('multilateral.description')}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                    {t('bilateral.title')}
                                </h2>
                                <p className="text-gray-700">
                                    {t('bilateral.description')}
                                </p>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                                {t('comparison.title')}
                            </h2>
                            <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
                            <div className="overflow-x-auto max-w-4xl mx-auto">
                                <table className="w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-300 p-2 font-bold text-center">
                                                {t('multilateral.tableHeader')}
                                            </th>
                                            <th className="border border-gray-300 p-2 font-bold text-center">
                                                {t('bilateral.tableHeader')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(tableData) && tableData.map((row: any, index: number) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="border border-gray-300 p-2">{row.multilateral}</td>
                                                <td className="border border-gray-300 p-2">{row.bilateral}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Flowchart Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                                {t('flow.title')}
                            </h2>
                            <div className="w-20 h-1 bg-green-500 mx-auto mb-8"></div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                    <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                                        {t('multilateral.flowTitle')}
                                    </h3>
                                    <Image 
                                        src="/assets/alur-perdagangan-multi.jpg" 
                                        alt={t('multilateral.flowTitle')} 
                                        width={800} 
                                        height={600} 
                                        layout="responsive" 
                                        className="rounded-md" 
                                    />
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                    <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                                        {t('bilateral.flowTitle')}
                                    </h3>
                                    <Image 
                                        src="/assets/alur-perdagangan-bila.jpg" 
                                        alt={t('bilateral.flowTitle')} 
                                        width={800} 
                                        height={600} 
                                        layout="responsive" 
                                        className="rounded-md" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
};

export default MekanismePerdaganganPage;
