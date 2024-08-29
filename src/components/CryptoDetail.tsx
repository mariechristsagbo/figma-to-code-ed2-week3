'use client'
import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { CoinData } from '@/types';
import { getCoinDetails } from '@/services/coingecko';
import parse from 'html-react-parser';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface CryptoDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    cryptoData: CoinData | null;
}

const CryptoDetailsModal: React.FC<CryptoDetailsModalProps> = ({ isOpen, onClose, cryptoData }) => {
    const [coinDetails, setCoinDetails] = useState<CoinData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (cryptoData?.id) {
            const fetchDetails = async () => {
                try {
                    const details = await getCoinDetails(cryptoData.id);
                    setCoinDetails(details);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchDetails();
        }
    }, [cryptoData]);

    if (!isOpen || !cryptoData) return null;

    const labels = ['1', '2', '3', '4'];
    const dataPoints = cryptoData.sparkline_in_7d.price;
    const step = Math.floor(dataPoints.length / (labels.length - 1));

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Price',
                data: [
                    dataPoints[0],
                    dataPoints[step],
                    dataPoints[step * 2],
                    dataPoints[dataPoints.length - 1]
                ],
                borderColor: '#00C234',
                backgroundColor: 'rgba(0, 194, 52, 0.2)',
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxRotation: 0,
                    minRotation: 0,
                    padding: 1,
                },
            },
            y: {
                beginAtZero: false,
            },
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    padding: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `Price: $${tooltipItem.raw.toFixed(2)}`;
                    },
                },
            },
        },
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white dark:bg-tokena-dark-blue-1 p-6 md:w-2/5 w-full h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{cryptoData.name}</h2>
                    <button onClick={onClose} className="p-1 bg-gray-50 bg-opacity-95 dark:bg-tokena-dark-blue-2 rounded-md">
                        <img src="/icons/close.svg" alt="Close" className="dark:invert" />
                    </button>
                </div>

                <div className="mb-6">
                    <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                        <Line data={data} options={options} />
                    </div>
                </div>

                <div className="flex items-center mb-4 justify-between">
                    <div className='flex items-center gap-3'>
                        <img src={cryptoData.image || cryptoData.thumb} alt={cryptoData.name} className="w-10 h-10" />
                        <h3 className="text-lg font-semibold">{cryptoData.name} ({cryptoData.symbol.toUpperCase()}/USD)</h3>
                    </div>
                    <p className="text-xl font-bold">${cryptoData.current_price.toLocaleString()}</p>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                        <span className='font-medium'>Crypto Market Rank</span>
                        <span className='font-semibold'>Rank #{cryptoData.market_cap_rank || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className='font-medium'>Market Cap</span>
                        <span>${cryptoData.market_cap.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className='font-medium'>Circulating Supply</span>
                        <span>{cryptoData.total_volume.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className='font-medium'>24 Hour High</span>
                        <span>${Math.max(...cryptoData.sparkline_in_7d.price).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className='font-medium'>24 Hour Low</span>
                        <span>${Math.min(...cryptoData.sparkline_in_7d.price).toFixed(2)}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="text-lg font-semibold">Description</h4>
                    <p className="text-sm text-tokena-dark-gray dark:text-tokena-gray text-justify">
                    {parse(coinDetails?.description?.en || "No description available.")}
                    </p>
                </div>

                <div className="text-center">
                    <button
                        onClick={onClose}
                        className="bg-tokena-blue bg-opacity-5 dark:bg-tokena-dark-blue-2 text-tokena-blue dark:bg-opacity-40 dark:text-tokena-blue py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2"
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
