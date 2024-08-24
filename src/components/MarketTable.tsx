'use client';

import React, { useState, useEffect } from 'react';
import { getMarketData } from '@/services/coingecko';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { CoinData } from '@/types';

interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

const MarketTable = ({ searchResults }: { searchResults: SearchResult[] }) => {
  const [currency, setCurrency] = useState('usd');
  const [marketData, setMarketData] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchResults.length > 0) {
      setMarketData(searchResults as any);
      setLoading(false);
      return;
    }

    const fetchMarketData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMarketData(currency);
        setMarketData(data);
      } catch (err) {
        setError('Failed to fetch market data');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();

    const interval = setInterval(() => {
      fetchMarketData();
    }, 300000);

    return () => clearInterval(interval);
  }, [currency, searchResults]);

  return (
    <section className="mt-6 border rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">Market</h2>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="bg-white rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-tokena-light-gray">
              <tr className="text-sm">
                <th className="py-3 px-6 text-left font-medium">#</th>
                <th className="py-3 px-6 text-left font-medium">Coins</th>
                <th className="py-3 px-6 text-right font-medium">Price</th>
                <th className="py-3 px-6 text-right font-medium">24h</th>
                <th className="py-3 px-6 text-right font-medium hidden md:table-cell">24h Volume</th>
                <th className="py-3 px-6 text-right font-medium hidden lg:table-cell">Market Cap</th>
                <th className="py-3 px-6 text-right font-medium hidden lg:table-cell">Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((coin, index) => (
                <tr key={coin.id} className="border-b hover:bg-tokena-light-gray">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6 flex items-center">
                    <img src={coin.image || coin.thumb} alt={coin.name} className="w-6 h-6 mr-2" />
                    <div>
                      <p className="font-medium text-sm">{coin.name}</p>
                      <p className="uppercase text-gray-500 text-xs">{coin.symbol}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    }).format(coin.current_price || 0)}
                  </td>
                  <td
                    className={`py-4 px-6 text-right font-medium text-sm ${
                      coin.price_change_percentage_24h >= 0 ? 'text-tokena-green' : 'text-tokena-red'
                    }`}
                  >
                  <p className={`p-1 px-2 rounded-full ${
                      coin.price_change_percentage_24h >= 0 ? 'bg-green-100 max-w-max ml-auto' : 'bg-red-100 max-w-max ml-auto'
                    }`}>  {coin.price_change_percentage_24h?.toFixed(2) || 'N/A'}%</p>
                  </td>
                  <td className="py-4 px-6 text-right hidden md:table-cell">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    }).format(coin.total_volume || 0)}
                  </td>
                  <td className="py-4 px-6 text-right hidden lg:table-cell">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    }).format(coin.market_cap || 0)}
                  </td>
                  <td className="py-4 px-6 text-right hidden lg:table-cell">
                    {coin.sparkline_in_7d ? (
                      <Sparklines data={coin.sparkline_in_7d.price} width={100} height={40}>
                        <SparklinesLine
                          color={coin.price_change_percentage_24h >= 0 ? '#16a34a' : '#dc2626'}
                          style={{ fill: 'none' }}
                        />
                      </Sparklines>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">Showing 1 to 50 of 15027 results</p>
            <div className="flex items-center space-x-2">
              <button className="text-sm text-tokena-blue">1</button>
              <button className="text-sm text-tokena-blue">2</button>
              <span className="text-sm text-gray-500">...</span>
              <button className="text-sm text-tokena-blue">151</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MarketTable;
