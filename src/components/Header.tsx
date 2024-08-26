import React from 'react'

export default function Header() {
    return (
        <header className="flex items-center justify-between">
            <div className="flex items-center space-x-10">
                <div>
                    <h1 className="text-2xl font-semibold dark:text-tokena-gray">Dashboard</h1>
                    <p className="text-tokena-dark-gray dark:text-tokena-gray font-medium">Welcome back, John Doe</p>
                </div>
                <button className="bg-tokena-blue text-white px-4 py-2 rounded-lg font-medium sm:flex items-center hidden">
                    <img src="/icons/add-wallet.svg" alt="Wallet Icon" className="w-5 h-5 mr-2" />
                    Connect wallet
                </button>
            </div>

            <div className="flex items-center space-x-4">
                <button className="text-tokena-dark-gray flex items-center gap-1 border dark:border-tokena-dark-gray dark:border-opacity-40 p-3 rounded-lg px-4">
                    USD
                    <img src="/icons/chevron-up-down.svg" alt="Chevron Up Down" className="w-5 h-5" />
                </button>

                <button className="p-3.5 border rounded-lg dark:border-tokena-dark-gray dark:border-opacity-40">
                    <img src="/icons/moon.svg" alt="Theme Light" className="w-5 h-5 dark:invert" />
                </button>
            </div>
        </header>

    )
}
