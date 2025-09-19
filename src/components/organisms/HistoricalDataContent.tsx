import { useState, useEffect } from "react";
import { useTranslation } from 'next-i18next';
import { getHistoricalData } from '@/services/historicalDataService';
import { FiFilter, FiDownload } from 'react-icons/fi';

interface HistoricalData {
    id: number;
    tanggal: string;
    open: string;
    high: string;
    low: string;
    close: string;
    category: string;
    created_at: string;
    updated_at: string;
}

const formatDate = (dateString: string): string => {
    try {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error('Invalid date string:', dateString);
            return dateString;
        }
        const options: Intl.DateTimeFormatOptions = { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric',
            timeZone: 'UTC'
        };
        return date.toLocaleDateString('en-GB', options);
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
};

export default function HistoricalDataContent() {
    const { t } = useTranslation('historical-data');
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [dataHistorical, setDataHistorical] = useState<HistoricalData[]>([]);
    const [filteredData, setFilteredData] = useState<HistoricalData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedInstrument, setSelectedInstrument] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 8;
    
    const [instruments, setInstruments] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await getHistoricalData();
                const sortedData = [...response.data].sort(
                    (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
                );
                
                // Define the instrument order
                const instrumentOrder = [
                    'LGD Daily',
                    'BCO Daily',
                    'LSI Daily',
                    'HSI Daily',
                    'SNI Daily',
                    'USD/CHF',
                    'USD/JPY',
                    'GBP/USD',
                    'AUD/USD',
                    'EUR/USD'
                ];
                
                // Extract unique categories from data and sort according to the defined order
                const uniqueCategories = Array.from(new Set(sortedData.map(item => item.category)));
                
                // Sort the categories based on the defined order
                const sortedInstruments = uniqueCategories.sort((a, b) => {
                    const indexA = instrumentOrder.indexOf(a);
                    const indexB = instrumentOrder.indexOf(b);
                    
                    // If both are in the order list, sort them according to the list
                    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                    // If only a is in the list, it comes first
                    if (indexA !== -1) return -1;
                    // If only b is in the list, it comes first
                    if (indexB !== -1) return 1;
                    // If neither is in the list, sort alphabetically
                    return a.localeCompare(b);
                });
                
                setInstruments(sortedInstruments);
                
                // Determine default instrument (prefer 'LGD Daily' if available)
                const defaultInstrument = sortedInstruments.includes('LGD Daily')
                    ? 'LGD Daily'
                    : (sortedInstruments[0] || '');

                // Set selected instrument and filter data accordingly
                if (defaultInstrument) {
                    setSelectedInstrument(defaultInstrument);
                }

                setDataHistorical(sortedData);
                setFilteredData(
                    defaultInstrument
                        ? sortedData.filter(item => item.category === defaultInstrument)
                        : sortedData
                );
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Gagal memuat data. Silakan coba lagi nanti.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fungsi untuk mengubah halaman
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset ke halaman pertama saat filter berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedInstrument, fromDate, toDate]);

    const applyFilters = () => {
        try {
            let result = [...dataHistorical];
            
            // Filter by instrument
            if (selectedInstrument && selectedInstrument.trim() !== '') {
                result = result.filter(item => 
                    item.category === selectedInstrument
                );
            }
            
            // Filter by date range
            if (fromDate) {
                const startDate = new Date(fromDate);
                startDate.setHours(0, 0, 0, 0);
                result = result.filter(item => {
                    const itemDate = new Date(item.tanggal);
                    itemDate.setHours(0, 0, 0, 0);
                    return itemDate >= startDate;
                });
            }
            
            if (toDate) {
                const endDate = new Date(toDate);
                endDate.setHours(23, 59, 59, 999);
                result = result.filter(item => {
                    const itemDate = new Date(item.tanggal);
                    return itemDate <= endDate;
                });
            }
            
            setFilteredData(result);
            // Setelah filter, reset ke halaman pertama
            setCurrentPage(1);
        } catch (error) {
            console.error('Error in applyFilters:', error);
            setError('Terjadi kesalahan saat memproses filter.');
        }
    };

    const resetFilters = () => {
        setFromDate('');
        setToDate('');
        // Default back to LGD Daily or first instrument
        const defaultInstrument = instruments.includes('LGD Daily') ? 'LGD Daily' : (instruments[0] || '');
        setSelectedInstrument(defaultInstrument);
        setFilteredData(
            defaultInstrument
                ? dataHistorical.filter(item => item.category === defaultInstrument)
                : [...dataHistorical]
        );
        setCurrentPage(1);
    };

    const handleDownload = (filtered = false) => {
        try {
            const dataToDownload = filtered ? [...filteredData] : [...dataHistorical].slice(-30);
            if (dataToDownload.length === 0) {
                throw new Error('Tidak ada data yang tersedia untuk diunduh');
            }
            const header = `${t('table.date')},${t('table.open')},${t('table.high')},${t('table.low')},${t('table.close')}\n`;
            const rows = dataToDownload.map((row: HistoricalData) =>
                `${row.tanggal},${row.open},${row.high},${row.low},${row.close}`
            ).join("\n");

            const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `historical-data-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading data:', err);
            setError('Gagal mengunduh data. ' + (err instanceof Error ? err.message : ''));
        }
    };

    // Hitung total halaman
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    // Ambil data untuk halaman saat ini
    const currentItems = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-4 px-1 py-2 md:p-4">
            {/* Filter Section */}
            <div className="flex flex-col md:flex-row gap-2 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-1 flex-col md:flex-row gap-2">
                    {/* Instrument Selector */}
                    <div className="w-full md:w-auto">
                        <select
                            id="instrument"
                            value={selectedInstrument}
                            onChange={(e) => setSelectedInstrument(e.target.value)}
                            className="w-full text-xs md:text-sm px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2AC59] focus:border-[#F2AC59]"
                        >
                            {instruments.map((instrument: string) => (
                                <option key={instrument} value={instrument}>
                                    {instrument}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <input
                            type="date"
                            id="from"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="text-xs md:text-sm px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2AC59] focus:border-[#F2AC59] w-full md:w-36"
                        />
                        <span className="text-gray-500">{t('filters.to')}</span>
                        <input
                            type="date"
                            id="to"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="text-xs md:text-sm px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2AC59] focus:border-[#F2AC59] w-full md:w-36"
                        />
                    </div>

                    {/* Apply & Reset Buttons */}
                    <div className="flex gap-2 w-full md:w-auto">
                        <button
                            onClick={applyFilters}
                            disabled={isLoading}
                            className="flex-1 md:flex-none px-3 py-1.5 bg-[#F2AC59] text-white rounded-md hover:bg-[#E09B4A] transition-colors text-xs md:text-sm whitespace-nowrap flex items-center justify-center gap-1.5"
                        >
                            <FiFilter className="w-3.5 h-3.5" />
                            <span className="truncate">{t('filters.apply')}</span>
                        </button>
                        <button
                            onClick={resetFilters}
                            disabled={isLoading || (!fromDate && !toDate && !selectedInstrument)}
                            className="flex-1 md:flex-none px-3 py-1.5 bg-[#F2AC59] text-white rounded-md hover:bg-[#E09B4A] transition-colors text-xs md:text-sm whitespace-nowrap flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="truncate">{t('filters.reset')}</span>
                        </button>
                    </div>
                </div>

                {/* Download Button - Pushed to right */}
                <div className="flex justify-end">
                    <button
                        onClick={() => handleDownload(true)}
                        disabled={isLoading || filteredData.length === 0}
                        className="px-3 py-1.5 bg-[#F2AC59] text-white rounded-md hover:bg-[#E09B4A] transition-colors text-xs md:text-sm whitespace-nowrap w-full md:w-auto flex items-center gap-1.5 justify-center"
                    >
                        <FiDownload className="w-3.5 h-3.5" />
                        {t('actions.downloadAll')}
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 text-sm text-red-600 bg-red-50 rounded-md">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#F2AC59]"></div>
                </div>
            ) : (
                /* Data Table */
                <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[#E5E7EB]">
                            <thead className="bg-[#4C4C4C]">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Open
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        High
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Low
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Close
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-[#E5E7EB]">
                                {currentItems.map((item, index) => (
                                    <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB] hover:bg-[#FFF9F5]'}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-[#4C4C4C]">
                                            {formatDate(item.tanggal)}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-[#4C4C4C]">
                                            {item.open}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-[#4C4C4C]">
                                            {item.high}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-[#4C4C4C]">
                                            {item.low}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-[#4C4C4C]">
                                            {item.close}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredData.length > itemsPerPage && (
                        <div className="flex items-center justify-between px-2 py-3 bg-white border-t border-[#E5E7EB] sm:px-6">
                            {/* Mobile Pagination */}
                            <div className="w-full sm:hidden">
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'text-[#9B9FA7] cursor-not-allowed' : 'text-[#4C4C4C] hover:bg-[#F5F5F5]'}`}
                                    >
                                        &larr; Sebelumnya
                                    </button>
                                    
                                    <div className="text-sm text-[#4C4C4C]">
                                        Halaman {currentPage} dari {totalPages}
                                    </div>
                                    
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'text-[#9B9FA7] cursor-not-allowed' : 'text-[#4C4C4C] hover:bg-[#F5F5F5]'}`}
                                    >
                                        Selanjutnya &rarr;
                                    </button>
                                </div>
                            </div>
                            
                            {/* Desktop Pagination */}
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-[#4C4C4C]">
                                        Menampilkan <span className="font-medium">
                                            {(currentPage - 1) * itemsPerPage + 1}
                                        </span> - <span className="font-medium">
                                            {Math.min(currentPage * itemsPerPage, filteredData.length)}
                                        </span> dari <span className="font-medium">
                                            {filteredData.length}
                                        </span> hasil
                                    </p>
                                </div>
                                
                                <div>
                                    <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-[#4C4C4C] bg-white border border-[#9B9FA7] rounded-l-md hover:bg-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <span className="sr-only">Sebelumnya</span>
                                            &larr;
                                        </button>
                                        
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }
                                            
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => paginate(pageNum)}
                                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                        currentPage === pageNum
                                                            ? 'z-10 bg-[#F2AC59] border-[#F2AC59] text-white'
                                                            : 'bg-white border-[#9B9FA7] text-[#4C4C4C] hover:bg-[#F5F5F5]'
                                                    } border`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                        
                                        <button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-[#4C4C4C] bg-white border border-[#9B9FA7] rounded-r-md hover:bg-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <span className="sr-only">Selanjutnya</span>
                                            &rarr;
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {/* No Data Message */}
            {!isLoading && filteredData.length === 0 && (
                <div className="text-center py-8">{t('messages.noData')}</div>
            )}
        </div>
    );
}
