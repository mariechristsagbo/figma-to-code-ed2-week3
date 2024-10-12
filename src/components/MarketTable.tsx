'use client';
import React, { useState, useEffect } from 'react';
import { getMarketData } from '@/services/coingecko';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { CoinData, SearchResult } from '@/types';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import CryptoDetailsModal from './CryptoDetail';

interface MarketTableProps {
  searchResults: SearchResult[];
}

const MarketTable: React.FC<MarketTableProps> = ({ searchResults }) => {
  const [currency, setCurrency] = useState('usd');
  const [marketData, setMarketData] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<CoinData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    const fetchMarketData = async () => {
      setLoading(true);
      setError(null);

      try {
        const searchIds = searchResults.length > 0 ? searchResults.map(result => result.id) : undefined;
        const { data, total } = await getMarketData(currency, currentPage, itemsPerPage, searchIds);
        setMarketData(data);
        setTotalPages(Math.ceil(total / itemsPerPage));
      } catch (err) {
        setError('No cryptocurrencies found. Please refresh the page after a few minutes.');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [currency, searchResults, currentPage, itemsPerPage]);

  const openModal = (crypto: CoinData) => {
    setSelectedCrypto(crypto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCrypto(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <section className="mt-6 border dark:border-tokena-dark-gray dark:border-opacity-40 rounded-xl py-4 overflow-hidden max-w-[88vw] mx-auto">
      <div className='flex items-center justify-between mb-4 px-3'>
        <h2 className="text-xl font-semibold px-3">Market</h2>
        <img src="/icons/dropdown-menu.svg" alt="dropdown" className="dark:invert w-8 h-8 border border-tokena-gray dark:border-tokena-dark-blue-1 dark:border-opacity-20 p-1 rounded-lg" />
      </div>
      {error ? (
        <div className="text-center dark:text-white">{error}</div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto">
          <table className="min-w-full">
            <thead className="bg-tokena-light-gray dark:bg-tokena-dark-blue-2 dark:bg-opacity-30">
              <tr className="text-xs">
                <th className="py-3 px-4 text-left font-medium">#</th>
                <th className="py-3 px-4 text-left font-medium">Coins</th>
                <th className="py-3 px-4 text-left font-medium">Price</th>
                <th className="py-3 px-4 text-center font-medium">24h</th>
                <th className="py-3 px-4 text-center font-medium">24h Volume</th>
                <th className="py-3 px-4 text-right font-medium">Market Cap</th>
                <th className="py-3 px-4 text-right font-medium truncate">Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((coin, index) => (
                <tr
                  key={coin.id}
                  className="border-b dark:border-tokena-dark-blue-2 hover:bg-tokena-light-gray dark:hover:bg-tokena-dark-blue-1 cursor-pointer"
                  onClick={() => openModal(coin)}
                >
                  <td className="py-2 px-6">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td className="py-2 px-4 flex items-center">
                    <img src={coin.image || coin.thumb} alt={coin.name} className="w-6 h-6 mr-2" />
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{coin.name}</p>
                      <p className="uppercase dark:text-tokena-gray text-gray-500 text-xs">{coin.symbol}</p>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-left text-sm">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    }).format(coin.current_price || 0)}
                  </td>
                  <td
                    className={`py-2 px-4 text-right font-medium text-sm ${coin.price_change_percentage_24h >= 0 ? 'text-tokena-green' : 'text-tokena-red'
                      }`}
                  >
                    <p className={`p-1 px-2 text-xs font-semibold rounded-full ${coin.price_change_percentage_24h >= 0 ? 'bg-tokena-green bg-opacity-10 max-w-max ml-auto' : 'bg-tokena-red bg-opacity-10 max-w-max ml-auto'
                      }`}>  {coin.price_change_percentage_24h?.toFixed(2) || 'N/A'}%</p>
                  </td>
                  <td className="py-2 px-4 text-right text-sm">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    }).format(coin.total_volume || 0)}
                  </td>
                  <td className="py-2 px-4 text-right text-sm font-medium">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    }).format(coin.market_cap || 0)}
                  </td>
                  <td className="py-2 px-4 text-right">
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
                    <td className="py-4 px-6">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td className="py-4 px-6 flex items-center">
                      <img src={coin.image || coin.thumb} alt={coin.name} className="w-6 h-6 mr-2" />
                      <div>
                        <p className="font-medium text-sm line-clamp-1">{coin.name}</p>
                        <p className="uppercase dark:text-tokena-gray text-gray-500 text-xs">{coin.symbol}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-left text-sm">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currency.toUpperCase(),
                      }).format(coin.current_price || 0)}
                    </td>
                    <td
                      className={`py-4 px-6 text-right font-medium text-sm ${coin.price_change_percentage_24h >= 0 ? 'text-tokena-green' : 'text-tokena-red'
                        }`}
                    >
                      <p className={`p-1 px-2 text-xs font-semibold rounded-full ${coin.price_change_percentage_24h >= 0 ? 'bg-tokena-green bg-opacity-10 max-w-max ml-auto' : 'bg-tokena-red bg-opacity-10 max-w-max ml-auto'
                        }`}>  {coin.price_change_percentage_24h?.toFixed(2) || 'N/A'}%</p>
                    </td>
                    <td className="py-4 px-6 text-right text-sm">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currency.toUpperCase(),
                      }).format(coin.total_volume || 0)}
                    </td>
                    <td className="py-4 px-6 text-right text-sm font-medium">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currency.toUpperCase(),
                      }).format(coin.market_cap || 0)}
                    </td>
                    <td className="py-4 px-6 text-right">
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
      <div className="flex justify-between items-center mt-4 px-4">
        <div className="flex items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border rounded-l-md dark:text-white dark:border-tokena-dark-gray dark:border-opacity-40 disabled:opacity-50"
          >
            &lt;
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border rounded-r-md dark:text-white dark:border-tokena-dark-gray dark:border-opacity-40 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
        <div className="flex items-center text-sm">
          <label htmlFor="itemsPerPage" className="mr-2">Rows</label>
          <select
            id="itemsPerPage"
            className="p-2 px-3 text-sm rounded-lg dark:bg-tokena-dark-blue-2 dark:border-tokena-dark-gray dark:border-opacity-40 outline-none"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>
      <CryptoDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        cryptoData={selectedCrypto}
      />
    </section>
  );
};

export default MarketTable;
