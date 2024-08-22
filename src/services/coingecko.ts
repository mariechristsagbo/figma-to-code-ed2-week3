import { TrendingCoin } from "@/types";
import { CoinData } from "@/types";

const API_URL = 'https://api.coingecko.com/api/v3';

export const getMarketData = async (currency: string): Promise<CoinData[]> => {
  try {
    const response = await fetch(
      `${API_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch market data');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getTrendingCoins = async (): Promise<TrendingCoin[]> => {
  const API_URL = 'https://api.coingecko.com/api/v3';

  try {
    const response = await fetch(`${API_URL}/search/trending`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trending coins');
    }

    const data = await response.json();

    return data.coins.slice(0, 4).map((coin: any) => ({
      id: coin.item.id,
      name: coin.item.name,
      symbol: coin.item.symbol,
      market_cap_rank: coin.item.market_cap_rank,
      thumb: coin.item.thumb,
      price: coin.item.data.price,
      market_cap: coin.item.data.market_cap,
      price_change_percentage_24h: coin.item.data.price_change_percentage_24h?.usd || 0,
      sparkline: coin.item.data.sparkline,
    }));
  } catch (error) {
    throw new Error('Failed to fetch trending coins');
  }
};