import { useState, useEffect } from "react";
import { useTranslation } from 'next-i18next';
import { getHistoricalData, HistoricalData } from '@/services/historicalDataService';

export default function HistoricalDataContent() {
    const { t } = useTranslation('historical-data');
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [dataHistorical, setDataHistorical] = useState<HistoricalData[]>([]);
    const [filteredData, setFilteredData] = useState<HistoricalData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await getHistoricalData();
                setDataHistorical(response.data);
                setFilteredData(response.data);
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
        let result = [...dataHistorical];
        
        if (fromDate) {
            result = result.filter(item => item.tanggal >= fromDate);
        }
        
        if (toDate) {
            result = result.filter(item => item.tanggal <= toDate);
        }
        
        setFilteredData(result);
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
        <div className="space-y-6">
            {/* Filter Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                    <label htmlFor="from" className="font-medium whitespace-nowrap">
                        {t('filters.from')}
                    </label>
                    <input
                        type="date"
                        id="from"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="border px-3 py-2 rounded-md"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="to" className="font-medium whitespace-nowrap">
                        {t('filters.to')}
                    </label>
                    <input
                        type="date"
                        id="to"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border px-3 py-2 rounded-md"
                    />
                </div>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors whitespace-nowrap"
                    onClick={applyFilters}
                    disabled={isLoading}
                >
                    {isLoading ? t('filters.loading') : t('filters.apply')}
                </button>
                <button
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors whitespace-nowrap"
                    onClick={() => {
                        setFromDate("");
                        setToDate("");
                    }}
                >
                    {t('filters.reset')}
                </button>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
                {isLoading ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <p className="mt-2">{t('loading')}</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">
                        {error}
                    </div>
                ) : filteredData.length > 0 ? (
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left border">{t('table.date')}</th>
                                <th className="p-3 text-left border">{t('table.open')}</th>
                                <th className="p-3 text-left border">{t('table.high')}</th>
                                <th className="p-3 text-left border">{t('table.low')}</th>
                                <th className="p-3 text-left border">{t('table.close')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row) => (
                                <tr key={row.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 border">{row.tanggal}</td>
                                    <td className="p-3 border">{parseFloat(row.open).toFixed(2)}</td>
                                    <td className="p-3 border">{parseFloat(row.high).toFixed(2)}</td>
                                    <td className="p-3 border">{parseFloat(row.low).toFixed(2)}</td>
                                    <td className="p-3 border">{parseFloat(row.close).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        {t('table.noData')}
                    </div>
                )}
            </div>

            {/* Download Button */}
            <div className="flex flex-wrap justify-end gap-3">
                <button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2 whitespace-nowrap"
                    onClick={() => handleDownload(false)}
                    disabled={isLoading || dataHistorical.length === 0}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {t('actions.downloadAll')}
                </button>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2 whitespace-nowrap"
                    onClick={() => handleDownload(true)}
                    disabled={!fromDate || !toDate || filteredData.length === 0}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {t('actions.downloadSelected')}
                </button>
            </div>
        </div>
    );
}