'use client';
import React, { useState, useEffect } from 'react';

interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

interface SearchBarProps {
  onSearchResults: (results: SearchResult[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length === 0) {
      onSearchResults([]);  
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
        const data = await response.json();
        const results: SearchResult[] = data.coins.slice(0, 5).map((coin: SearchResult) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          thumb: coin.thumb
        })); 
        onSearchResults(results); 
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSearchResults, 300); 
    return () => clearTimeout(debounce);
  }, [query, onSearchResults]);

  return (
    <div className="relative w-23">
      <div className="flex items-center gap-3 border border-tokena-gray dark:border-tokena-dark-gray dark:border-opacity-40 rounded-xl p-3 text-tokena-dark-gray font-medium">
        <img src="/icons/search.svg" alt="Search Icon" className="w-4 h-4" />
        <input
          type="text"
          className="outline-none w-full dark:bg-tokena-dark-blue-1 dark:text-tokena-white"
          placeholder="Search crypto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
