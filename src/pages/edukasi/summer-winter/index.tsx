import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['summer-winter', 'common', 'footer'])),
    },
    revalidate: 60 * 60 * 24, // Revalidate every 24 hours
  };
};

const SummerWinterPage = () => {
  const { t, i18n } = useTranslation('summer-winter');
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper function to get nested translation with fallback
  const translate = (key: string, fallback: string = '') => {
    return t(key) || fallback;
  };

  // Helper function to format date and time
  const formatDateTime = (date: Date) => {
    const dayName = t(`common.days.${['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()]}`);
    const day = date.getDate();
    const month = t(`months.${['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'][date.getMonth()]}`);
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${month} ${year}`;
  };

  // Helper function to get localized date string
  const getLocalizedDate = (day: number, monthKey: string, year: number) => {
    const monthMap: {[key: string]: number} = {
      'march': 2, // JavaScript months are 0-indexed
      'october': 9,
      'november': 10
    };
    
    const date = new Date(year, monthMap[monthKey], day);
    const monthName = t(`months.${monthKey}`);
    
    // Get translated day names from the locale
    const dayNames = {
      sunday: t('common.days.sunday'),
      monday: t('common.days.monday'),
      tuesday: t('common.days.tuesday'),
      wednesday: t('common.days.wednesday'),
      thursday: t('common.days.thursday'),
      friday: t('common.days.friday'),
      saturday: t('common.days.saturday')
    };
    
    // Get the day of week (0-6, where 0 is Sunday)
    const dayOfWeek = date.getDay();
    const dayName = [
      dayNames.sunday,
      dayNames.monday,
      dayNames.tuesday,
      dayNames.wednesday,
      dayNames.thursday,
      dayNames.friday,
      dayNames.saturday
    ][dayOfWeek];
    
    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  // BST Schedule data
  const bstSchedule = [
    { year: 2010, startDay: 28, startMonth: 'march', endDay: 31, endMonth: 'october' },
    { year: 2011, startDay: 27, startMonth: 'march', endDay: 30, endMonth: 'october' },
    { year: 2012, startDay: 25, startMonth: 'march', endDay: 28, endMonth: 'october' },
    { year: 2013, startDay: 31, startMonth: 'march', endDay: 27, endMonth: 'october' },
    { year: 2014, startDay: 30, startMonth: 'march', endDay: 26, endMonth: 'october' },
    { year: 2015, startDay: 29, startMonth: 'march', endDay: 25, endMonth: 'october' },
  ].map(item => ({
    ...item,
    start: getLocalizedDate(item.startDay, item.startMonth, item.year),
    end: getLocalizedDate(item.endDay, item.endMonth, item.year)
  }));

  // US DST Schedule data
  const usDstSchedule = [
    { year: 2010, startDay: 14, startMonth: 'march', endDay: 7, endMonth: 'november' },
    { year: 2011, startDay: 13, startMonth: 'march', endDay: 6, endMonth: 'november' },
    { year: 2012, startDay: 11, startMonth: 'march', endDay: 4, endMonth: 'november' },
    { year: 2013, startDay: 10, startMonth: 'march', endDay: 3, endMonth: 'november' },
    { year: 2014, startDay: 9, startMonth: 'march', endDay: 2, endMonth: 'november' },
    { year: 2015, startDay: 8, startMonth: 'march', endDay: 1, endMonth: 'november' },
  ].map(item => ({
    ...item,
    start: getLocalizedDate(item.startDay, item.startMonth, item.year),
    end: getLocalizedDate(item.endDay, item.endMonth, item.year)
  }));

  if (!isClient) {
    return (
      <PageTemplate title={translate('title')}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate title={translate('title')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title="Summer & Winter">
          <div className="space-y-12 text-gray-700">
            {/* UK Time Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{translate('ukTime.title')}</h2>
              <div className="w-20 h-1 bg-green-500 mb-6"></div>
              <p className="mb-4">{translate('ukTime.description')}</p>
              <p className="mb-4">{translate('ukTime.intro')}</p>

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                {/* Summer Begin */}
                <div className="bg-white p-6 rounded-lg shadow-md border">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{translate('ukTime.sections.summerStart.title')}</h3>
                  <img 
                    src="/assets/musim-panas-mulai.png" 
                    alt={translate('ukTime.sections.summerStart.title')} 
                    className="w-64 h-auto rounded-md mb-4 mx-auto"
                  />
                  <p>{translate('ukTime.sections.summerStart.description')}</p>
                </div>

                {/* Summer End */}
                <div className="bg-white p-6 rounded-lg shadow-md border">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{translate('ukTime.sections.summerEnd.title')}</h3>
                  <img 
                    src="/assets/musim-panas-berakhir.png" 
                    alt={translate('ukTime.sections.summerEnd.title')}
                    className="w-64 h-auto rounded-md mb-4 mx-auto"
                  />
                  <p>{translate('ukTime.sections.summerEnd.description')}</p>
                </div>
              </div>

              <div className="mt-8 overflow-x-auto">
                <h4 className="font-bold text-lg mb-2">{translate('ukTime.sections.beforeAfterForward')}</h4>
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b">{translate('ukTime.sections.tableHeaders.date')}</th>
                      <th className="py-2 px-4 border-b">{translate('ukTime.sections.tableHeaders.time')}</th>
                      <th className="py-2 px-4 border-b">{translate('ukTime.sections.tableHeaders.dst')}</th>
                      <th className="py-2 px-4 border-b">{translate('ukTime.sections.tableHeaders.offset')}</th>
                      <th className="py-2 px-4 border-b">{translate('ukTime.sections.tableHeaders.timezone')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b">{formatDateTime(new Date(2012, 2, 25))}</td>
                      <td className="py-2 px-4 border-b">00:59:59</td>
                      <td className="py-2 px-4 border-b">{translate('common.no')}</td>
                      <td className="py-2 px-4 border-b">UTC</td>
                      <td className="py-2 px-4 border-b">GMT</td>
                    </tr>
                    <tr className="bg-green-100 font-bold">
                      <td className="py-2 px-4 border-b">01:00:00 → 02:00:00</td>
                      <td className="py-2 px-4 border-b">+1h</td>
                      <td className="py-2 px-4 border-b">+1h</td>
                      <td className="py-2 px-4 border-b">UTC+1h</td>
                      <td className="py-2 px-4 border-b">BST</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">{formatDateTime(new Date(2012, 2, 25))}</td>
                      <td className="py-2 px-4 border-b">02:00:01</td>
                      <td className="py-2 px-4 border-b">+1h</td>
                      <td className="py-2 px-4 border-b">UTC+1h</td>
                      <td className="py-2 px-4 border-b">BST</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 overflow-x-auto">
                <h4 className="font-bold text-lg mb-2">{translate('ukTime.sections.beforeAfterBackward')}</h4>
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b">{translate('ukTime.sections.tableHeaders.date')}</th>
                      <th className="py-2 px-4 border-b">{translate('ukTime.sections.tableHeaders.time')}</th>
                      <th className="py-2 px-4 border-b">{translate('ukTime.sections.tableHeaders.dst')}</th>
                      <th className="py-2 px-4 border-b">{translate('ukTime.sections.tableHeaders.offset')}</th>
                      <th className="py-2 px-4 border-b">{translate('ukTime.sections.tableHeaders.timezone')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b">{formatDateTime(new Date(2012, 9, 28))}</td>
                      <td className="py-2 px-4 border-b">01:59:59</td>
                      <td className="py-2 px-4 border-b">+1h</td>
                      <td className="py-2 px-4 border-b">UTC+1h</td>
                      <td className="py-2 px-4 border-b">BST</td>
                    </tr>
                    <tr className="bg-red-100 font-bold">
                      <td className="py-2 px-4 border-b">02:00:00 → 01:00:00</td>
                      <td className="py-2 px-4 border-b">{translate('common.no')}</td>
                      <td className="py-2 px-4 border-b">{translate('common.no')}</td>
                      <td className="py-2 px-4 border-b">UTC</td>
                      <td className="py-2 px-4 border-b">GMT</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">{formatDateTime(new Date(2012, 9, 28))}</td>
                      <td className="py-2 px-4 border-b">01:00:01</td>
                      <td className="py-2 px-4 border-b">{translate('common.no')}</td>
                      <td className="py-2 px-4 border-b">UTC</td>
                      <td className="py-2 px-4 border-b">GMT</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
                <h4 className="font-semibold text-lg mb-3">{translate('ukTime.sections.europeanFormula.title')}</h4>
                <p className="mb-2"><b>{translate('common.timeForward')}:</b> {translate('ukTime.sections.europeanFormula.start')}</p>
                <p><b>{translate('common.timeBackward')}:</b> {translate('ukTime.sections.europeanFormula.end')}</p>
                <p className="text-sm mt-4"><i>{translate('ukTime.sections.europeanFormula.note')}</i></p>
              </div>

              <div className="mt-8 overflow-x-auto">
                <h4 className="font-bold text-lg mb-2">{translate('ukTime.sections.scheduleTitle')}</h4>
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b">{translate('ukTime.sections.tableHeaders.year')}</th>
                      <th className="py-2 px-4 border-b">{translate('ukTime.sections.tableHeaders.startDate')}</th>
                      <th className="py-2 px-4 border-b">{translate('ukTime.sections.tableHeaders.endDate')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bstSchedule.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">{item.year}</td>
                        <td className="py-2 px-4 border-b">{item.start}</td>
                        <td className="py-2 px-4 border-b">{item.end}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="my-12 border-gray-300"/>

                        {/* US Time Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{translate('usTime.title')}</h2>
              <div className="w-20 h-1 bg-blue-500 mb-6"></div>
              <p className="mb-4">{translate('usTime.description')}</p>
              <p className="mb-4">{translate('usTime.intro')}</p>

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                {/* Daylight Start */}
                <div className="bg-white p-6 rounded-lg shadow-md border">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{translate('usTime.sections.daylightStart.title')}</h3>
                  <img 
                    src="/assets/musim-panas-mulai.png" 
                    alt={translate('usTime.sections.daylightStart.title')}
                    className="w-64 h-auto rounded-md mb-4 mx-auto"
                  />
                  <p>{translate('usTime.sections.daylightStart.description')}</p>
                </div>

                {/* Daylight End */}
                <div className="bg-white p-6 rounded-lg shadow-md border">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{translate('usTime.sections.daylightEnd.title')}</h3>
                  <img 
                    src="/assets/musim-panas-berakhir.png" 
                    alt={translate('usTime.sections.daylightEnd.title')}
                    className="w-64 h-auto rounded-md mb-4 mx-auto"
                  />
                  <p>{translate('usTime.sections.daylightEnd.description')}</p>
                </div>
              </div>

              <div className="mt-8 overflow-x-auto">
                <h4 className="font-bold text-lg mb-2">{translate('usTime.sections.beforeAfterForward')}</h4>
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b">{translate('usTime.sections.tableHeaders.date')}</th>
                      <th className="py-2 px-4 border-b">{translate('usTime.sections.tableHeaders.time')}</th>
                      <th className="py-2 px-4 border-b">{translate('usTime.sections.tableHeaders.dst')}</th>
                      <th className="py-2 px-4 border-b">{translate('usTime.sections.tableHeaders.offset')}</th>
                      <th className="py-2 px-4 border-b">{translate('usTime.sections.tableHeaders.timezone')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b">{formatDateTime(new Date(2012, 2, 11))}</td>
                      <td className="py-2 px-4 border-b">01:59:59</td>
                      <td className="py-2 px-4 border-b">{translate('common.no')}</td>
                      <td className="py-2 px-4 border-b">UTC-5h</td>
                      <td className="py-2 px-4 border-b">EST</td>
                    </tr>
                    <tr className="bg-green-100 font-bold">
                      <td className="py-2 px-4 border-b">02:00:00 → 03:00:00</td>
                      <td className="py-2 px-4 border-b">+1h</td>
                      <td className="py-2 px-4 border-b">{translate('common.yes')}</td>
                      <td className="py-2 px-4 border-b">UTC-4h</td>
                      <td className="py-2 px-4 border-b">EDT</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">{formatDateTime(new Date(2012, 2, 11))}</td>
                      <td className="py-2 px-4 border-b">03:00:01</td>
                      <td className="py-2 px-4 border-b">{translate('common.yes')}</td>
                      <td className="py-2 px-4 border-b">UTC-4h</td>
                      <td className="py-2 px-4 border-b">EDT</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 overflow-x-auto">
                <h4 className="font-bold text-lg mb-2">{translate('usTime.sections.beforeAfterBackward')}</h4>
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b">{translate('usTime.sections.tableHeaders.date')}</th>
                      <th className="py-2 px-4 border-b">{translate('usTime.sections.tableHeaders.time')}</th>
                      <th className="py-2 px-4 border-b">{translate('usTime.sections.tableHeaders.dst')}</th>
                      <th className="py-2 px-4 border-b">{translate('usTime.sections.tableHeaders.offset')}</th>
                      <th className="py-2 px-4 border-b">{translate('usTime.sections.tableHeaders.timezone')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b">{formatDateTime(new Date(2012, 10, 4))}</td>
                      <td className="py-2 px-4 border-b">01:59:59</td>
                      <td className="py-2 px-4 border-b">{translate('common.yes')}</td>
                      <td className="py-2 px-4 border-b">UTC-4h</td>
                      <td className="py-2 px-4 border-b">EDT</td>
                    </tr>
                    <tr className="bg-red-100 font-bold">
                      <td className="py-2 px-4 border-b">02:00:00 → 01:00:00</td>
                      <td className="py-2 px-4 border-b">{translate('common.no')}</td>
                      <td className="py-2 px-4 border-b">{translate('common.no')}</td>
                      <td className="py-2 px-4 border-b">UTC-5h</td>
                      <td className="py-2 px-4 border-b">EST</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">{formatDateTime(new Date(2012, 10, 4))}</td>
                      <td className="py-2 px-4 border-b">01:00:01</td>
                      <td className="py-2 px-4 border-b">{translate('common.no')}</td>
                      <td className="py-2 px-4 border-b">UTC-5h</td>
                      <td className="py-2 px-4 border-b">EST</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
                <h4 className="font-semibold text-lg mb-3">{translate('usTime.sections.usFormula.title')}</h4>
                <p className="mb-2"><b>{translate('common.timeForward')}:</b> {translate('usTime.sections.usFormula.start')}</p>
                <p><b>{translate('common.timeBackward')}:</b> {translate('usTime.sections.usFormula.end')}</p>
              </div>

              <div className="mt-8 overflow-x-auto">
                <h4 className="font-bold text-lg mb-2">{translate('usTime.sections.scheduleTitle')}</h4>
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b">{translate('usTime.sections.tableHeaders.year')}</th>
                      <th className="py-2 px-4 border-b">{translate('usTime.sections.tableHeaders.startDate')}</th>
                      <th className="py-2 px-4 border-b">{translate('usTime.sections.tableHeaders.endDate')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usDstSchedule.map((item, index) => (
                      <tr key={`us-${index}`}>
                        <td className="py-2 px-4 border-b">{item.year}</td>
                        <td className="py-2 px-4 border-b">{item.start}</td>
                        <td className="py-2 px-4 border-b">{item.end}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
};

export default SummerWinterPage;
