import React from 'react';

const TableSkeleton: React.FC = () => {
  const skeletonRows = Array.from({ length: 10 }, (_, index) => (
    <tr key={index} className="border-b dark:border-tokena-dark-blue-2 hover:bg-tokena-light-gray dark:hover:bg-tokena-dark-blue-1">
      <td className="py-4 px-6">
        <div className="w-5 h-5 bg-gray-300 rounded-full dark:bg-gray-700"></div>
      </td>
      <td className="py-4 px-6 flex items-center">
        <div className="w-6 h-6 bg-gray-300 rounded-full dark:bg-gray-700 mr-2"></div>
        <div className="flex-1">
          <div className="w-32 h-4 bg-gray-300 rounded-full dark:bg-gray-700 mb-1"></div>
          <div className="w-20 h-3 bg-gray-300 rounded-full dark:bg-gray-700"></div>
        </div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="w-16 h-4 bg-gray-300 rounded-full dark:bg-gray-700 ml-auto"></div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="w-16 h-4 bg-gray-300 rounded-full dark:bg-gray-700 ml-auto"></div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="w-24 h-4 bg-gray-300 rounded-full dark:bg-gray-700 ml-auto"></div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="w-24 h-4 bg-gray-300 rounded-full dark:bg-gray-700 ml-auto"></div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="w-24 h-4 bg-gray-300 rounded-full dark:bg-gray-700 ml-auto"></div>
      </td>
    </tr>
  ));

  return (
    <tbody>
      {skeletonRows}
    </tbody>
  );
};

export default TableSkeleton;
