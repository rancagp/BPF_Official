import { useState } from "react";
import { useTranslation } from 'next-i18next';

export default function HistoricalDataContent() {
    const { t } = useTranslation('historical-data');
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const dataHistorical = [
        { date: "2025-06-30", open: 1850.5, high: 1863.2, low: 1842.7, close: 1859.4 },
        { date: "2025-06-29", open: 1839.0, high: 1852.1, low: 1831.2, close: 1845.9 },
        { date: "2025-06-28", open: 1822.5, high: 1841.8, low: 1810.3, close: 1832.6 },
    ];

    const handleDownload = () => {
        const last30 = dataHistorical.slice(-30);
        const header = `${t('table.date')},${t('table.open')},${t('table.high')},${t('table.low')},${t('table.close')}\n`;
        const rows = last30.map(row =>
            `${row.date},${row.open},${row.high},${row.low},${row.close}`
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
                    onClick={() => {}}
                >
                    {t('filters.apply')}
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
                {dataHistorical.length > 0 ? (
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
                            {dataHistorical.map((row, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-3 border">{row.date}</td>
                                    <td className="p-3 border">{row.open}</td>
                                    <td className="p-3 border">{row.high}</td>
                                    <td className="p-3 border">{row.low}</td>
                                    <td className="p-3 border">{row.close}</td>
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
                    onClick={handleDownload}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {t('actions.downloadAll')}
                </button>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2 whitespace-nowrap"
                    onClick={handleDownload}
                    disabled={!fromDate || !toDate}
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