import { useEffect, useState, useRef } from "react";
import MarketCard from "../moleculs/MarketCard";
import Header1 from "../moleculs/Header1";

type Direction = 'up' | 'down' | 'neutral';

interface MarketItem {
  symbol: string;
  last: number;
  percentChange: number;
  direction?: Direction;
}

export default function Market() {
    const [marketData, setMarketData] = useState<MarketItem[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const prevDataRef = useRef<MarketItem[]>([]);

    useEffect(() => {
        const fetchMarketData = async () => {
            console.log('Fetching market data...');
            try {
                const res = await fetch('/api/market');
                console.log('API Response status:', res.status);

                if (!res.ok) {
                    const errorText = await res.text();
                    console.error('API Error:', {
                        status: res.status,
                        statusText: res.statusText,
                        errorText
                    });
                    setErrorMessage(`Error: ${res.status} - ${res.statusText}`);
                    setMarketData([]);
                    return;
                }

                let data;
                try {
                    data = await res.json();
                    console.log('API Response data:', data);
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    setErrorMessage('Error parsing market data');
                    setMarketData([]);
                    return;
                }

                if (!Array.isArray(data)) {
                    console.error('Expected array but got:', typeof data);
                    setErrorMessage('Invalid data format from server');
                    setMarketData([]);
                    return;
                }

                const filteredData = data
                    .filter((item: any) => {
                        const isValid = item?.symbol && (item.last !== null && item.last !== undefined);
                        if (!isValid) {
                            console.warn('Skipping invalid item:', item);
                        }
                        return isValid;
                    })
                    .map((item: any): MarketItem => ({
                        symbol: String(item.symbol),
                        last: Number(item.last),
                        percentChange: Number(item.percentChange) || 0,
                    }));

                const updatedData = filteredData.map((item: MarketItem): MarketItem & { direction: Direction } => {
                    const prevItem = prevDataRef.current.find(p => p.symbol === item.symbol);
                    let direction: Direction = 'neutral';

                    if (prevItem) {
                        if (item.last > prevItem.last) direction = 'up';
                        else if (item.last < prevItem.last) direction = 'down';
                        else direction = item.percentChange === 0 ? 'neutral' : (item.percentChange > 0 ? 'up' : 'down');
                    } else {
                        direction = item.percentChange > 0 ? 'up' : (item.percentChange < 0 ? 'down' : 'neutral');
                    }

                    return { ...item, direction };
                });

                setMarketData(updatedData);
                prevDataRef.current = filteredData;
                setErrorMessage("");
            } catch (error: any) {
                setErrorMessage(error?.message || "Gagal memuat data");
                setMarketData([]);
            }
        };

        fetchMarketData();
        const interval = setInterval(fetchMarketData, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (symbol: string, price: number): string => {
        if (!price && price !== 0) return '-';
        if (symbol.includes('IDR')) return `Rp${price.toLocaleString('id-ID')}`;
        if (symbol.includes('BTC')) return `$${price.toLocaleString('en-US')}`;
        return `$${price.toFixed(2)}`;
    };

    const formatPercent = (percent: number): string => {
        if (percent === null || percent === undefined) return '0.00%';
        const formatted = Number(percent).toFixed(2);
        const sign = percent > 0 ? '+' : '';
        return `${sign}${formatted}%`;
    };

    return (
        <div className="w-full bg-stone-50 py-10 flex flex-col items-center space-y-4">
            <Header1 title="Market" className="text-black text-2xl md:text-3xl" />
            <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>

            <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-36 2xl:px-52 w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {errorMessage ? (
                        <div className="col-span-full text-center text-red-600 font-semibold text-sm sm:text-base">
                            {errorMessage}
                        </div>
                    ) : marketData.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 font-medium text-sm sm:text-base animate-pulse">
                            Memuat data pasar...
                        </div>
                    ) : (
                        marketData.map((item: MarketItem, index: number) => (
                            <MarketCard
                                key={`${item.symbol}-${index}`}
                                symbol={item.symbol}
                                last={formatPrice(item.symbol, item.last)}
                                percentChange={formatPercent(item.percentChange)}
                                direction={item.direction || 'neutral'}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
