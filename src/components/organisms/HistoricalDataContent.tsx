import { useState, useEffect } from "react";
import { useTranslation } from 'next-i18next';
import { getHistoricalData, HistoricalData } from '@/services/historicalDataService';
import { FiFilter, FiDownload } from 'react-icons/fi';

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
    const [selectedInstrument, setSelectedInstrument] = useState('LGD Daily');
    
    const instruments = [
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await getHistoricalData();
                const sortedData = [...response.data].sort(
                    (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
                );
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

    const applyFilters = () => {
        try {
            let result = [...dataHistorical];
            
            if (selectedInstrument && selectedInstrument.trim() !== '') {
                const selected = selectedInstrument.trim().toLowerCase();
                result = result.filter(item => 
                    item.instrument && item.instrument.toString().toLowerCase() === selected
                );
            }
            
            if (fromDate) {
                const startDate = new Date(fromDate);
                result = result.filter(item => {
                    const itemDate = new Date(item.tanggal);
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
        } catch (error) {
            console.error('Error in applyFilters:', error);
            setError('Terjadi kesalahan saat memproses filter.');
        }
    };

    const handleDownload = (filtered = false) => {
        const dataToDownload = filtered ? filteredData : dataHistorical.slice(-30);
        const header = `${t('table.date')},${t('table.open')},${t('table.high')},${t('table.low')},${t('table.close')}\n`;
        const rows = dataToDownload.map(row =>
            `${row.tanggal},${row.open},${row.high},${row.low},${row.close}`
        ).join("\n");

        const blob = new Blob([header + rows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `historical-data-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
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
                            {instruments.map((instrument) => (
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

                    {/* Apply Button */}
                    <button
                        onClick={applyFilters}
                        disabled={isLoading}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-xs md:text-sm whitespace-nowrap w-full md:w-auto flex items-center gap-1.5 justify-center"
                    >
                        <FiFilter className="w-3.5 h-3.5" />
                        {isLoading ? t('messages.downloading') : t('filters.apply')}
                    </button>
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
                                    {filteredData.map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-1.5 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900 border border-black">
                                                {formatDate(row.tanggal)}
                                            </td>
                                            <td className="px-1.5 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900 border border-black">
                                                {parseFloat(row.open).toFixed(2)}
                                            </td>
                                            <td className="px-1.5 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900 border border-black">
                                                {parseFloat(row.high).toFixed(2)}
                                            </td>
                                            <td className="px-1.5 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900 border border-black">
                                                {parseFloat(row.low).toFixed(2)}
                                            </td>
                                            <td className="px-1.5 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900 border border-black">
                                                {parseFloat(row.close).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">Tidak ada data yang sesuai dengan filter</div>
                )}
            </div>
        </div>
    );
}
