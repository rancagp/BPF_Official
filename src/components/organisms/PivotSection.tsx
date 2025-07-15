import React, { useState } from "react";

// Definisikan tipe untuk input dan hasil
type PivotInput = { [key: string]: string };
type PivotResult = { [key: string]: number | string };

export default function PivotSection() {
    const [inputs, setInputs] = useState<PivotInput>({ Open: "", High: "", Low: "", Close: "" });
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
        const open = parseFloat(inputs.Open);
        const high = parseFloat(inputs.High);
        const low = parseFloat(inputs.Low);
        const close = parseFloat(inputs.Close);

        if (isNaN(open) || isNaN(high) || isNaN(low) || isNaN(close)) {
            alert("Please fill in all fields (Open, High, Low, Close) with valid numbers.");
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
        const classicR4 = classicR2 + range;
        const classicS4 = classicS2 - range;

        // Woodie Pivots (Updated Formulas)
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
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {Object.keys(inputs).map((label) => (
                        <input
                            key={label}
                            type="text"
                            name={label}
                            placeholder={label}
                            value={inputs[label]}
                            onChange={handleInputChange}
                            className="border px-3 py-2 rounded-md text-sm w-full"
                        />
                    ))}
                </div>
                <button 
                    onClick={calculatePivots}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition sm:col-span-2 md:col-span-1"
                >
                    Calculate
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left font-semibold">Level</th>
                            <th className="py-3 px-6 text-left font-semibold">Classic</th>
                            <th className="py-3 px-6 text-left font-semibold">Woodie</th>
                            <th className="py-3 px-6 text-left font-semibold">Camarilla</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableLabels.map((label, idx) => (
                            <tr
                                key={label}
                                className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} border-t hover:bg-gray-100 transition`}
                            >
                                <td className={`py-3 px-6 font-medium ${label === "P" ? "text-green-600" : "text-gray-700"}`}>
                                    {label}
                                </td>
                                <td className="py-3 px-6 text-gray-900 font-semibold">
                                    {results ? formatNumber(results.classic[label]) : "0"}
                                </td>
                                <td className="py-3 px-6 text-gray-900 font-semibold">
                                    {results ? formatNumber(results.woodie[label]) : "0"}
                                </td>
                                <td className="py-3 px-6 text-gray-900 font-semibold">
                                    {results ? formatNumber(results.camarilla[label]) : "0"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
