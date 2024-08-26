import React from 'react';

export default function SkeletonCard() {
  return (
    <div className='border rounded-xl p-2 dark:border-tokena-dark-gray dark:border-opacity-40'>
      <div className='px-2 my-2 animate-pulse'>
        <div className='flex items-center gap-5'>
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className='flex flex-col space-y-2'>
            <div className='w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded'></div>
            <div className='w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded'></div>
          </div>
        </div>
        <div className='w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-2xl my-3'></div>
        <div className='w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded'></div>
        <div className='w-full h-3 bg-gray-300 dark:bg-gray-700 rounded mt-2'></div>
        <div className='w-full h-3 bg-gray-300 dark:bg-gray-700 rounded mt-2'></div>
        <div className='w-5/6 h-3 bg-gray-300 dark:bg-gray-700 rounded mt-2'></div>
      </div>
    </div>
  );
}
