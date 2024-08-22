'use client';

import MarketTable from "./MarketTable";
import Trending from "./Trending";
export default function DashboardView() {

  return (
    <div className="flex-1 p-6 bg-white font-mona">

      <header className="flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-tokena-dark-gray font-medium">Welcome back, John Doe!</p>
          </div>
          <button className="bg-tokena-blue text-white px-4 py-2 rounded-lg font-medium flex items-center">
            <img src="/icons/add-wallet.svg" alt="Wallet Icon" className="w-5 h-5 mr-2" />
            Connect wallet
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-tokena-dark-gray flex items-center gap-1 border p-3 rounded-lg px-4">
            USD
            <img src="/icons/chevron-up-down.svg" alt="Chevron Up Down" className="w-5 h-5" />
          </button>
          <button className="p-3.5 border rounded-lg">
            <img src="/icons/moon.svg" alt="Theme Light" className="w-5 h-5" />
          </button>
        </div>
      </header>

      <section className="mt-6 flex items-center gap-4 lg:flex-row flex-col">

        <div className="border rounded-xl p-5 w-[30%]">
          <h2 className="text-tokena-dark text-lg font-semibold">Balance</h2>
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-tokena-dark">$63,755,200</p>
            <div className="flex items-center space-x-2">
              <p className="text-tokena-green text-sm bg-tokena-green bg-opacity-10 p-1.5 font-semibold rounded-full">
                +2.3%
              </p>
              <p className="font-medium text-tokena-dark-gray text-sm">vs last month</p>
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <button className="flex items-center gap-2 bg-tokena-blue bg-opacity-5 font-medium text-tokena-blue px-8 py-3 rounded-lg w-1/2">
              <img src="/icons/arrow-up.svg" alt="Arrow Up" className="w-5 h-5" />
              Deposit
            </button>
            <button className="flex items-center gap-2 bg-tokena-blue bg-opacity-5 font-medium text-tokena-blue px-8 py-3 rounded-lg w-1/2">
              <img src="/icons/arrow-down.svg" alt="Arrow Down" className="w-5 h-5" />
              Withdraw
            </button>
          </div>
        </div>

        <Trending />

      </section>

      <MarketTable />

    </div>
  );
}
