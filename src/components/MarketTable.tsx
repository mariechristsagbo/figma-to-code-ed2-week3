'use client';

import React, { useState, useEffect } from "react";
import { getMarketData } from "@/services/coingecko";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { CoinData } from "@/types";

const MarketTable = () => {
  const [currency, setCurrency] = useState('usd');
  const [marketData, setMarketData] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, [currency]);


  return (
    <section className="mt-6 border rounded-xl p-4">
      <div className="mb-8 mt-2 px-2 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Market</h2>
        <img src="/icons/dropdown-menu.svg" alt="" className="border border-tokena-gray rounded-md p-1 w-8 h-8" />
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="bg-white rounded-lg">
          <table className="min-w-full">
            <thead className="bg-tokena-light-gray bg-opacity-40">
              <tr className=" text-xs lg:text-sm">
                <th className="py-3 px-6 text-center font-medium">#</th>
                <th className="py-3 px-6 text-center font-medium">Coins</th>
                <th className="py-3 px-6 text-center font-medium">Price</th>
                <th className="py-3 px-6 text-center font-medium">24h</th>
                <th className="py-3 px-6 text-center font-medium">24h Volume</th>
                <th className="py-3 px-6 text-center font-medium">Market Cap</th>
                <th className="py-3 px-6 text-center font-medium">Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((coin, index) => (
                <tr key={coin.id} className="border-b hover:bg-tokena-light-gray">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6 flex items-center">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                    <div>
                      <p className="font-medium">{coin.name}</p>
                      <p className="uppercase text-gray-500 text-xs">{coin.symbol}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    }).format(coin.current_price)}
                  </td>
                  <td
                    className={`py-4 px-6 text-center font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="py-4 px-6 text-center">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    }).format(coin.total_volume)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    }).format(coin.market_cap)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Sparklines data={coin.sparkline_in_7d.price} width={100} height={40}>
                      <SparklinesLine
                        color={coin.price_change_percentage_24h >= 0 ? '#16a34a' : '#dc2626'}
                        style={{ fill: 'none' }}
                      />
                    </Sparklines>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MarketTable;
