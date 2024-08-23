export interface CoinData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
    total_volume: number;
    thumb: string;
    sparkline_in_7d: {
      price: number[];
    };
  }

 export interface TrendingCoin {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    price: number;
    market_cap: string;
    price_change_percentage_24h: number;
    sparkline: string;
  }


export interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank?: number;
  thumb: string;
}
  