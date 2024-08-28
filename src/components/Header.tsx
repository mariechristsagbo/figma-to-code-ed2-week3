import React from 'react'
import ThemeToggle from './ThemeToggle'
export default function Header() {
    return (
        <header className="flex items-center justify-between w-10/12 lg:w-full">
            <div className="flex items-center space-x-10">
                <div>
                    <h1 className="md:text-xl  text-base font-semibold dark:text-tokena-gray">Dashboard</h1>
                    <p className="text-tokena-dark-gray dark:text-tokena-gray font-medium md:text-base text-xs">Welcome back, John Doe</p>
                </div>
                <button className="bg-tokena-blue text-white px-4 py-2 text-sm rounded-lg font-medium sm:flex items-center hidden">
                    <img src="/icons/add-wallet.svg" alt="Wallet Icon" className="w-5 h-5 mr-2" />
                    Connect wallet
                </button>
            </div>

            <div className="flex items-center gap-2 px-4">
                <button className="text-tokena-dark-gray flex items-center gap-1 border dark:border-tokena-dark-gray dark:border-opacity-40 p-2 rounded-lg px-2">
                    USD
                    <img src="/icons/chevron-up-down.svg" alt="Chevron Up Down" className="w-5 h-5" />
                </button>
                <ThemeToggle/>
            </div>
        </header>

    )
}
