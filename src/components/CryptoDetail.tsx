'use client';
import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { CoinData } from '@/types';

interface CryptoDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    cryptoData: CoinData | null;
}

const CryptoDetailsModal: React.FC<CryptoDetailsModalProps> = ({ isOpen, onClose, cryptoData }) => {
    if (!isOpen || !cryptoData) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-tokena-dark-blue-1 p-6 rounded-xl max-w-lg w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{cryptoData.name}</h2>
                    <button onClick={onClose} className="p-1 bg-gray-50 bg-opacity-95 dark:bg-tokena-dark-blue-2 rounded-md">
                        <img src="/icons/close.svg" alt="Close" className='dark:invert' />
                    </button>
                </div>

                <div className="mb-6">
                    <Sparklines data={cryptoData.sparkline_in_7d.price} height={80}>
                        <SparklinesLine color="#16a34a" style={{ fill: 'none' }} />
                    </Sparklines>
                </div>

                <div className="flex items-center mb-4">
                    <img src={cryptoData.image || cryptoData.thumb} alt={cryptoData.name} className="w-10 h-10 mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">{cryptoData.name} ({cryptoData.symbol.toUpperCase()}/USD)</h3>
                        <p className="text-xl font-bold">${cryptoData.current_price.toLocaleString()}</p>
                    </div>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                        <span>Market Cap</span>
                        <span>${cryptoData.market_cap.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Circulating Supply</span>
                        <span>{cryptoData.total_volume.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>24 Hour High</span>
                        <span>${Math.max(...cryptoData.sparkline_in_7d.price).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>24 Hour Low</span>
                        <span>${Math.min(...cryptoData.sparkline_in_7d.price).toFixed(2)}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="text-lg font-semibold">Description</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                    </p>
                </div>

                <div className="text-center">
                    <button
                        onClick={onClose}
                        className="bg-tokena-blue bg-opacity-20 dark:bg-tokena-dark-blue-2 text-tokena-blue dark:bg-opacity-40 dark:text-tokena-blue py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2"
                    >
                        <img src="/icons/star.svg" alt="Add to favorites" />
                        <span>Add to favorites</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CryptoDetailsModal;
