import React, { useState, useEffect } from 'react';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { fetchEconomicCalendar, EconomicEvent } from '@/services/economicCalendarService';
import { addDays, isToday, isThisWeek, isSameWeek } from 'date-fns';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'id', ['economic-calendar', 'common', 'footer'])),
    },
  };
};

export default function EconomicCalendar() {
  const { t } = useTranslation('economic-calendar');
  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EconomicEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('today');

  const filters = [
    { key: 'today', value: t('filters.today') },
    { key: 'thisWeek', value: t('filters.thisWeek') },
    { key: 'previousWeek', value: t('filters.previousWeek') },
    { key: 'nextWeek', value: t('filters.nextWeek') },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchEconomicCalendar();
        console.log('Data from API:', data); // Log data dari API
        setEvents(data);
        setFilteredEvents(data); // Set data awal ke filteredEvents
        setError(null);
      } catch (err) {
        console.error('Error loading economic calendar:', err);
        setError('Gagal memuat data kalender ekonomi. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (events.length === 0) return;

    console.log('Applying filter:', activeFilter); // Log filter aktif
    const now = new Date();
    let filtered: EconomicEvent[] = [];

    // Fungsi untuk memeriksa apakah tanggal event sesuai dengan filter
    const getEventDate = (event: EconomicEvent) => {
      try {
        // Buat tanggal dalam format YYYY-MM-DDTHH:mm
        const dateTimeString = `${event.date}T${event.time}`;
        const eventDate = new Date(dateTimeString);
        
        // Validasi tanggal
        if (isNaN(eventDate.getTime())) {
          console.error('Invalid date/time:', event.date, event.time);
          return new Date(); // Kembalikan tanggal sekarang sebagai fallback
        }
        
        console.log('Event:', event.figures, 'Date:', eventDate);
        return eventDate;
      } catch (error) {
        console.error('Error parsing date:', error, event);
        return new Date(); // Kembalikan tanggal sekarang sebagai fallback
      }
    };

    switch (activeFilter) {
      case 'today':
        filtered = events.filter(event => {
          const eventDate = getEventDate(event);
          const isTodayEvent = isToday(eventDate);
          console.log('Event date:', eventDate, 'isToday:', isTodayEvent);
          return isTodayEvent;
        });
        break;
      case 'thisWeek':
        filtered = events.filter(event => {
          const eventDate = getEventDate(event);
          return isThisWeek(eventDate, { weekStartsOn: 1 });
        });
        break;
      case 'previousWeek':
        const lastWeek = addDays(now, -7);
        filtered = events.filter(event => {
          const eventDate = getEventDate(event);
          return isSameWeek(eventDate, lastWeek, { weekStartsOn: 1 });
        });
        break;
      case 'nextWeek':
        const nextWeek = addDays(now, 7);
        filtered = events.filter(event => {
          const eventDate = getEventDate(event);
          return isSameWeek(eventDate, nextWeek, { weekStartsOn: 1 });
        });
        break;
      default:
        filtered = [...events]; // Buat salinan baru dari array events
    }

    console.log('Filtered events:', filtered); // Log hasil filter
    setFilteredEvents(filtered);
  }, [activeFilter, events]);

  const handleFilterClick = (filterKey: string) => {
    setActiveFilter(filterKey);
  };

  // Format tanggal dari YYYY-MM-DD ke DD-MM-YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Pastikan tanggal valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
      return 'Invalid Date';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Format impact menjadi bintang
  const formatImpact = (impact: string) => {
    if (!impact) return '★☆☆';
    switch (impact.toLowerCase()) {
      case 'high':
        return '★★★';
      case 'medium':
        return '★★☆';
      case 'low':
        return '★☆☆';
      default:
        return '★☆☆';
    }
  };
  
  // Tampilkan semua data jika tidak ada filter yang cocok
  if (filteredEvents.length === 0 && events.length > 0) {
    console.log('No events match the current filter. Showing all events.');
    return (
      <PageTemplate title={t('title')}>
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
          <ProfilContainer title={t('title')}>
            <div className="space-y-5">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Tidak ada data yang cocok dengan filter yang dipilih. Menampilkan semua data yang tersedia.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Tampilkan semua data */}
              <div className="overflow-x-auto rounded-lg border border-zinc-200">
                <table className="w-full text-sm md:text-base min-w-[700px]">
                  <thead className="bg-green-600 text-white">
                    <tr>
                      <th className="p-3 text-center">Date</th>
                      <th className="p-3 text-center">Time</th>
                      <th className="p-3 text-center">Country</th>
                      <th className="p-3 text-center">Impact</th>
                      <th className="p-3 text-left">Figures</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id} className="border-b border-zinc-200 hover:bg-zinc-50">
                        <td className="p-3 text-center whitespace-nowrap">
                          {formatDate(event.date)}
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          {event.time}
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          {event.country}
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          <span className="text-yellow-500 font-bold">
                            {formatImpact(event.impact)}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="font-medium">{event.figures}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            <span>Previous: <span className="font-medium">{event.previous}</span></span>
                            <span className="mx-2">|</span>
                            <span>Forecast: <span className="font-medium">{event.forecast}</span></span>
                            <span className="mx-2">|</span>
                            <span>Actual: <span className="font-medium">
                              {event.actual}
                            </span></span>
                          </div>
                          {event.measures && (
                            <div className="text-xs text-gray-500 mt-1">
                              {event.measures}
                            </div>
                          )}
                        </td>
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
                  onClick={() => handleFilterClick(key)}
                  className={`w-full sm:w-fit px-4 py-2 rounded-lg transition-all duration-300 text-sm md:text-base text-center ${
                    activeFilter === key
                      ? 'bg-green-600 text-white'
                      : 'bg-zinc-200 hover:bg-green-300'
                  }`}
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
                    <th className="p-3 text-center">Date</th>
                    <th className="p-3 text-center">Time</th>
                    <th className="p-3 text-center">Country</th>
                    <th className="p-3 text-center">Impact</th>
                    <th className="p-3 text-left">Figures</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center">
                        <div className="flex justify-center items-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-red-500">
                        {error}
                      </td>
                    </tr>
                  ) : filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        Tidak ada data yang tersedia untuk periode ini.
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((event) => (
                      <React.Fragment key={event.id}>
                        <tr className="border-b border-zinc-200 hover:bg-zinc-50">
                          <td className="p-3 text-center whitespace-nowrap">
                            {formatDate(event.date)}
                          </td>
                          <td className="p-3 text-center whitespace-nowrap">
                            {event.time}
                          </td>
                          <td className="p-3 text-center whitespace-nowrap">
                            {event.country}
                          </td>
                          <td className="p-3 text-center whitespace-nowrap">
                            <span className="text-yellow-500 font-bold">
                              {formatImpact(event.impact)}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="font-medium">{event.figures}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              <span>Previous: <span className="font-medium">{event.previous}</span></span>
                              <span className="mx-2">|</span>
                              <span>Forecast: <span className="font-medium">{event.forecast}</span></span>
                              <span className="mx-2">|</span>
                              <span>Actual: <span className={`font-medium ${
                                event.actual > event.forecast 
                                  ? 'text-green-600' 
                                  : event.actual < event.forecast 
                                    ? 'text-red-600' 
                                    : 'text-gray-800'
                              }`}>
                                {event.actual}
                              </span></span>
                            </div>
                            {event.measures && (
                              <div className="text-xs text-gray-500 mt-1">
                                {event.measures}
                              </div>
                            )}
                            {event.usual_effect && (
                              <div className="text-xs text-blue-600 mt-1">
                                {event.usual_effect}
                              </div>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
