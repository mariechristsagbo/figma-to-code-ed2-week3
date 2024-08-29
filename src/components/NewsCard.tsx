'use client';
import React, { useState } from 'react';
import SkeletonCard from './skeletons/NewsCardSkeleton';
import { formatDistanceToNow, parseISO } from 'date-fns'; 

export default function NewsCard() {
  const [visibleCount, setVisibleCount] = useState(8); 

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 10); 
  };

  return (
    <div className='max-w-3xl lg:max-w-full grid lg:grid-cols-4 sm:grid-cols-2 lg:gap-8 gap-4 mt-8 mx-auto'>
      {[...Array(12)].map((_, index) => (
        <div key={index} className='max-w-sm mx-auto border rounded-xl p-2 dark:border-tokena-dark-gray dark:border-opacity-40 dark:bg-tokena-dark-blue-2'>
          <div className='px-2 mt-2'>
            <div className='flex items-center gap-5'>
              <img src="/images/cmc.svg" className="w-10 h-10 rounded-full" alt="Logo" />
              <div className='flex flex-col'>
                <h1 className='text-tokena-dark dark:text-tokena-white text-lg font-semibold'>Crypto News</h1>
                <p className='dark:text-tokena-light-gray text-tokena-dark-gray text-sm'>News - {formatDistanceToNow(parseISO("2023-08-01T12:00:00Z"), { addSuffix: true })}</p>
              </div>
            </div>
            <img src="/images/rectangle.svg" alt="News" className='w-[70em] h-[12em] my-3 rounded-2xl' />

            <h2 className='font-semibold line-clamp-2'>The Rise of Bitcoin: What You Need to Know</h2>

            <p className='text-tokena-dark-gray font-medium dark:text-tokena-white text-sm my-2 mb-4 line-clamp-3'>
              Bitcoin has seen unprecedented growth in recent years. Here's what you need to know.
            </p>
          </div>

          <div className='px-2 flex items-center gap-4 mb-2'>
            <div className='flex items-center gap-2'>
              <img src="/icons/heart.svg" alt="Like" className='w-5 h-5 dark:invert' />
              <p>5</p>
            </div>

            <div className='flex items-center gap-2'>
              <img src="/icons/comment.svg" alt="Comment" className='w-5 h-5 dark:invert' />
              <p>5</p>
            </div>
          </div>
        </div>
      ))}

      {visibleCount < 20 && ( 
        <div className='flex justify-center mt-8 col-span-full'>
          <button 
            onClick={loadMore} 
            className='flex items-center gap-2 dark:text-white text-tokena-dark py-3 px-5 rounded-full border dark:border-tokena-light-gray border-tokena-gray dark:border-opacity-40 font-semibold'>
            Load More
           <img src="/icons/arrow-down-black.svg" alt="Load More" className='dark:invert' />
          </button>
        </div>
      )}
    </div>
  );
}
