import axios from 'axios';

const API_URL = 'https://portalnews.newsmaker.id/api';

export interface HistoricalData {
  id: number;
  tanggal: string;
  open: string;
  high: string;
  low: string;
  close: string;
  category: string;
  instrument: string;  // Menambahkan properti instrument
  created_at: string;
  updated_at: string;
}

export interface HistoricalDataResponse {
  Code: number;
  status: string;
  data: HistoricalData[];
}

export const getHistoricalData = async (): Promise<HistoricalDataResponse> => {
  try {
    const response = await axios.get<HistoricalDataResponse>(`${API_URL}/pivot-history`);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};
