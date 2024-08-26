import React from 'react';

const TrendingSkeleton: React.FC = () => (
  <div className="border dark:border-tokena-dark-gray dark:border-opacity-40 rounded-xl p-2.5 animate-pulse">
    <div className='flex items-center justify-between gap-4'>
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-tokena-dark-gray p-1" />
        <div>
          <div className="h-4 bg-gray-300 dark:bg-tokena-dark-gray rounded w-20 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-tokena-dark-gray rounded w-14"></div>
        </div>
      </div>
      <div className="h-4 bg-gray-300 dark:bg-tokena-dark-gray rounded-full w-12"></div>
    </div>
    <div className="mt-4">
      <div className="h-6 bg-gray-300 dark:bg-tokena-dark-gray rounded w-24 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-tokena-dark-gray rounded w-16"></div>
    </div>
  </div>
);

export default TrendingSkeleton;
