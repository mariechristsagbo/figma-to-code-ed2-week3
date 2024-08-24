'use client';

import React, { useState, useEffect } from 'react';
import { SearchResult } from '@/types';

interface SearchBarProps {
  onSearchResults: (results: SearchResult[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      onSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
        const data = await response.json();
        const coins = data.coins.slice(0, 5); 
        setResults(coins);
        onSearchResults(coins); 
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
      <div className="flex items-center gap-3 border border-tokena-gray rounded-xl p-3 text-tokena-dark-gray font-medium">
        <img src="/icons/search.svg" alt="Search Icon" className="w-4 h-4" />
        <input
          type="text"
          className="outline-none w-full"
          placeholder="Search crypto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <div className="mt-2 text-tokena-dark-gray">Loading...</div>}
    </div>
  );
};

export default SearchBar;
