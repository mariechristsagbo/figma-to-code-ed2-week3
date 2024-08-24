'use client';

import React, { useState, useEffect } from 'react';
import { getTrendingCoins } from '@/services/coingecko';
import { TrendingCoin } from '@/types';


const Trending = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const coins = await getTrendingCoins();
        setTrendingCoins(coins);
      } catch (err) {
        setError('Failed to fetch trending coins');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCoins();
  }, []);

  return (
    <div className='w-full'>
      <div className='pb-3 px-1 flex items-center justify-between'>
        <h2 className="text-tokena-dark text-xl font-semibold">Trending</h2>
        <a href="#" className='flex items-center gap-1 text-base text-tokena-dark-gray font-medium hover:underline'>
          View more
          <img src="/icons/chevron-right.svg" alt="Chevron right" className='w-5 h-5' />
        </a>

      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-tokena-red">{error}</div>
        ) : (
          trendingCoins.map((coin) => (
            <div key={coin.id} className="border rounded-xl p-2.5">
              <div className='flex items-center justify-between gap-4'>
                <div className="flex items-center space-x-2">
                  <img src={coin.thumb} alt={coin.name} className="w-10 h-10 rounded-full p-1" />
                  <div>
                    <p className="font-bold text-md text-tokena-dark-gray">{coin.name}</p>
                    <p className="uppercase text-tokena-dark-gray font-bold text-xs">{coin.symbol}</p>
                  </div>
                </div>
                <p className={`text-xs md:text-sm font-semibold rounded-full p-1.5 inline-flex items-center ${coin.price_change_percentage_24h >= 0 ? 'text-tokena-green bg-green-100' : 'text-tokena-red bg-red-100'}`}>
                  {coin.price_change_percentage_24h.toFixed(2)} %
                  <img src={coin.price_change_percentage_24h >= 0 ? "/icons/trade-up.svg" : "/icons/trade-down.svg"} alt="Trending" className="w-3 h-3 ml-1" />
                </p>
              </div>
              <div className="mt-4">
                <p className="text-xl font-bold text-tokena-dark-gray">
                  {coin.price.toFixed(2)} {coin.symbol.toUpperCase()}
                </p>
                <p className="text-sm text-tokena-dark-gray font-medium">
                  {coin.market_cap}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Trending;
