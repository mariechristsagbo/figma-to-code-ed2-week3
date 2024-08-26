'use client';
import React, { useState } from 'react';
import { useCryptoNews } from '@/services/newsapi'; 
import SkeletonCard from './skeletons/NewsCardSkeleton';

export default function NewsCard() {
  const { news, loading, error } = useCryptoNews();
  const [visibleCount, setVisibleCount] = useState(8); 

  if (loading) {
    return (
      <div className='max-w-3xl lg:max-w-full grid lg:grid-cols-4 sm:grid-cols-2 lg:gap-8 gap-2 mt-8 mx-auto'>
        {Array.from({ length: visibleCount }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredNews = news.filter(article => article.urlToImage && article.description);

  const visibleNews = filteredNews.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 10); 
  };

  return (
    <div className='max-w-3xl lg:max-w-full grid lg:grid-cols-4 sm:grid-cols-2 lg:gap-8 gap-2 mt-8 mx-auto'>
      {visibleNews.map((article) => (
        <div key={article.url} className='max-w-sm mx-auto border rounded-xl p-2 dark:border-tokena-dark-gray dark:border-opacity-40'>
          <div className='px-2 my-2'>
            <div className='flex items-center gap-5'>
              <img src="/images/cmc.svg" className="w-10 h-10 rounded-full" />
              <div className='flex flex-col'>
                <h1 className='text-tokena-dark dark:text-tokena-white text-lg font-semibold'>{article.source.name}</h1>
                <p className='dark:text-tokena-light-gray text-tokena-dark-gray text-sm'>{article.author}</p>
              </div>
            </div>
            <img src={article.urlToImage} alt="" className='w-[80em] h-[15em] my-3 rounded-2xl' />

            <h2 className='font-semibold line-clamp-2'>{article.title}</h2>

            <p className='text-tokena-gray dark:text-tokena-white text-sm my-2 mb-4 line-clamp-3'>
              {article.description || "No description available."}
            </p>
          </div>
        </div>
      ))}

      {visibleCount < filteredNews.length && (
        <div className='flex justify-center mt-8 col-span-full'>
          <button 
            onClick={loadMore} 
            className='flex items-center gap-2 dark:text-white text-tokena-dark py-3 px-5 rounded-full border dark:border-tokena-light-gray border-tokena-gray dark:border-opacity-40 font-semibold'>
            Load More
            <span><img src="/icons/arrow-down-black.svg" alt="" className='dark:invert' /></span>
          </button>
        </div>
      )}
    </div>
  );
}
