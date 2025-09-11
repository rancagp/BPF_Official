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
          return 'text-red-500';
        case 'medium':
          return 'text-yellow-500';
        case 'low':
          return 'text-green-500';
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
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      {t('noDataMessage')}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Tampilkan semua data */}
              <div className="overflow-hidden rounded-lg border border-[#E5E7EB] shadow-sm">
                <table className="min-w-full divide-y divide-[#E5E7EB]">
                  <thead className="bg-[#4C4C4C]">
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
                  <tbody className="bg-white divide-y divide-[#E5E7EB]">
                    {events.map((event) => (
                      <tr key={event.id} className="hover:bg-[#FFF9F0] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4C4C4C] font-medium">
                          {formatDate(event.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4C4C4C]">
                          {event.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-[#F5F5F5] text-[#4C4C4C]">
                            {event.country}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {formatImpact(event.impact)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="font-medium text-[#4C4C4C]">{event.figures}</div>
                          {event.actual && (
                            <div className="text-xs text-[#9B9FA7] mt-1">
                              <span className="font-medium">{t('table.actual')}:</span> {event.actual}
                            </div>
                          )}
                          {event.forecast && (
                            <div className="text-xs text-[#9B9FA7]">
                              <span className="font-medium">{t('table.forecast')}:</span> {event.forecast}
                            </div>
                          )}
                          {event.previous && (
                            <div className="text-xs text-[#9B9FA7]">
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
                      ? 'bg-[#F2AC59] text-white shadow-md'
                      : 'bg-[#F5F5F5] text-[#4C4C4C] hover:bg-[#E5E7EB]'
                  }`}
                >
                  {filter.value}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F2AC59]"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-[#E5E7EB] shadow-sm">
                <table className="min-w-full divide-y divide-[#E5E7EB]">
                  <thead className="bg-[#4C4C4C]">
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
                  <tbody className="bg-white divide-y divide-[#E5E7EB]">
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-[#FFF9F0] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4C4C4C] font-medium">
                          {formatDate(event.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4C4C4C]">
                          {event.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-[#F5F5F5] text-[#4C4C4C]">
                            {event.country}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {formatImpact(event.impact)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="font-medium text-[#4C4C4C]">{event.figures}</div>
                          {event.actual && (
                            <div className="text-xs text-[#9B9FA7] mt-1">
                              <span className="font-medium">{t('table.actual')}:</span> {event.actual}
                            </div>
                          )}
                          {event.forecast && (
                            <div className="text-xs text-[#9B9FA7]">
                              <span className="font-medium">{t('table.forecast')}:</span> {event.forecast}
                            </div>
                          )}
                          {event.previous && (
                            <div className="text-xs text-[#9B9FA7]">
                              <span className="font-medium">{t('table.previous')}:</span> {event.previous}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
