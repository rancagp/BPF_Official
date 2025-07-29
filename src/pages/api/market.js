export default async function handler(req, res) {
  try {
    // Menghapus log fetching data
    const response = await fetch(
      "https://www.newsmaker.id/quotes/live?s=LGD+LSI+GHSIK5+SN1M5+LCOPN5+DJIA+DAX+DX+AUDUSD+EURUSD+GBPUSD+CHF+JPY+RP",
      {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from newsmaker:', {
        status: response.status,
        statusText: response.statusText,
        errorText
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse response text manually to handle malformed JSON
    const text = await response.text();
    
    // Clean up the response text
    let cleanedText = text
      .replace(/\s+/g, '') // Remove all whitespace
      .replace(/,,/g, ',') // Remove double commas
      .replace(/,]/g, ']') // Remove trailing commas before closing bracket
      .replace(/},,/g, '},') // Fix double commas between objects
      .replace(/}{/g, '},{') // Add missing commas between objects
      .replace(/}\]/g, '}]') // Fix missing comma before closing bracket
    
    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      // If parsing fails, try to extract valid JSON array manually
      const jsonMatch = cleanedText.match(/\[.*\]/s);
      if (jsonMatch) {
        try {
          data = JSON.parse(jsonMatch[0]);
        } catch (e) {
          // Menghapus log error parsing JSON
          throw new Error('Invalid JSON response from server');
        }
      } else {
        throw new Error('No valid JSON data found in response');
      }
    }
    
    // Convert to array if it's not already
    const dataArray = Array.isArray(data) ? data : [data];
    
    // Filter out invalid items and transform data to include all fields
    const validItems = dataArray
      .filter(item => item && item.symbol) // Hanya filter item yang memiliki symbol
      .map(item => ({
        symbol: String(item.symbol),
        last: Number(item.last),
        high: Number(item.high) || null,
        low: Number(item.low) || null,
        open: Number(item.open) || null,
        time: item.time || null,
        prevClose: Number(item.prevClose) || null,
        valueChange: Number(item.valueChange) || 0,
        percentChange: Number(item.percentChange) || 0,
        Volume: Number(item.Volume) || 0,
        bid: Number(item.bid) || null,
        ask: Number(item.ask) || null
      }));
    
    // Menghapus log jumlah item yang diproses
    res.status(200).json(validItems);
  } catch (error) {
    console.error('Error in market API route:', error);
    res.status(500).json({ 
      error: "Gagal mengambil data market", 
      message: error.message 
    });
  }
}
