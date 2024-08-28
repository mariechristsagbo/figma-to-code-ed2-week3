import Trending from './Trending'

export default function BalanceSection() {
    return (
        <section className="mt-6 flex items-center gap-4 lg:flex-row flex-col">
            <div className="cursor-pointer border rounded-xl p-5 lg:w-[30%] w-full dark:border-tokena-dark-gray dark:border-opacity-40">
                <h2 className="text-tokena-dark dark:text-tokena-gray text-xl font-semibold">Balance</h2>
                <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-tokena-dark dark:bg-tokena-dark-blue-1 dark:text-tokena-white">$63,755,200</p>
                    <div className="flex items-center space-x-2">
                        <p className="text-tokena-green text-sm bg-tokena-green bg-opacity-10 p-1.5 px-2.5 font-semibold rounded-full">
                            +2.3%
                        </p>
                        <p className="font-medium text-tokena-dark-gray dark:text-tokena-gray text-sm">vs last month</p>
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

    )
}
