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
                
                // Extract unique categories from data
                const uniqueCategories = Array.from(new Set(sortedData.map(item => item.category)));
                setInstruments(uniqueCategories.sort());
                
                // Set default selected instrument if not set
                if (uniqueCategories.length > 0 && !selectedInstrument) {
                    setSelectedInstrument(uniqueCategories[0]);
                }
                
                setDataHistorical(sortedData);
                setFilteredData(sortedData);
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
        setSelectedInstrument('');
        setFilteredData([...dataHistorical]);
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
                            className="w-full text-xs md:text-sm px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="">Semua Instrumen</option>
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
                            className="text-xs md:text-sm px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full md:w-36"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                            type="date"
                            id="to"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="text-xs md:text-sm px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full md:w-36"
                        />
                    </div>

                    {/* Apply & Reset Buttons */}
                    <div className="flex gap-2 w-full md:w-auto">
                        <button
                            onClick={applyFilters}
                            disabled={isLoading}
                            className="flex-1 md:flex-none px-3 py-1.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-xs md:text-sm whitespace-nowrap flex items-center justify-center gap-1.5"
                        >
                            <FiFilter className="w-3.5 h-3.5" />
                            <span className="truncate">{t('filters.apply')}</span>
                        </button>
                        <button
                            onClick={resetFilters}
                            disabled={isLoading || (!fromDate && !toDate && !selectedInstrument)}
                            className="flex-1 md:flex-none px-3 py-1.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-xs md:text-sm whitespace-nowrap flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="truncate">Reset</span>
                        </button>
                    </div>
                </div>

                {/* Download Button - Pushed to right */}
                <div className="flex justify-end">
                    <button
                        onClick={() => handleDownload(true)}
                        disabled={isLoading || filteredData.length === 0}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-xs md:text-sm whitespace-nowrap w-full md:w-auto flex items-center gap-1.5 justify-center"
                    >
                        <FiDownload className="w-3.5 h-3.5" />
                        {t('actions.downloadAll')}
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto -mx-1 md:mx-0">
                {isLoading ? (
                    <div className="text-center py-8">Memuat data...</div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">{error}</div>
                ) : filteredData.length > 0 ? (
                    <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-[10px] sm:text-xs md:text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-2 py-2 border border-black text-left text-xs font-bold text-black uppercase tracking-wider">
                                            {t('table.date')}
                                        </th>
                                        <th className="px-2 py-2 border border-black text-left text-xs font-bold text-black uppercase tracking-wider">
                                            {t('table.open')}
                                        </th>
                                        <th className="px-2 py-2 border border-black text-left text-xs font-bold text-black uppercase tracking-wider">
                                            {t('table.high')}
                                        </th>
                                        <th className="px-2 py-2 border border-black text-left text-xs font-bold text-black uppercase tracking-wider">
                                            {t('table.low')}
                                        </th>
                                        <th className="px-2 py-2 border border-black text-left text-xs font-bold text-black uppercase tracking-wider">
                                            {t('table.close')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* Menghitung indeks untuk pagination */}
                                    {filteredData
                                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                        .map((row: HistoricalData, index: number) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-1.5 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900 border border-black">
                                                {formatDate(row.tanggal)}
                                            </td>
                                            <td className="px-1.5 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900 border border-black">
                                                {Number(row.open).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className="px-1.5 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900 border border-black">
                                                {Number(row.high).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className="px-1.5 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900 border border-black">
                                                {Number(row.low).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className="px-1.5 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900 border border-black">
                                                {Number(row.close).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination */}
                        {filteredData.length > itemsPerPage && (
                            <div className="flex items-center justify-between px-2 py-3 bg-white border-t border-gray-200 sm:px-6">
                                {/* Mobile and Desktop Pagination */}
                                <div className="w-full sm:hidden">
                                    <div className="flex justify-between items-center">
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            &larr;
                                        </button>
                                        
                                        <div className="flex space-x-1">
                                            {Array.from({ length: Math.min(3, Math.ceil(filteredData.length / itemsPerPage)) }, (_, i) => {
                                                // Show first, last and current page with neighbors
                                                let pageNum;
                                                if (currentPage <= 2) {
                                                    pageNum = i + 1;
                                                } else if (currentPage >= Math.ceil(filteredData.length / itemsPerPage) - 1) {
                                                    pageNum = Math.ceil(filteredData.length / itemsPerPage) - 2 + i;
                                                } else {
                                                    pageNum = currentPage - 1 + i;
                                                }
                                                
                                                if (pageNum > 0 && pageNum <= Math.ceil(filteredData.length / itemsPerPage)) {
                                                    return (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => paginate(pageNum)}
                                                            className={`px-3 py-1 text-sm rounded-md ${
                                                                currentPage === pageNum
                                                                    ? 'bg-emerald-600 text-white'
                                                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    );
                                                }
                                                return null;
                                            })}
                                            
                                            {Math.ceil(filteredData.length / itemsPerPage) > 3 && currentPage < Math.ceil(filteredData.length / itemsPerPage) - 1 && (
                                                <span className="px-2 py-1">...</span>
                                            )}
                                            
                                            {Math.ceil(filteredData.length / itemsPerPage) > 3 && currentPage < Math.ceil(filteredData.length / itemsPerPage) - 2 && (
                                                <button
                                                    onClick={() => paginate(Math.ceil(filteredData.length / itemsPerPage))}
                                                    className="px-3 py-1 text-sm bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                                                >
                                                    {Math.ceil(filteredData.length / itemsPerPage)}
                                                </button>
                                            )}
                                        </div>
                                        
                                        <button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage * itemsPerPage >= filteredData.length}
                                            className="relative inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            &rarr;
                                        </button>
                                    </div>
                                    
                                    <div className="mt-2 text-center text-sm text-gray-700">
                                        Halaman {currentPage} dari {Math.ceil(filteredData.length / itemsPerPage)}
                                    </div>
                                </div>
                                
                                {/* Desktop Pagination */}
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Menampilkan <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-medium">{
                                                Math.min(currentPage * itemsPerPage, filteredData.length)
                                            }</span> dari <span className="font-medium">{filteredData.length}</span> hasil
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                            <button
                                                onClick={() => paginate(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <span className="sr-only">Sebelumnya</span>
                                                &larr;
                                            </button>
                                            {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => i + 1).map((number) => (
                                                <button
                                                    key={number}
                                                    onClick={() => paginate(number)}
                                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                        currentPage === number
                                                            ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    } border`}
                                                >
                                                    {number}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => paginate(currentPage + 1)}
                                                disabled={currentPage * itemsPerPage >= filteredData.length}
                                                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                ) : (
                    <div className="text-center py-8 text-gray-500">Tidak ada data yang sesuai dengan filter</div>
                )}
            </div>
        </div>
    );
}
