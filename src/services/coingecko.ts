import { CoinData, TrendingCoin } from "@/types";

const API_URL = 'https://api.coingecko.com/api/v3';

export const getMarketData = async (currency: string, page: number, itemsPerPage: number, ids?: string[]): Promise<{ data: CoinData[], total: number }> => {
  try {
    const idQuery = ids ? `&ids=${ids.join(',')}` : '';
    const response = await fetch(
      `${API_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${itemsPerPage}&page=${page}&sparkline=true&price_change_percentage=24h${idQuery}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch market data: ${response.status} ${errorMessage}`);
    }

    const data = await response.json();
    
    const total = response.headers.get('X-Total-Count') ? parseInt(response.headers.get('X-Total-Count')!, 10) : 0;

    return { data, total };
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
};



export const getTrendingCoins = async (): Promise<TrendingCoin[]> => {
  try {
    const response = await fetch(`${API_URL}/search/trending`, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch trending coins: ${response.status} ${errorMessage}`);
    }

    const data = await response.json();

    return data.coins.slice(0, 4).map((coin: any) => ({
      id: coin.item.id,
      name: coin.item.name,
      symbol: coin.item.symbol,
      market_cap_rank: coin.item.market_cap_rank,
      thumb: coin.item.thumb,
      price: coin.item.data?.price || 0,
      market_cap: coin.item.data?.market_cap || "N/A",
      price_change_percentage_24h: coin.item.data?.price_change_percentage_24h?.usd || 0,
      sparkline: coin.item.data?.sparkline || null,
    }));
  } catch (error) {
    console.error("Error fetching trending coins:", error);
    throw error;
  }
};

export const getCoinDetails = async (id: string): Promise<CoinData> => {
  try {
    const response = await fetch(`${API_URL}/coins/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch coin details: ${response.status} ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching coin details:", error);
    throw error;
  }
};
