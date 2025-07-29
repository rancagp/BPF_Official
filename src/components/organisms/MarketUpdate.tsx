import { useEffect, useState } from "react";

interface MarketItem {
  symbol: string;
  last: number;
  percentChange: number;
}

export default function MarketUpdate() {
    const [marketData, setMarketData] = useState<MarketItem[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const res = await fetch('/api/market');

                if (!res.ok) {
                    const errorText = `${res.status} ${res.statusText}`;
                    console.error('Respon error:', errorText);
                    setErrorMessage(errorText);
                    setMarketData([]);
                    return;
                }

                const data = await res.json();

                const filteredData = data
                    .filter((item: any) => item?.symbol && typeof item.last === 'number')
                    .map((item: any): MarketItem => ({
                        symbol: String(item.symbol),
                        last: Number(item.last),
                        percentChange: Number(item.percentChange) || 0,
                    }));

                setMarketData(filteredData);
                setErrorMessage(""); // clear error
            } catch (error: any) {
                console.error('Fetch gagal:', error);
                setErrorMessage(error?.message || "Gagal memuat data");
                setMarketData([]);
            }
        };

        fetchMarketData();

        const interval = setInterval(fetchMarketData, 10000);

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
        <div className="bg-zinc-900 text-white overflow-hidden shadow group">
            <div className="flex items-center h-10">
                <div className="bg-red-600 px-4 h-full flex items-center font-bold text-xs sm:text-sm md:text-base whitespace-nowrap">
                    Market Update
                </div>

                <div className="relative overflow-hidden w-full bg-green-500 h-full flex items-center min-w-0">
                    {errorMessage ? (
                        <div className="px-4 text-xs sm:text-sm md:text-base font-semibold text-white">
                            {errorMessage}
                        </div>
                    ) : marketData.length === 0 ? (
                        <div className="px-4 text-xs sm:text-sm md:text-base font-semibold text-white">
                            Memuat data...
                        </div>
                    ) : (
                        <div className="flex animate-marquee whitespace-nowrap items-center text-xs sm:text-sm md:text-base group-hover:[animation-play-state:paused]">
                            {[...marketData, ...marketData].map((item: MarketItem, idx: number) => (
                                <div key={`${item.symbol}-${idx}`} className="flex items-center">
                                    <div className="flex items-center gap-2 px-4">
                                        <span className="font-semibold">{item.symbol}:</span>
                                        <span>{formatPrice(item.symbol, item.last)}</span>
                                        <span className={`font-medium ${item.percentChange > 0 ? 'text-green-300' :
                                                item.percentChange < 0 ? 'text-red-400' :
                                                    'text-white/60'
                                            }`}>
                                            ({formatPercent(item.percentChange)})
                                        </span>
                                    </div>
                                    <span className="mx-4 h-full text-white/50">|</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
