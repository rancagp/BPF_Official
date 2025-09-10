// Sample data sebagai fallback jika API eksternal bermasalah
const sampleData = [
  {
    symbol: "DJIA",
    last: 34500.23,
    high: 34600.50,
    low: 34300.75,
    open: 34450.00,
    time: new Date().toISOString(),
    prevClose: 34450.00,
    valueChange: 50.23,
    percentChange: 0.15,
    Volume: 0,
    bid: 34500.00,
    ask: 34500.50
  },
  {
    symbol: "USD/IDR",
    last: 14500.50,
    high: 14520.75,
    low: 14480.25,
    open: 14500.00,
    time: new Date().toISOString(),
    prevClose: 14495.00,
    valueChange: 5.50,
    percentChange: 0.04,
    Volume: 0,
    bid: 14500.25,
    ask: 14500.75
  },
  {
    symbol: "EUR/USD",
    last: 1.0925,
    high: 1.0930,
    low: 1.0910,
    open: 1.0920,
    time: new Date().toISOString(),
    prevClose: 1.0918,
    valueChange: 0.0007,
    percentChange: 0.06,
    Volume: 0,
    bid: 1.0924,
    ask: 1.0926
  }
];

export default async function handler(req, res) {
  try {
    // Coba ambil data dari API eksternal
    const response = await fetch(
      "https://www.newsmaker.id/quotes/live?s=LGD+LSI+GHSIK5+SN1M5+LCOPN5+DJIA+DAX+DX+AUDUSD+EURUSD+GBPUSD+CHF+JPY+RP",
      {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        // Timeout setelah 3 detik
        signal: AbortSignal.timeout(3000)
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    let data;
    
    try {
      // Coba parse JSON langsung
      data = JSON.parse(text);
    } catch (parseError) {
      // Jika gagal, coba bersihkan response
      const cleanedText = text
        .replace(/\s+/g, '') // Hapus spasi
        .replace(/,,/g, ',')  // Perbaiki koma ganda
        .replace(/,]/g, ']')  // Hapus koma sebelum penutup array
        .replace(/},,/g, '},') // Perbaiki koma ganda antar objek
        .replace(/}{/g, '},{') // Tambahkan koma yang hilang
        .replace(/}\]/g, '}]'); // Perbaiki format penutup
      
      try {
        data = JSON.parse(cleanedText);
      } catch (e) {
        // Jika masih gagal, gunakan sample data
        console.error('Failed to parse API response, using sample data');
        return res.status(200).json(sampleData);
      }
    }
    
    // Proses data
    const dataArray = Array.isArray(data) ? data : [data];
    
    const validItems = dataArray
      .filter(item => item && item.symbol)
      .map(item => ({
        symbol: String(item.symbol || ''),
        last: Number(item.last) || 0,
        high: Number(item.high) || 0,
        low: Number(item.low) || 0,
        open: Number(item.open) || 0,
        time: item.time || new Date().toISOString(),
        prevClose: Number(item.prevClose) || 0,
        valueChange: Number(item.valueChange) || 0,
        percentChange: Number(item.percentChange) || 0,
        Volume: Number(item.Volume) || 0,
        bid: Number(item.bid) || 0,
        ask: Number(item.ask) || 0
      }));
    
    // Pastikan ada data yang valid
    if (validItems.length > 0) {
      return res.status(200).json(validItems);
    } else {
      // Jika tidak ada data valid, kembalikan sample data
      return res.status(200).json(sampleData);
    }
  } catch (error) {
    console.error('Error in market API route:', error.message);
    // Kembalikan sample data jika terjadi error
    return res.status(200).json(sampleData);
  }
}
