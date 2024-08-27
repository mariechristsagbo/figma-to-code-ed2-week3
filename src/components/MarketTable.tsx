'use client';
import React, { useState, useEffect } from 'react';
import { getMarketData } from '@/services/coingecko';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { CoinData } from '@/types';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import CryptoDetailsModal from './CryptoDetail';
interface MarketTableProps {
  searchResults: string[];
}

const MarketTable: React.FC<MarketTableProps> = ({ searchResults }) => {
  const [currency, setCurrency] = useState('usd');
  const [marketData, setMarketData] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<CoinData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMarketData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMarketData(currency, searchResults.length > 0 ? searchResults : undefined);
        setMarketData(data);
      } catch (err) {
        setError('No cryptocurrencies found. Please refresh the page after 30 seconds and try again.');
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

  const openModal = (crypto: CoinData) => {
    setSelectedCrypto(crypto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCrypto(null);
  };

  return (
    <section className="mt-6 border dark:border-tokena-dark-gray dark:border-opacity-40 rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">Market</h2>
      {error ? (
        <div className="text-center dark:text-white">{error}</div>
      ) : (
        <div className="rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-tokena-light-gray bg-opacity-30 dark:bg-tokena-dark-blue-2 dark:bg-opacity-30">
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
            {loading ? (
              <TableSkeleton />
            ) : (
              <tbody>
                {marketData.map((coin, index) => (
                  <tr
                    key={coin.id}
                    className="border-b dark:border-tokena-dark-blue-2 hover:bg-tokena-light-gray dark:hover:bg-tokena-dark-blue-1 cursor-pointer"
                    onClick={() => openModal(coin)}
                  >
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6 flex items-center">
                      <img src={coin.image || coin.thumb} alt={coin.name} className="w-6 h-6 mr-2" />
                      <div>
                        <p className="font-medium text-sm line-clamp-1">{coin.name}</p>
                        <p className="uppercase dark:text-tokena-gray text-gray-500 text-xs">{coin.symbol}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currency.toUpperCase(),
                      }).format(coin.current_price || 0)}
                    </td>
                    <td
                      className={`py-4 px-6 text-right font-medium text-sm ${coin.price_change_percentage_24h >= 0 ? 'text-tokena-green' : 'text-tokena-red'
                        }`}
                    >
                      <p className={`p-1 px-2 rounded-full ${coin.price_change_percentage_24h >= 0 ? 'bg-tokena-green bg-opacity-10 max-w-max ml-auto' : 'bg-tokena-red bg-opacity-10 max-w-max ml-auto'
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
            )}
          </table>
        </div>
      )}
      <CryptoDetailsModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        cryptoData={selectedCrypto} 
      />
    </section>
  );
};

export default MarketTable;
