import { useEffect, useState, useRef } from "react";

export default function Iso() {
    const [marketData, setMarketData] = useState([]);
    const prevDataRef = useRef([]);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const res = await fetch('/api/market');
                const data = await res.json();

                const filteredData = data
                    .filter(item => item.symbol && typeof item.last === 'number')
                    .map(item => ({
                        symbol: item.symbol,
                        last: item.last,
                        percentChange: item.percentChange,
                    }));

                const updatedData = filteredData.map(item => {
                    const prevItem = prevDataRef.current.find(p => p.symbol === item.symbol);
                    let direction;

                    if (prevItem) {
                        if (item.last > prevItem.last) direction = 'up';
                        else if (item.last < prevItem.last) direction = 'down';
                        else direction = item.percentChange === 0 ? 'neutral' : (item.percentChange > 0 ? 'up' : 'down');
                    } else {
                        direction = item.percentChange > 0 ? 'up' : (item.percentChange < 0 ? 'down' : 'neutral');
                    }

                    return {
                        ...item,
                        direction,
                    };
                });

                setMarketData(updatedData);
                prevDataRef.current = filteredData;
            } catch (error) {
                console.error('Gagal ambil data:', error);
            }
        };

        fetchMarketData();
        const interval = setInterval(fetchMarketData, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (symbol, price) => {
        if (symbol.includes('IDR')) return `Rp${price.toLocaleString('id-ID')}`;
        if (symbol.includes('BTC')) return `$${price.toLocaleString('en-US')}`;
        return `$${price.toFixed(2)}`;
    };

    const formatPercent = (percent) => {
        const formatted = percent?.toFixed(2);
        const sign = percent > 0 ? '+' : '';
        return `${sign}${formatted}%`;
    };

    return (
       <div className="w-full bg-gradient-to-b from-gray-100 to-[#1e293b] py-10 flex flex-col items-center">
            <h1 className="text-black text-2xl font-bold uppercase mb-6">Market Update</h1>

            <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-6xl flex flex-wrap justify-center gap-6">
                {marketData.map((item, index) => {
                    const colorClass =
                        item.direction === 'up'
                            ? 'text-green-600'
                            : item.direction === 'down'
                            ? 'text-red-600'
                            : 'text-gray-500';

                    return (
                        <div
                            key={index}
                            className={`rounded-lg px-4 py-3 min-w-[140px] text-center shadow-sm border ${colorClass}`}
                        >
                            <div className="text-sm font-semibold text-black">{item.symbol}</div>
                            <div className="text-lg font-bold">{formatPrice(item.symbol, item.last)}</div>
                            <div className="text-sm">{formatPercent(item.percentChange)}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
