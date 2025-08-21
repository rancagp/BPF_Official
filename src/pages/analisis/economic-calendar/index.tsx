import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'id', ['economic-calendar', 'common', 'footer'])),
    },
  };
};

export default function EconomicCalendar() {
  const { t } = useTranslation('economic-calendar');
  
  const dataKalender = [
    {
      time: "08:00",
      country: "USA",
      impact: "high",
      figures: "GDP",
      previous: "3.0%",
      forecast: "3.2%",
      actual: "3.5%",
    },
    {
      time: "09:30",
      country: "JPN",
      impact: "medium",
      figures: "CPI",
      previous: "1.1%",
      forecast: "1.3%",
      actual: "1.4%",
    },
    {
      time: "10:45",
      country: "EUR",
      impact: "low",
      figures: "PMI",
      previous: "50.1",
      forecast: "51.0",
      actual: "50.5",
    },
  ];

  const filters = [
    { key: 'today', value: t('filters.today') },
    { key: 'thisWeek', value: t('filters.thisWeek') },
    { key: 'previousWeek', value: t('filters.previousWeek') },
    { key: 'nextWeek', value: t('filters.nextWeek') },
  ];

  return (
    <PageTemplate title={t('title')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('title')}>
          <div className="space-y-5">
            {/* Filter Button Section */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:gap-3 gap-3">
              {filters.map(({ key, value }) => (
                <button
                  key={key}
                  className="w-full sm:w-fit px-4 py-2 bg-zinc-200 hover:bg-green-300 rounded-lg transition-all duration-300 text-sm md:text-base text-center"
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-zinc-200">
              <table className="w-full text-sm md:text-base min-w-[700px]">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="p-2 text-center">{t('table.time')}</th>
                    <th className="p-2 text-center">{t('table.country')}</th>
                    <th className="p-2 text-center">{t('table.impact')}</th>
                    <th className="p-2 text-center">{t('table.figures')}</th>
                    <th className="p-2 text-center">{t('table.previous')}</th>
                    <th className="p-2 text-center">{t('table.forecast')}</th>
                    <th className="p-2 text-center">{t('table.actual')}</th>
                  </tr>
                </thead>
                <tbody>
                  {dataKalender.map((item, index) => (
                    <tr key={index} className="border-b border-zinc-200 hover:bg-zinc-50">
                      <td className="p-2 text-center">{item.time}</td>
                      <td className="p-2 text-center">{item.country}</td>
                      <td className="p-2 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.impact === "high" ? 'bg-red-100 text-red-800' :
                          item.impact === "medium" ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {t(`impactLevels.${item.impact}`)}
                        </span>
                      </td>
                      <td className="p-2 text-center">{item.figures}</td>
                      <td className="p-2 text-center">{item.previous}</td>
                      <td className="p-2 text-center">{item.forecast}</td>
                      <td className="p-2 text-center font-medium">{item.actual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
