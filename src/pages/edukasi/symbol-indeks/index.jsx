import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

const SymbolIndeksPage = () => {
    const symbolIndexData = [
        { symbol: 'HSIV9', description: 'Hang Seng Index (Futures) untuk kontrak Oktober 2009' },
        { symbol: 'HSI', description: 'Hang Seng Index (Spot)' },
        { symbol: 'SN1Z9', description: 'Nikkei 225 Index (Futures) untuk kontrak Desember 2009' },
        { symbol: 'SNI', description: 'Nikkei 225 Index (Spot)' },
        { symbol: 'JKSCI', description: 'Jakarta Composite Index (Spot)' },
        { symbol: 'SISE4', description: 'Straits Times Index (Spot)' },
        { symbol: 'KCOM', description: 'Kuala Lumpur Composite Index (Spot)' },
        { symbol: 'SHICOM', description: 'Shanghai Composite Index (Spot)' },
        { symbol: 'SZICOM', description: 'Shenzhen Composite Index (Spot)' },
        { symbol: 'TOPX', description: 'Tokyo Stock Price Index (Spot)' },
        { symbol: 'BSET', description: 'Bangkok Stock Price Index (Spot)' },
        { symbol: 'KSCI', description: 'Korea Stock Composite Index (Spot)' },
        { symbol: 'DJIA', description: 'Dow Jones Industrial Average (Spot)' },
        { symbol: 'NDX', description: 'Nasdaq 100 Index (Spot)' },
        { symbol: 'NDXI', description: 'Nasdaq Composite Index (Spot)' },
        { symbol: 'SPX', description: "Standard & Poor's 500 Index (Spot)" },
        { symbol: 'FTSE', description: 'Financial Times Stock Exchange (Spot)' },
        { symbol: 'DAX', description: 'Deutscher Aktien Index / German Stock Index (Spot)' },
        { symbol: 'NYSEI', description: 'New York Stock Index (Spot)' },
        { symbol: 'LGD', description: 'Loco Gold London (Spot)' },
    ];

    const hangSengMonths = [
        { code: 'F', month: 'Januari' }, { code: 'G', month: 'Februari' },
        { code: 'H', month: 'Maret' }, { code: 'J', month: 'April' },
        { code: 'K', month: 'Mei' }, { code: 'M', month: 'Juni' },
        { code: 'N', month: 'Juli' }, { code: 'Q', month: 'Agustus' },
        { code: 'U', month: 'September' }, { code: 'V', month: 'Oktober' },
        { code: 'X', month: 'November' }, { code: 'Z', month: 'Desember' },
    ];

    const nikkeiMonths = [
        { code: 'H', month: 'Maret' }, { code: 'M', month: 'Juni' },
        { code: 'U', month: 'September' }, { code: 'Z', month: 'Desember' },
    ];

    return (
        <PageTemplate title="Symbol Indeks - PT. Kresna Berjangka Investama">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Symbol Indeks">
                    <div className="space-y-12">
                        {/* Symbol Index Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Simbol Indeks</h2>
                            <div className="w-20 h-1 bg-green-500 mb-6"></div>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                {symbolIndexData.map(item => (
                                    <li key={item.symbol}>
                                        <span className="font-semibold text-gray-800">{item.symbol}</span>: {item.description}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contract Month Symbol Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Simbol Bulan Kontrak</h2>
                            <div className="w-20 h-1 bg-green-500 mb-6"></div>
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Hang Seng Futures</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                                        {hangSengMonths.map(item => (
                                            <li key={item.code}>
                                                <span className="font-semibold text-gray-800">{item.code}</span>: {item.month}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Nikkei 225 Futures</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                                        {nikkeiMonths.map(item => (
                                            <li key={item.code}>
                                                <span className="font-semibold text-gray-800">{item.code}</span>: {item.month}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
};

export default SymbolIndeksPage;
