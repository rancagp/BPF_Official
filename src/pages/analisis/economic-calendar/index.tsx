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

  // Format impact menjadi bintang dengan warna yang sesuai
  const formatImpact = (impact: string) => {
    if (!impact) return <span className="text-gray-300">★☆☆</span>;
    
    const getImpactColor = (level: string) => {
      switch (level.toLowerCase()) {
        case 'high':
          return 'text-[#FF0000]';
        case 'medium':
          return 'text-[#FFA500]';
        case 'low':
          return 'text-[#008000]';
        default:
          return 'text-gray-300';
      }
    };
    
    const colorClass = getImpactColor(impact);
    
    switch (impact.toLowerCase()) {
      case 'high':
        return <span className={`${colorClass} font-bold`}>★★★</span>;
      case 'medium':
        return <span className={`${colorClass} font-bold`}>★★<span className="text-gray-300">☆</span></span>;
      case 'low':
        return <span className={`${colorClass} font-bold`}>★<span className="text-gray-300">☆☆</span></span>;
      default:
        return <span className="text-gray-300">★☆☆</span>;
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
              <div className="bg-[#FFF5F5] border-l-4 border-[#FF0000] p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-[#FF0000]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-[#080031]">
                      {t('noDataMessage')}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Tampilkan semua data */}
              <div className="overflow-hidden rounded-lg border border-[#E5E7EB] shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#080031]">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          {t('table.date')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          {t('table.time')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          {t('table.country')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          {t('table.impact')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          {t('table.figures')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {events.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatDate(event.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {event.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                              {event.country}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {formatImpact(event.impact)}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="font-medium text-gray-900">{event.figures}</div>
                            {event.actual && (
                              <div className="text-xs text-gray-500 mt-1">
                                <span className="font-medium">{t('table.actual')}:</span> {event.actual}
                              </div>
                            )}
                            {event.forecast && (
                              <div className="text-xs text-gray-500">
                                <span className="font-medium">{t('table.forecast')}:</span> {event.forecast}
                              </div>
                            )}
                            {event.previous && (
                              <div className="text-xs text-gray-500">
                                <span className="font-medium">{t('table.previous')}:</span> {event.previous}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => handleFilterClick(filter.key)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === filter.key
                      ? 'bg-[#FF0000] text-white shadow-md hover:bg-[#E60000]'
                      : 'bg-white text-[#080031] border border-[#080031] hover:bg-gray-50'
                  }`}
                >
                  {filter.value}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0000]"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-[#FF0000] p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-[#FF0000]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-[#080031]">{error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#080031]">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          {t('table.date')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          {t('table.time')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          {t('table.country')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          {t('table.impact')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          {t('table.figures')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredEvents.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatDate(event.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {event.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                              {event.country}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {formatImpact(event.impact)}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="font-medium text-gray-900">{event.figures}</div>
                            {event.actual && (
                              <div className="text-xs text-gray-500 mt-1">
                                <span className="font-medium">{t('table.actual')}:</span> {event.actual}
                              </div>
                            )}
                            {event.forecast && (
                              <div className="text-xs text-gray-500">
                                <span className="font-medium">{t('table.forecast')}:</span> {event.forecast}
                              </div>
                            )}
                            {event.previous && (
                              <div className="text-xs text-gray-500">
                                <span className="font-medium">{t('table.previous')}:</span> {event.previous}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
