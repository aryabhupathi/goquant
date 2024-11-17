const BINANCE_API_URL = 'https://api.binance.com/api/v3/depth';
export const getOrderBook = async (symbol = 'BTCUSDT', limit = 10) => {
  try {
    const response = await fetch(`${BINANCE_API_URL}?symbol=${symbol}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Binance API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order book:', error);
    return { bids: [], asks: [] }; 
  }
};


