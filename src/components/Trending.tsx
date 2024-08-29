import React, { useState, useEffect } from 'react';
import { getTrendingCoins } from '@/services/coingecko';
import { TrendingCoin } from '@/types';
import TrendingSkeleton from './skeletons/TrendingSkeleton';

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
        setError('No cryptocurrencies found. Please refresh the page after a few minutes and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCoins();
  }, []);

  return (
    <div className='w-full dark:bg-tokena-dark-blue-1'>
      <div className='pb-2.5 px-1 flex items-center justify-between'>
        <h2 className="text-tokena-dark dark:text-tokena-white text-base font-semibold">Trending</h2>
        <a href="#" className='flex items-center gap-1 text-xs text-tokena-dark-gray dark:text-tokena-gray font-medium hover:underline'>
          View more
          <img src="/icons/chevron-right.svg" alt="Chevron right" className='w-4 h-4 dark:invert' />
        </a>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 cols-1">
        {loading ? (
          <>
            <TrendingSkeleton />
            <TrendingSkeleton />
            <TrendingSkeleton />
            <TrendingSkeleton />
          </>
        ) : error ? (
          <div className="text-center dark:text-white">{error}</div>
        ) : (
          trendingCoins.map((coin) => (
            <div key={coin.id} className="cursor-pointer border dark:border-tokena-dark-gray dark:border-opacity-40 rounded-xl p-2 hover:bg-tokena-blue hover:bg-opacity-10">
              <div className='flex items-center justify-between '>
                <div className="flex items-center gap-1">
                  <img src={coin.thumb} alt={coin.name} className="w-8 h-8 p-0.5" />
                  <div>
                    <p className="font-bold text-xs text-tokena-dark-gray dark:text-tokena-gray line-clamp-1">
                      {coin.name}
                    </p>

                    <p className="uppercase text-tokena-dark-gray dark:text-tokena-gray font-bold text-[0.6rem]">{coin.symbol}</p>
                  </div>
                </div>
                <p className={`text-[0.6rem] font-semibold rounded-full p-1 inline-flex items-center ${coin.price_change_percentage_24h >= 0 ? 'text-tokena-green bg-tokena-green bg-opacity-10' : 'text-tokena-red bg-tokena-red bg-opacity-10'}`}>
                  {coin.price_change_percentage_24h.toFixed(1)} %
                  <img src={coin.price_change_percentage_24h >= 0 ? "/icons/trade-up.svg" : "/icons/trade-down.svg"} alt="Trending" className="w-2 h-2" />
                </p>
              </div>
              <div className="mt-4">
                <p className="text-base font-bold text-tokena-dark-gray dark:text-tokena-gray">
                  {coin.price.toFixed(2)} {coin.symbol.toUpperCase()}
                </p>
                <p className="text-sm text-tokena-dark-gray font-medium dark:text-tokena-gray">
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
