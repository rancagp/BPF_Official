import React, { useState } from "react";
import { useTranslation } from 'next-i18next';

// Definisikan tipe untuk input dan hasil
type PivotInput = { [key: string]: string };
type PivotResult = { [key: string]: number | string };

export default function PivotSection() {
    const { t } = useTranslation('pivot-fibonacci');
    const [inputs, setInputs] = useState<PivotInput>({ 
        high: "", 
        low: "", 
        close: "",
        open: "" 
    });
    const [results, setResults] = useState<{
        classic: PivotResult;
        woodie: PivotResult;
        camarilla: PivotResult;
    } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Hanya izinkan angka dan satu titik desimal
        if (/^\d*\.?\d*$/.test(value)) {
            setInputs(prev => ({ ...prev, [name]: value }));
        }
    };

    const calculatePivots = () => {
        const high = parseFloat(inputs.high);
        const low = parseFloat(inputs.low);
        const close = parseFloat(inputs.close);
        const open = parseFloat(inputs.open);

        if (isNaN(high) || isNaN(low) || isNaN(close) || isNaN(open)) {
            alert(t('pivot.fillAllFields', { defaultValue: 'Please fill in all required fields with valid numbers.' }));
            return;
        }

        const range = high - low;

        // Classic Pivots (Updated Formulas)
        const classicPP = (high + low + close) / 3;
        const classicR1 = (2 * classicPP) - low;
        const classicS1 = (2 * classicPP) - high;
        const classicR2 = classicPP + range;
        const classicS2 = classicPP - range;
        const classicR3 = classicR1 + range;
        const classicS3 = classicS1 - range;
        const classicR4 = classicR2 + range * 1.618;  // Extended level using Fibonacci
        const classicS4 = classicS2 - range * 1.618;  // Extended level using Fibonacci

        // Woodie Pivots
        const woodiePP = (high + low + 2 * open) / 4;
        const woodieR1 = (2 * woodiePP) - low;
        const woodieS1 = (2 * woodiePP) - high;
        const woodieR2 = woodiePP + range;
        const woodieS2 = woodiePP - range;
        const woodieR3 = woodieR1 + range;
        const woodieS3 = woodieS1 - range;
        const woodieR4 = woodieR2 + range;
        const woodieS4 = woodieS2 - range;

        // Camarilla Pivots (Unchanged)
        const camarillaR4 = close + (range * 1.1) / 2;
        const camarillaR3 = close + (range * 1.1) / 4;
        const camarillaR2 = close + (range * 1.1) / 6;
        const camarillaR1 = close + (range * 1.1) / 12;
        const camarillaS1 = close - (range * 1.1) / 12;
        const camarillaS2 = close - (range * 1.1) / 6;
        const camarillaS3 = close - (range * 1.1) / 4;
        const camarillaS4 = close - (range * 1.1) / 2;

        setResults({
            classic: {
                R4: classicR4, R3: classicR3, R2: classicR2, R1: classicR1,
                PP: classicPP, // Mengubah dari 'Pivot' menjadi 'PP' untuk konsistensi
                S1: classicS1, S2: classicS2, S3: classicS3, S4: classicS4,
            },
            woodie: {
                R4: woodieR4, R3: woodieR3, R2: woodieR2, R1: woodieR1,
                PP: woodiePP, // Mengubah dari 'Pivot' menjadi 'PP' untuk konsistensi
                S1: woodieS1, S2: woodieS2, S3: woodieS3, S4: woodieS4,
            },
            camarilla: {
                R4: camarillaR4, R3: camarillaR3, R2: camarillaR2, R1: camarillaR1,
                PP: classicPP, // Mengubah dari 'Pivot' menjadi 'PP' dan gunakan classicPP
                S1: camarillaS1, S2: camarillaS2, S3: camarillaS3, S4: camarillaS4,
            },
        });
    };

    const formatNumber = (num: number | string) => {
        if (typeof num === 'number') {
            return num.toFixed(3); // Tampilkan 3 angka di belakang koma
        }
        return num; // Untuk "N/A"
    }

    const tableLabels = ["R4", "R3", "R2", "R1", "Pivot", "S1", "S2", "S3", "S4"];

    return (
        <div className="space-y-6 bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">{t('pivot.title')}</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-2 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {['open', 'high', 'low', 'close'].map((field) => (
                    <div key={field} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-600">
                            {field === 'open' ? t('pivot.open', 'Open') : t(`pivot.${field}`)}
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name={field}
                                value={inputs[field]}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                                placeholder={t(`pivot.${field}`)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <span className="text-gray-400">$</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <button
                    onClick={calculatePivots}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {t('pivot.calculate')}
                </button>
                <button
                    onClick={() => {
                        setInputs({ high: "", low: "", close: "", open: "" });
                        setResults(null);
                    }}
                    className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t('pivot.reset')}
                </button>
            </div>

            {results && (
                <div className="mt-10">
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-800">{t('pivot.results.title', 'Hasil Perhitungan')}</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-2 rounded-full"></div>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-gray-100 shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('pivot.level', 'Level')}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('pivot.classic', 'Klasik')}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('pivot.woodie', 'Woodie')}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('pivot.camarilla', 'Camarilla')}
                                    </th>
                                </tr>
                            </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {[
                                { level: 'R3', label: t('pivot.levels.r3', 'Resistance 3 (R3)'), classic: results.classic.R3, woodie: results.woodie.R3, camarilla: results.camarilla.R3, color: 'bg-red-50' },
                                { level: 'R2', label: t('pivot.levels.r2', 'Resistance 2 (R2)'), classic: results.classic.R2, woodie: results.woodie.R2, camarilla: results.camarilla.R2, color: 'bg-red-50' },
                                { level: 'R1', label: t('pivot.levels.r1', 'Resistance 1 (R1)'), classic: results.classic.R1, woodie: results.woodie.R1, camarilla: results.camarilla.R1, color: 'bg-red-50' },
                                { level: 'PP', label: t('pivot.levels.pp', 'Pivot Point (PP)'), classic: results.classic.PP, woodie: results.woodie.PP, camarilla: results.camarilla.PP, color: 'bg-blue-50' },
                                { level: 'S1', label: t('pivot.levels.s1', 'Support 1 (S1)'), classic: results.classic.S1, woodie: results.woodie.S1, camarilla: results.camarilla.S1, color: 'bg-green-50' },
                                { level: 'S2', label: t('pivot.levels.s2', 'Support 2 (S2)'), classic: results.classic.S2, woodie: results.woodie.S2, camarilla: results.camarilla.S2, color: 'bg-green-50' },
                                { level: 'S3', label: t('pivot.levels.s3', 'Support 3 (S3)'), classic: results.classic.S3, woodie: results.woodie.S3, camarilla: results.camarilla.S3, color: 'bg-green-50' },
                            ].map((row, idx) => (
                                <tr key={row.level} className={`hover:bg-gray-50 transition-colors ${row.color}`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                        <div className="flex items-center">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                                row.level.startsWith('R') ? 'bg-red-500' : 
                                                row.level === 'PP' ? 'bg-blue-500' : 'bg-green-500'
                                            }`}></span>
                                            {row.label}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">
                                        {formatNumber(row.classic)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">
                                        {formatNumber(row.woodie)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">
                                        {formatNumber(row.camarilla)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            )}
        </div>
    );
}
