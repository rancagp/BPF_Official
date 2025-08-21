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
        close: "" 
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

        if (isNaN(high) || isNaN(low) || isNaN(close)) {
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

        // Woodie Pivots (Using close instead of open)
        const woodiePP = (high + low + 2 * close) / 4;
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
                Pivot: classicPP,
                S1: classicS1, S2: classicS2, S3: classicS3, S4: classicS4,
            },
            woodie: {
                R4: woodieR4, R3: woodieR3, R2: woodieR2, R1: woodieR1,
                Pivot: woodiePP,
                S1: woodieS1, S2: woodieS2, S3: woodieS3, S4: woodieS4,
            },
            camarilla: {
                R4: camarillaR4, R3: camarillaR3, R2: camarillaR2, R1: camarillaR1,
                Pivot: classicPP, // Use Classic PP for reference
                S1: camarillaS1, S2: camarillaS2, S3: camarillaS3, S4: camarillaS4,
            },
        });
    };

    const formatNumber = (num: number | string) => {
        if (typeof num === 'number') {
            return num.toFixed(2); // Tampilkan 2 angka di belakang koma
        }
        return num; // Untuk "N/A"
    }

    const tableLabels = ["R4", "R3", "R2", "R1", "Pivot", "S1", "S2", "S3", "S4"];

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">{t('pivot.title')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['high', 'low', 'close'].map((field) => (
                    <div key={field} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            {t(`pivot.${field}`)}
                        </label>
                        <input
                            type="text"
                            name={field}
                            value={inputs[field]}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            placeholder={t(`pivot.${field}`)}
                        />
                    </div>
                ))}
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={calculatePivots}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    {t('pivot.calculate')}
                </button>
                <button
                    onClick={() => {
                        setInputs({ high: "", low: "", close: "" });
                        setResults(null);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    {t('pivot.reset')}
                </button>
            </div>

            {results && (
                <div className="mt-6 overflow-x-auto">
                    <h3 className="text-lg font-medium mb-4">{t('pivot.results.title', 'Hasil Perhitungan')}</h3>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('pivot.level', 'Level')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('pivot.classic', 'Klasik')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('pivot.woodie', 'Woodie')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('pivot.camarilla', 'Camarilla')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {[
                                { level: 'R3', label: t('pivot.levels.r3', 'Resistance 3 (R3)'), classic: results.classic.R3, woodie: results.woodie.R3, camarilla: results.camarilla.R3 },
                                { level: 'R2', label: t('pivot.levels.r2', 'Resistance 2 (R2)'), classic: results.classic.R2, woodie: results.woodie.R2, camarilla: results.camarilla.R2 },
                                { level: 'R1', label: t('pivot.levels.r1', 'Resistance 1 (R1)'), classic: results.classic.R1, woodie: results.woodie.R1, camarilla: results.camarilla.R1 },
                                { level: 'PP', label: t('pivot.levels.pp', 'Pivot Point (PP)'), classic: results.classic.PP, woodie: results.woodie.PP, camarilla: results.camarilla.PP },
                                { level: 'S1', label: t('pivot.levels.s1', 'Support 1 (S1)'), classic: results.classic.S1, woodie: results.woodie.S1, camarilla: results.camarilla.S1 },
                                { level: 'S2', label: t('pivot.levels.s2', 'Support 2 (S2)'), classic: results.classic.S2, woodie: results.woodie.S2, camarilla: results.camarilla.S2 },
                                { level: 'S3', label: t('pivot.levels.s3', 'Support 3 (S3)'), classic: results.classic.S3, woodie: results.woodie.S3, camarilla: results.camarilla.S3 },
                            ].map((row, idx) => (
                                <tr key={row.level} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {row.label}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatNumber(row.classic)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatNumber(row.woodie)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatNumber(row.camarilla)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
